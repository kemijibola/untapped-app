import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
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
  IUserType,
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
import * as TalentAudioPreviewActions from "../store/talents/audio-preview/audio-preview.action";
import * as GeneralPreviewActions from "../store/talents/general-preview/general-preview.action";
import * as TalentImagePreviewActions from "../store/talents/image-preview/image-preview.action";
import * as TalentVideoPreviewActions from "../store/talents/video-preview/video-preview.action";
import * as fromUser from "../../user/user.reducers";
import * as MediaPreviewActions from "../../user/store/portfolio/media/media-preview.actions";
import * as _ from "underscore";
import * as fromUserTypeReducer from "../../user-type/store/user-type.reducers";
import * as UserTypeActions from "../../user-type/store/user-type.actions";
import { timer, Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { of } from "core-js/fn/array";

@Component({
  selector: "app-up-user-filter",
  templateUrl: "./up-user-filter.component.html",
  styleUrls: ["./up-user-filter.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpUserFilterComponent implements OnInit, OnDestroy {
  filteredUsers: UserFilterCategory[] = [];
  typeOfFilter: string = "";
  @Input() typeOfUser: AppUserType;
  searchText: string = "";
  category: string = "";
  userTypeId: string = "";
  userType$: Observable<IUserType[]> = this.store.select(
    fromUserTypeReducer.selectAllUserTypes
  );

  currentUserSelected: boolean = false;
  private scrollToContainer: any;

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
  hasCleared: boolean = false;

  userSet(val: UserFilterCategory[]): boolean {
    return val.filter((x) => x.isSelected).length > 0;
  }

  constructor(
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2
  ) {
    this.store.dispatch(new UserTypeActions.FetchUserTypes());
  }

  ngOnInit() {
    this.store
      .pipe(select(fromUserFilter.selectAllUsers))
      .take(2)
      .subscribe((val: UserFilterCategory[]) => {
        console.log(val);
        this.typeOfFilter =
          val.length > 1 ? `${this.typeOfUser}s` : this.typeOfUser;
        if (val.length > 0) {
          if (!this.userSet(val)) {
            val.map((x: UserFilterCategory) => {
              x = this.setUserImage(x);
              this.filteredUsers.push(x);
            });
            this.filteredUsers[0].isSelected = true;
            if (this.typeOfUser === AppUserType.Talent) {
              this.fetchTalentPortfolio(this.filteredUsers[0].user);
              this.triggerFetchUserGeneralList(this.filteredUsers[0].user);
            }

            this.store.dispatch(
              new UserFilterActions.FetchUser({
                id: this.filteredUsers[0]._id,
              })
            );
          }
        } else {
          this.store.dispatch(
            new TalentAudioPreviewActions.ResetTalentAudioPortfolioPreview()
          );
          this.store.dispatch(
            new TalentVideoPreviewActions.ResetTalentVideoPortfolioPreview()
          );
          this.store.dispatch(
            new TalentImagePreviewActions.ResetTalentImagePortfolioPreview()
          );
          this.store.dispatch(
            new GeneralPreviewActions.ResetTalentGeneralPreview()
          );
        }
      });

    this.store
      .pipe(select(fromUserFilter.selectSearchText))
      .subscribe((val: string) => {
        console.log("search text", val);
        if (val !== null) {
          this.searchText = val;
          if (this.searchText.length > 2) {
            this.store.dispatch(
              new UserFilterActions.FetchAllUsers({
                queryParams: {
                  searchText: val,
                  categoryId: this.category,
                  userTypeId: this.userTypeId,
                },
              })
            );
          }
          if (this.searchText.length === 0) {
            this.userType$.subscribe((val: IUserType[]) => {
              this.userTypeId = val.filter(
                (x) => x.name === this.typeOfFilter
              )[0]?._id;
            });

            this.store.dispatch(
              new UserFilterActions.FetchAllUsers({
                queryParams: {
                  userTypeId: this.userTypeId,
                  categoryId: this.category,
                },
              })
            );
          }
        }
      });

    this.store
      .pipe(select(fromCategory.selectCurrentCategory))
      .subscribe((val: Category) => {
        if (val) {
          this.category = val._id;
          this.store.dispatch(
            new UserFilterActions.FetchAllUsers({
              queryParams: {
                searchText: this.searchText,
                categoryId: val._id,
                userTypeId: this.userTypeId,
              },
            })
          );
        }
      });
  }

  setUserImage(data: UserFilterCategory): UserFilterCategory {
    return Object.assign({}, data, {
      displayPhotoFullPath: fetchImageObjectFromCloudFormation(
        data.displayPhoto,
        this.editParams
      ),
      defaultImageFullPath: fetchImageObjectFromCloudFormation(
        data.displayPhoto,
        this.defaultParams
      ),
    });
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

    console.log(this.filteredUsers);
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

    // scroll to right
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
