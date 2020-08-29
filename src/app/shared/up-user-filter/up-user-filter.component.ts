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
import * as fromUserFilter from "../store/filtered-categories/user-filter/user-filter.reducer";
import * as fromCategory from "../store/category/category.reducers";
import * as UserFilterActions from "../store/filtered-categories/user-filter/user-filter.action";
import * as TalentsActions from "../store/talents/talents.actions";
import * as TalentAudioPreviewActions from "../store/talents/audio-preview/audio-preview.action";
import * as GeneralPreviewActions from "../store/talents/general-preview/general-preview.action";
import * as TalentImagePreviewActions from "../store/talents/image-preview/image-preview.action";
import * as TalentVideoPreviewActions from "../store/talents/video-preview/video-preview.action";
import * as _ from "underscore";

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
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(fromUserFilter.selectAllUsers))
      .subscribe((val: UserFilterCategory[]) => {
        this.filteredUsers = [];
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
  }

  trackByFn(index: number, item: UserFilterCategory) {
    return item._id;
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
    // this.searchText = "";
    // this.category = "";
    // this.userTypeId = "";
  }
}
