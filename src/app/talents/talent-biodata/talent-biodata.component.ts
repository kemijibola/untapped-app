import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { UserFilterCategory, IAuthData } from "src/app/interfaces";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import * as fromTalentFilter from "src/app/shared/store/filtered-categories/talent-category.reducers";
import * as fromUserFilter from "../../shared/store/filtered-categories/user-filter/user-filter.reducer";
import * as UserFilterActions from "../../shared/store/filtered-categories/user-filter/user-filter.action";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { Observable } from "rxjs";
import * as _ from "underscore";

@Component({
  selector: "app-talent-biodata",
  templateUrl: "./talent-biodata.component.html",
  styleUrls: ["./talent-biodata.component.css"],
})
export class TalentBiodataComponent implements OnInit {
  selectedUser: UserFilterCategory;
  defaultImage: string = "";
  defaultParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 442,
        height: 293,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  loggedInUser: Observable<IAuthData>;
  hasLiked: boolean;
  currentUser: IAuthData;
  show: boolean = false;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.loggedInUser = this.store.pipe(select(fromAuth.selectCurrentUserData));
    this.loggedInUser.subscribe((val: IAuthData) => {
      if (val.authenticated) {
        this.currentUser = val;
      }
    });

    this.store
      .pipe(select(fromUserFilter.selectCurrentUser))
      .subscribe((val: UserFilterCategory) => {
        if (val) {
          if (_.has(val, "displayName")) {
            this.show = true;
            this.checkIfUserHasLiked(val.tappedBy);
            this.selectedUser = val;

            this.defaultImage = fetchImageObjectFromCloudFormation(
              val.displayPhoto,
              this.defaultParams
            );
            this.selectedUser.displayPhotoFullPath = fetchImageObjectFromCloudFormation(
              val.displayPhoto,
              this.editParams
            );
          } else {
            this.show = false;
          }
        }
      });
  }

  checkIfUserHasLiked(likes: string[]): void {
    if (this.currentUser) {
      if (likes.length > 0) {
        this.hasLiked =
          likes.filter((x) => x === this.currentUser.user_data._id)[0]?.length >
          0;
      } else {
        this.hasLiked = false;
      }
    }
  }

  likeTalent(): void {
    if (this.currentUser.authenticated) {
      this.selectedUser.tappedBy = [
        ...this.selectedUser.tappedBy,
        this.currentUser.user_data._id,
      ];

      this.selectedUser.isSelected = true;

      this.store.dispatch(
        new UserFilterActions.LikeTalent({
          user: this.selectedUser,
          likedBy: this.currentUser.user_data._id,
        })
      );
    }
  }

  unLikeTalent(): void {
    if (this.currentUser.authenticated) {
      this.selectedUser.tappedBy = this.selectedUser.tappedBy.filter(
        (x) => x !== this.currentUser.user_data._id
      );

      this.selectedUser.isSelected = true;

      this.store.dispatch(
        new UserFilterActions.UnLikeTalent({
          user: this.selectedUser,
          unLikedBy: this.currentUser.user_data._id,
        })
      );
    }
  }
}
