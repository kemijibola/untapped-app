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
  page: number = 0;
  perPage: number = 9;
  contests: IContestList[] = [];
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 260.23,
        height: 162.83,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  constructor(public store: Store<fromApp.AppState>, public router: Router) {}

  ngOnInit() {
    this.store
      .pipe(select(fromContests.selectAllContestsPreviews))
      .subscribe((val: IContestList[]) => {
        this.contests = [...val];
        this.setContestBannerImage();
      });
    this.fetchRunningContests();
  }

  setContestBannerImage() {
    this.contests = this.contests.map((x) => {
      return Object.assign({}, x, {
        fullBannerImage:
          x.bannerImage !== ""
            ? fetchImageObjectFromCloudFormation(x.bannerImage, this.editParams)
            : fetchDefaultContestBanner(),
      });
    });
  }

  onScroll() {
    this.fetchRunningContests();
  }

  fetchRunningContests() {
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
