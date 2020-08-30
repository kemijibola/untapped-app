import { ImageFit } from "./../interfaces/media/image";
import { Component, OnInit, OnDestroy } from "@angular/core";
import * as fromContests from "../contests/store/contests.reducers";
import * as ContestsAction from "../contests/store/contests.action";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import { IContestList, AppModal, ModalDisplay } from "../interfaces";
import { Observable } from "rxjs";
import {
  fetchImageObjectFromCloudFormation,
  fetchDefaultContestBanner,
} from "../lib/Helper";
import { ImageEditRequest } from "../interfaces/media/image";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";

@Component({
  selector: "app-contests",
  templateUrl: "./contests.component.html",
  styleUrls: ["./contests.component.css"],
})
export class ContestsComponent implements OnInit, OnDestroy {
  page: number = 1;
  perPage: number = 9;
  contests: IContestList[] = [];
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 257,
        height: 161,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

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
  lastFetchedCount: number = 0;

  initiated$ = this.store.pipe(
    select(fromContests.selectContestsInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromContests.selectContestsInProgressStatus)
  );

  completed$ = this.store.pipe(
    select(fromContests.selectContestsCompletedStatus)
  );

  failed$ = this.store.pipe(select(fromContests.selectContestsFailedStatus));

  notEmptyPost = true;
  notscrolly = true;
  showLoading = true;
  showAd = false;
  hasFailed: boolean;

  constructor(public store: Store<fromApp.AppState>, public router: Router) {}

  ngOnInit() {
    this.getContests();

    this.failed$.subscribe((val: boolean) => {
      this.hasFailed = val;
    });

    this.store
      .pipe(select(fromContests.selectAllContestsPreviews))
      .subscribe((val: IContestList[]) => {
        if (this.contests.length === 0) {
          this.showLoading = false;
          val.map((x: IContestList) => {
            x = this.setContestBannerImage(x);
            this.contests.push(x);
          });
        } else {
          if (val.length > 0) {
            val.map((x) => {
              x = this.setContestBannerImage(x);
              this.contests.push(x);
            });
          } else {
            this.notEmptyPost = false;
          }
          this.notscrolly = true;
        }
      });
  }

  setContestBannerImage(data: IContestList): IContestList {
    return Object.assign({}, data, {
      defaultBannerImage: fetchImageObjectFromCloudFormation(
        data.bannerImage,
        this.defaultParams
      ),
      fullBannerImage:
        data.bannerImage !== ""
          ? fetchImageObjectFromCloudFormation(
              data.bannerImage,
              this.editParams
            )
          : fetchDefaultContestBanner(),
    });
  }

  getContests() {
    this.store.dispatch(
      new ContestsAction.FetchContestsPreview({
        perPage: this.perPage,
        page: this.page,
      })
    );
  }

  trackByFn(index: number, item: IContestList) {
    return item._id;
  }

  getContestsRetry(pageNumber: number = 1) {
    this.store.dispatch(
      new ContestsAction.FetchContestsPreview({
        perPage: this.perPage,
        page: pageNumber,
      })
    );
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost && !this.hasFailed) {
      this.notEmptyPost = true;
      this.notscrolly = false;
      this.fetchNextRunningContests();
    }
  }

  fetchNextRunningContests() {
    this.page++;
    this.store.dispatch(
      new ContestsAction.FetchContestsPreview({
        perPage: this.perPage,
        page: this.page,
      })
    );
  }

  navigateToDetail(contestId: string): void {
    this.router.navigate(["/contests/", contestId]);
  }

  ngOnDestroy() {
    this.store.dispatch(new ContestsAction.ResetContestsPreviewToDefault());
  }
}
