import { Component, OnInit } from "@angular/core";
import * as ContestEntryActions from "../../contests/store/contest-entry/contest-entry.action";
import * as fromContestEntry from "../../contests/store/contest-entry/contest-entry.reducer";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { IUserContestListAnalysis, IContestList } from "src/app/interfaces";
import { Observable } from "rxjs";
import {
  fetchImageObjectFromCloudFormation,
  fetchDefaultContestBanner,
} from "src/app/lib/Helper";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-talent-contest",
  templateUrl: "./talent-contest.component.html",
  styleUrls: ["./talent-contest.component.css"],
})
export class TalentContestComponent implements OnInit {
  userContests: IUserContestListAnalysis[] = [];
  cloudFrontDomain: string = `${environment.CLOUD_FORMATION_API}/fit-in/318x225`;

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

  initiated$ = this.store.pipe(
    select(fromContestEntry.selectContestEntrytrInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromContestEntry.selectContestEntryInProgressStatus)
  );

  completed$ = this.store.pipe(
    select(fromContestEntry.selectContestEntryCompletedStatus)
  );

  failed$ = this.store.pipe(
    select(fromContestEntry.selectContestEntryFailedStatus)
  );

  constructor(private store: Store<fromApp.AppState>) {
    this.fetchTalentEntries();
  }

  ngOnInit(): void {
    this.store
      .pipe(select(fromContestEntry.selectContestsUserParticipatedIn))
      .take(2)
      .subscribe((val: IUserContestListAnalysis[]) => {
        if (val !== null) {
          this.userContests = [];
          val.forEach((x) => {
            x = this.setContestBannerImage(x);
            this.userContests.push(x);
          });
        }
      });
  }

  fetchTalentEntries(): void {
    this.store.dispatch(new ContestEntryActions.FetchUserParticipatedContest());
  }

  trackByFn(index: number, item: IUserContestListAnalysis) {
    return item.contestId;
  }

  setContestBannerImage(
    data: IUserContestListAnalysis
  ): IUserContestListAnalysis {
    return Object.assign({}, data, {
      defaultContestBannerImage: fetchImageObjectFromCloudFormation(
        data.contestBanner,
        this.defaultParams
      ),
      fullContestBannerImage:
        data.contestBanner !== ""
          ? fetchImageObjectFromCloudFormation(
              data.contestBanner,
              this.editParams
            )
          : fetchDefaultContestBanner(),
    });
  }
}
