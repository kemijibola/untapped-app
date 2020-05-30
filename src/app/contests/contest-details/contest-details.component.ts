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
import * as ContestAction from "../store/contest/contest.action";
import * as fromAuth from "src/app/account/store/auth.reducers";

@Component({
  selector: "app-contest-details",
  templateUrl: "./contest-details.component.html",
  styleUrls: ["./contest-details.component.css"],
})
export class ContestDetailsComponent implements OnInit {
  contestId: string | null;
  eligibleCategories: string = "";
  differenceInDays: string = "";
  hasEnded: boolean = false;
  isEligible: boolean = true;
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
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {
    this.hasEnded = true;
    // this.store.dispatch(new ContestsAction.ResetContestData());
  }

  ngOnInit(): void {
    this.contestId = this.route.snapshot.params.id;
    if (this.contestId !== null) {
      this.store.dispatch(
        new ContestsAction.FetchContestById({ id: this.contestId })
      );

      this.store
        .pipe(select(fromAuth.selectCurrentUserData))
        .subscribe((val: IAuthData) => {
          if (val.authenticated) {
            this.store.dispatch(
              new ContestsAction.CheckUserEligibility({
                contestId: this.contestId,
              })
            );
          }
        });

      this.store
        .pipe(select(fromContest.selectCurrentUserEligibility))
        .take(2)
        .subscribe((val: ContestEligibilityData) => {
          console.log(val);
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
          this.componentModal = { ...val };
        }
      });

    this.store
      .pipe(select(fromContest.selectCurrentContestDetails))
      .take(2)
      .subscribe((val: ContestData) => {
        if (val !== null) {
          console.log(val);
          this.setContestantProfileIImage(val);
          this.setContestBannerImage(val.contest.bannerImage);
          this.entriesCount = val.submissions.length;
          // this.contestDetails = { ...val };
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
      bannerImageKey !== undefined
        ? fetchImageObjectFromCloudFormation(bannerImageKey, this.editParams)
        : fetchDefaultContestBanner();
  }

  setContestantProfileIImage(contestData: ContestData) {
    this.contestDetails.contest = { ...contestData.contest };
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
    this.router.navigate(["/contests/"]);
  }

  closeModalDialog(modalId: string) {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      const modalToClose: IModal = {
        index: modalToDeActivate.index,
        name: modalToDeActivate.name,
        display: ModalDisplay.none,
        viewMode: ModalViewModel.none,
        contentType: "",
        data: null,
        modalCss: "",
        modalDialogCss: "",
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

  openModalDialog(modalId: string, data: any = null) {
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
        contentType: "",
        data: data !== null ? data.entry : null,
        modalCss: "modal aligned-modal",
        modalDialogCss: "modal-dialog",
        showMagnifier: false,
      };
      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToOpen,
        })
      );
    }
  }

  ngOnDestroy(): void {
    // this.hasEnded = false;
    // this.store.dispatch(new ContestsAction.ResetContestData());
  }
}
