import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  AfterViewInit,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import * as fromContest from "../store/contests.reducers";
import * as ContestsAction from "../store/contests.action";
import {
  ContestData,
  CategoryType,
  ModalDisplay,
  ModalViewModel,
  AppModal,
  IModal,
  ContestEligibilityData,
  EligibilityStatus,
  IAuthData,
  MediaType,
  IEntryData,
  PrizePosition,
  MediaAcceptType,
} from "src/app/interfaces";
import * as fromCategoryType from "../../shared/store/category-type/category-type.reducers";
import { differenceInDays, isPast, getTime, isAfter } from "date-fns";
import {
  fetchImageObjectFromCloudFormation,
  fetchDefaultContestBanner,
  fetchNoMediaDefaultImage,
} from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as fromModal from "../../shared/store/modals/modals.reducers";
import { withLatestFrom, tap, takeLast } from "rxjs/operators";
import { take } from "rxjs-compat/operator/take";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as _ from "underscore";

@Component({
  selector: "app-contest-details",
  templateUrl: "./contest-details.component.html",
  styleUrls: ["./contest-details.component.css"],
})
export class ContestDetailsComponent implements OnInit, OnDestroy {
  contestId: string | null;
  eligibleCategories: string = "";
  differenceInDays: string = "";
  hasEnded: boolean = false;
  isEligible: boolean = false;
  fullBannerImage: string = "";
  entriesCount: number = 0;
  defaultBannerImage: string = "";
  enterContestBtnText: string = "";
  contestDetails: ContestData = {
    contest: {
      title: "",
      information: "",
      bannerImage: "",
      entryMediaType: "",
      startDate: new Date(),
      endDate: new Date(),
      redeemable: [],
      eligibleCategories: [],
      likedBy: [],
    },
    submissions: [],
  };
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 448,
        height: 451,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  defaultEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  entryContestantParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 27,
        height: 27,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  componentModal: AppModal;
  entryMediaType: string = "";
  coloredHeart =
    '<svg xmlns="http://www.w3.org/2000/svg" height="464pt" viewBox="0 -20 464 464" width="464pt"><path d="m340 0c-44.773438.00390625-86.066406 24.164062-108 63.199219-21.933594-39.035157-63.226562-63.19531275-108-63.199219-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s232-120 232-292c0-68.480469-55.519531-132-124-132zm0 0" fill="#ff6243"/><path d="m32 132c0-63.359375 47.550781-122.359375 108.894531-130.847656-5.597656-.769532-11.242187-1.15625025-16.894531-1.152344-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s6-3.113281 16-8.992188c-52.414062-30.824218-216-138.558593-216-283.007812zm0 0" fill="#ff5023"/></svg>';

  currentIndex = -1;
  leftDisabled = false;
  rightDisabled = false;
  currentUserId: string = "";
  userHasLikedContest: boolean = false;
  isAuthenticated: boolean = false;

