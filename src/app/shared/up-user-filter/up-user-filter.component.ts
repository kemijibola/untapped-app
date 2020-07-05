import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  UserFilterCategory,
  AppUserType,
  Category,
  MediaType,
  MediaUploadType,
  ReportType,
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
import * as fromUser from "../../user/user.reducers";
import * as MediaPreviewActions from "../../user/store/portfolio/media/media-preview.actions";
import * as _ from "underscore";

@Component({
  selector: "app-up-user-filter",
  templateUrl: "./up-user-filter.component.html",
  styleUrls: ["./up-user-filter.component.css"],
})
export class UpUserFilterComponent implements OnInit, OnDestroy {
  // @Input() filteredUsers: UserFilterCategory[] = [];
  filteredUsers: UserFilterCategory[] = [];
  typeOfFilter: string = "";
  @Input() typeOfUser: AppUserType;
  searchText: string = "";
  category: string = "";
  userTypeId: string = "";
  currentUserSelected: boolean = false;

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

  userSet(val: UserFilterCategory[]): boolean {
    return val.filter((x) => x.isSelected).length > 0;
  }

  constructor(private store: Store<fromApp.AppState>) {
    this.searchText = "";
    this.category = "";
    this.userTypeId = "";
  }

  ngOnInit() {
    this.store
      .pipe(select(fromUserFilter.selectAllUsers))
      .subscribe((val: UserFilterCategory[]) => {
        this.typeOfFilter =
          val.length > 1 ? `${this.typeOfUser}s` : this.typeOfUser;
        if (val.length > 0) {
          console.log("users list", val);
          this.setUsersImage(val);

          if (!this.userSet(val)) {
            this.filteredUsers[0].isSelected = true;
            this.userTypeId = this.filteredUsers[0].userType;
            if (this.typeOfUser === AppUserType.Talent) {
              this.fetchTalentPortfolio(this.filteredUsers[0].user);
              this.triggerFetchUserGeneralList(this.filteredUsers[0].user);
            }

            this.store.dispatch(
              new UserFilterActions.FetchUser({ id: this.filteredUsers[0]._id })
            );
          }
        }
      });

    this.store
      .pipe(select(fromUserFilter.selectSearchText))
      .subscribe((val: string) => {
        this.searchText = val;
        if (val) {
          this.searchText = val;
          this.filterUser();
        } else {
          console.log("fetch all");
        }
      });
    this.store
      .pipe(select(fromCategory.selectCurrentCategory))
      .subscribe((val: Category) => {
        if (val) {
          console.log(val);
          this.category = val._id;
          // this.filterUser();
        }
      });
  }

  filterUser() {
    console.log({
      queryParams: {
        searchText: this.searchText,
        categoryId: this.category,
        userTypeId: this.userTypeId,
      },
    });

    if (this.searchText.length > 0) {
      this.store.dispatch(
        new UserFilterActions.FetchAllUsers({
          queryParams: {
            searchText: this.searchText || "",
            categoryId: this.category || "",
            userTypeId: this.userTypeId || "",
          },
        })
      );
    }

    if (this.searchText.length === 0) {
      console.log(this.searchText.length);
      this.store.dispatch(
        new UserFilterActions.FetchAllUsers({
          queryParams: {
            searchText: this.searchText || "",
            categoryId: this.category || "",
            userTypeId: this.userTypeId || "",
          },
        })
      );
    }
    // } else {
    //   this.store.dispatch(
    //     new UserFilterActions.FetchAllUsers({
    //       queryParams: {
    //         categoryId: this.category || "",
    //         userTypeId: this.userTypeId || "",
    //       },
    //     })
    //   );
    // }
  }

  setUsersImage(val: UserFilterCategory[]): void {
    this.filteredUsers = val.map((x) => {
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
      this.triggerFetchUserGeneralList(this.filteredUsers[index].user);
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

  triggerFetchUserGeneralList(userId: string): void {
    this.store.dispatch(
      new TalentsActions.FetchTalentGeneralMedia({
        type: MediaType.ALL,
        uploadType: MediaUploadType.single,
        user: userId,
      })
    );
  }

  ngOnDestroy() {
    this.searchText = "";
    this.category = "";
    this.userTypeId = "";
  }
}
