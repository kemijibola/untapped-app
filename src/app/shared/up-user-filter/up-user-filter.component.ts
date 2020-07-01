import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  UserFilterCategory,
  AppUserType,
  Category,
  MediaType,
  MediaUploadType,
} from "src/app/interfaces";
import * as UserCategoryActions from "../store/filtered-categories/talent-category.action";
import { ImageEditRequest } from "src/app/interfaces/media/image";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import * as TalentCategoryActions from "../store/filtered-categories/talent-category.action";
import * as fromTalentWithHighestComment from "../store/filtered-categories/talent-category.reducers";
import * as ProfessionalCategoryActions from "../store/filtered-categories/professional-category/professional-category.actions";
import * as fromUserFilter from "../store/filtered-categories/user-filter/user-filter.reducer";
import * as fromCategory from "../store/category/category.reducers";
import * as UserFilterActions from "../store/filtered-categories/user-filter/user-filter.action";
import * as TalentsActions from "../store/talents/talents.actions";

@Component({
  selector: "app-up-user-filter",
  templateUrl: "./up-user-filter.component.html",
  styleUrls: ["./up-user-filter.component.css"],
})
export class UpUserFilterComponent implements OnInit, OnChanges {
  @Input() filteredUsers: UserFilterCategory[] = [];
  @Input() typeOfFilter: string = "";
  @Input() typeOfUser: AppUserType;
  searchText: string = "";
  category: string = "";

  defaultParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 30,
        height: 30,
      },
      grayscale: false,
    },
  };

  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 108,
        height: 65.83,
      },
      grayscale: false,
    },
  };
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    //
    this.store
      .pipe(select(fromUserFilter.selectSearchText))
      .subscribe((val: string) => {
        this.searchText = val;
        //
      });

    this.store
      .pipe(select(fromCategory.selectCurrentCategory))
      .subscribe((val: Category) => {
        console.log(val);
        if (val) {
          this.category = val._id;
        }
      });
  }

  filterUser() {}

  ngOnChanges(simple: SimpleChanges) {
    if (simple["filteredUsers"]) {
      if (this.filteredUsers.length > 0) {
        this.filteredUsers = this.filteredUsers.map((x) => {
          return Object.assign({}, x, {
            displayPhotoFullPath: fetchImageObjectFromCloudFormation(
              x.displayPhoto,
              this.editParams
            ),
            defaultImageFullPath: fetchImageObjectFromCloudFormation(
              x.displayPhoto,
              this.defaultParams
            ),
          });
        });
        this.filteredUsers[0].isSelected = true;

        this.store.dispatch(
          new UserFilterActions.FetchUser({ id: this.filteredUsers[0]._id })
        );
        if (this.typeOfUser === AppUserType.Talent) {
          this.fetchTalentPortfolio(this.filteredUsers[0].user);
        }

        // if (this.typeOfUser === AppUserType.Talent) {
        //   this.store.dispatch(
        //     new TalentCategoryActions.FetchTalentWithHighestComment({
        //       id: this.filteredUsers[0]._id,
        //     })
        //   );
        // }
        // if (this.typeOfUser === AppUserType.Professional) {
        //   this.store.dispatch(
        //     new ProfessionalCategoryActions.FetchProfessional({
        //       id: this.filteredUsers[0]._id,
        //     })
        //   );
        // }
      }
    }

    // console.log(this.filteredUsers);
  }

  onUserSelected(index: number) {
    this.filteredUsers.map((x: UserFilterCategory, i: number) => {
      if (i === index) {
        x.isSelected = true;
      } else {
        x.isSelected = false;
      }
    });

    this.store.dispatch(
      new UserFilterActions.FetchUser({ id: this.filteredUsers[index]._id })
    );
    if (this.typeOfUser === AppUserType.Talent) {
      this.fetchTalentPortfolio(this.filteredUsers[index].user);
    }
  }

  fetchTalentPortfolio(userId: string): void {
    this.store.dispatch(
      new TalentsActions.FetchTalentPortfolio({
        type: MediaType.ALL,
        uploadType: MediaUploadType.all,
        user: userId,
      })
    );
  }
  getUserFullImage(key: string) {}
}