  prizePosition: PrizePosition;
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contestId = this.route.snapshot.params.id;
    if (this.contestId !== null) {
      this.store.dispatch(
        new ContestsAction.FetchContestById({ id: this.contestId })
      );

      // this.store.dispatch(
      //   new ContestsAction.PostContestView({ id: this.contestId })
      // );

      this.store
        .pipe(select(fromAuth.selectCurrentUserData))
        .subscribe((val: IAuthData) => {
          this.isEligible = false;
          this.hasEnded = true;
          if (_.has(val, "authenticated")) {
            this.isAuthenticated = val.authenticated;
            if (val.authenticated && val.user_data.profile_is_completed) {
              this.currentUserId = val.user_data._id;
              this.store.dispatch(
                new ContestsAction.CheckUserEligibility({
                  contestId: this.contestId,
                })
              );
            }
          } else {
            this.isAuthenticated = false;
          }
        });

      this.store
        .pipe(select(fromContest.selectCurrentUserEligibility))
        .subscribe((val: ContestEligibilityData) => {
          if (val !== null) {
            if (val.status) {
              this.isEligible = true;
            } else {
              this.isEligible = false;
            }
          }
        });
    }

    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = val;
        }
      });

    this.store
      .pipe(select(fromContest.selectCurrentContestDetails))
      .subscribe((val: ContestData) => {
        if (val) {
          this.setContestantProfileIImage(val);
          this.setContestBannerImage(val.contest.bannerImage || "");
          this.entriesCount = val.submissions.length;
          if (
            isAfter(Date.now(), new Date(this.contestDetails.contest.endDate))
          ) {
            this.hasEnded = true;
          } else {
            this.hasEnded = false;
          }
          const difference: number = differenceInDays(
            new Date(val.contest.endDate),
            new Date(val.contest.startDate)
          );
          this.differenceInDays =
            difference > 1 ? `${difference} days` : `${difference} day`;
          if (val.contest.eligibleCategories.length > 0) {
            this.mapSelectedCategories();
          }
        }
      });
  }

  setContestBannerImage(bannerImageKey: string) {
    this.defaultBannerImage = fetchImageObjectFromCloudFormation(
      bannerImageKey,
      this.defaultEditParams
    );
    this.fullBannerImage =
      bannerImageKey !== ""
        ? fetchImageObjectFromCloudFormation(bannerImageKey, this.editParams)
        : fetchDefaultContestBanner();
  }

  onClickLike(): void {
    if (!this.hasLikedContest()) {
      this.store.dispatch(
        new ContestsAction.AddContestLike({
          contest: this.contestDetails,
          likedBy: this.currentUserId,
        })
      );
    } else {
      // unlike comment
      this.store.dispatch(
        new ContestsAction.RemoveContestLike({
          contest: this.contestDetails,
          unLikedBy: this.currentUserId,
        })
      );
    }
  }
  setContestantProfileIImage(contestData: ContestData) {
    this.contestDetails.contest = contestData.contest;
    this.userHasLikedContest = this.hasLikedContest();
    this.contestDetails.submissions = contestData.submissions.map((x) => {
      return Object.assign({}, x, {
        fullUserProfileImage:
          x.entry.user["profileImagePath"] !== ""
            ? fetchImageObjectFromCloudFormation(
                x.entry.user["profileImagePath"],
                this.entryContestantParams
              )
            : fetchNoMediaDefaultImage(),
      });
    });
  }

  mapSelectedCategories() {
    this.store
      .pipe(select(fromCategoryType.selectAllCategoryTypes))
      .subscribe((val: CategoryType[]) => {
        if (
          val.length > 0 &&
          this.contestDetails.contest.eligibleCategories.length > 0
        ) {
          for (
            let i = 0;
            i < this.contestDetails.contest.eligibleCategories.length;
            i++
          ) {
            const found = val.filter(
              (x) => x._id === this.contestDetails.contest.eligibleCategories[i]
            )[0];
            if (found) {
              if (i === 0) {
                this.eligibleCategories = `${found.name}`;
              } else {
                this.eligibleCategories = `${this.eligibleCategories}, ${found.name}`;
              }
            }
          }
        }
      });
  }

  navigateToPrevious() {
    this.store.dispatch(new ContestsAction.ResetContestData());
    this.store.dispatch(new ContestsAction.ResetUserEligibilityStatus());
    this.router.navigate(["/competitions/"]);
  }

  private hasLikedContest(): boolean {
    if (this.currentUserId) {
      const found = this.contestDetails.contest.likedBy.filter(
        (x) => x === this.currentUserId
      );
      return found.length > 0;
    }
    return false;
  }
  closeModalDialog(modalId: string) {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      if (modalToDeActivate) {
        const modalToClose: IModal = {
          index: modalToDeActivate.index,
          name: modalToDeActivate.name,
          display: ModalDisplay.none,
          viewMode: ModalViewModel.none,
          contentType: "",
          data: null,
          modalCss: "",
          modalDialogCss: "",
          modalContentCss: "",
          showMagnifier: false,
        };
        this.store.dispatch(
          new ModalsActions.ToggleModal({
            appModal: this.componentModal,
            modal: modalToClose,
          })
        );
      }
    }
  }

  onEntrySelected(modalId: string, contentCss: string, index: number): void {
    this.openModalDialog(modalId, contentCss, index);
  }

  onNewEntrySelected(modalId: string, contentCss: string): void {
    this.openModalDialog(modalId, contentCss);
  }

  openModalDialog(
    modalId: string,
    contentCss: string,
    index: number = 0,
    data: any = null
  ) {
    // set MediaType
    this.entryMediaType = this.contestDetails.contest.entryMediaType;
    this.store.dispatch(
      new ModalsActions.FetchAppModal({ appModalId: "contest" })
    );

    if (this.componentModal) {
      const modalToActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      const modalToOpen: IModal = {
        index: modalToActivate.index,
        name: modalToActivate.name,
        display: ModalDisplay.table,
        viewMode:
          modalId.localeCompare("talent-entry-details") === 0
            ? ModalViewModel.view
            : ModalViewModel.new,
        contentType: this.contestDetails.contest.entryMediaType,
        modalCss: "modal aligned-modal",
        modalDialogCss: "modal-dialog",
        modalContentCss: contentCss,
        showMagnifier: false,
      };
      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToOpen,
        })
      );
    }

    if (index >= 0) {
      this.toggleButton(index);
      this.currentIndex = index;
      this.store.dispatch(
        new ModalsActions.SetModalNavigationProperties({
          currentIndex: this.currentIndex,
          mediaType: this.contestDetails.contest.entryMediaType,
          data: this.contestDetails.submissions[index],
        })
      );
    }
  }

  navigateToAanalysis() {
    this.router.navigate([
      "/competitions/" + this.contestDetails.contest._id + "/result",
    ]);
  }

  toggleButton(index: number): void {
    if (this.hasPrevious(index) && this.hasNext(index)) {
      this.leftDisabled = true;
      this.rightDisabled = true;
    } else if (this.hasPrevious(index) && !this.hasNext(index)) {
      this.leftDisabled = false;
      this.rightDisabled = true;
    } else if (!this.hasPrevious(index) && this.hasNext(index)) {
      this.leftDisabled = true;
      this.rightDisabled = false;
    }
  }

  onPrevious() {
    this.currentIndex--;
    this.toggleButton(this.currentIndex);

    const previousEntry = this.contestDetails.submissions[this.currentIndex];
    if (previousEntry) {
      this.store.dispatch(
        new ModalsActions.SetModalNavigationProperties({
          currentIndex: this.currentIndex,
          mediaType: this.contestDetails.contest.entryMediaType,
          data: previousEntry,
        })
      );
    }
  }

  onNext() {
    this.currentIndex++;
    this.toggleButton(this.currentIndex);

    const nextEntry = this.contestDetails.submissions[this.currentIndex];
    if (nextEntry) {
      this.store.dispatch(
        new ModalsActions.SetModalNavigationProperties({
          currentIndex: this.currentIndex,
          mediaType: this.contestDetails.contest.entryMediaType,
          data: nextEntry,
        })
      );
    }
  }

  private hasNext(index: number): boolean {
    return this.contestDetails.submissions[index + 1] !== undefined
      ? true
      : false;
  }

  private hasPrevious(index: number): boolean {
    return this.contestDetails.submissions[index - 1] !== undefined
      ? true
      : false;
  }

  ngOnDestroy(): void {
    this.isEligible = false;
    this.hasEnded = true;
    this.closeModalDialog("new-entry");
    // this.store.dispatch(new ContestsAction.ResetContestData());
  }
}
