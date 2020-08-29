import { IUserContestListAnalysis } from "./../../interfaces/user/filter-category";
import { Component, OnInit } from "@angular/core";
import * as NewContestActions from "../../user-contest/store/new-contest/new-contest.actions";
import * as fromUserContest from "../../user-contest/user-contest.reducers";
import * as fromAllContest from "../store/all-contest/all-contest.reducers";
import * as AllContestActions from "../store/all-contest/all-contest.actions";
import * as fromNewContest from "../../user-contest/store/new-contest/new-contest.reducers";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  fetchImageObjectFromCloudFormation,
  fetchDefaultContestBanner,
} from "src/app/lib/Helper";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";

@Component({
  selector: "app-all-contest",
  templateUrl: "./all-contest.component.html",
  styleUrls: ["./all-contest.component.css"],
})
export class AllContestComponent implements OnInit {
  userContests: IUserContestListAnalysis[] = [];
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 300,
        height: 187,
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
  constructor(
    public store: Store<fromApp.AppState>,
    private userContestStore: Store<fromUserContest.UserContestState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new AllContestActions.FetchUserContestList());

    this.userContestStore
      .pipe(select(fromAllContest.selectAllUserContests))
      .subscribe((val: IUserContestListAnalysis[]) => {
        if (val !== null) {
          this.userContests = [...val];
          this.setContestBannerImage();
        }
      });
  }

  trackByFn(index: number, item: IUserContestListAnalysis) {
    return item.contestId;
  }

  setContestBannerImage() {
    this.userContests = this.userContests.map((x) => {
      return Object.assign({}, x, {
        defaultContestBannerImage: fetchImageObjectFromCloudFormation(
          x.contestBanner,
          this.defaultParams
        ),
        fullContestBannerImage:
          x.contestBanner !== ""
            ? fetchImageObjectFromCloudFormation(
                x.contestBanner,
                this.editParams
              )
            : fetchDefaultContestBanner(),
      });
    });
  }
}
