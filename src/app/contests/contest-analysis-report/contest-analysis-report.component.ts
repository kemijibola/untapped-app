import { Observable, of } from "rxjs";
import {
  VoteEvent,
  ContestVoteResult,
} from "./../../interfaces/contests/Contest";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as ContestsAction from "../store/contests.action";
import * as fromContest from "../store/contests.reducers";
import { PusherService } from "src/app/services/pusher.service";
import { environment } from "src/environments/environment";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import {
  fetchImageObjectFromCloudFormation,
  fetchDefaultContestBanner,
  fetchNoMediaDefaultImage,
} from "src/app/lib/Helper";

@Component({
  selector: "app-contest-analysis-report",
  templateUrl: "./contest-analysis-report.component.html",
  styleUrls: ["./contest-analysis-report.component.css"],
})
export class ContestAnalysisReportComponent implements OnInit {
  contestId: string | null;
  contestVoteResult: ContestVoteResult | null;
  keyword = environment.CONTEST_KEYWORD;
  textNumber = environment.CONTEST_TO_NUMBER;

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

  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 370,
        height: 307,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  entryContestantParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 270,
        height: 222,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  entryContestantDefaultParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 30,
        height: 30,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  defaultBannerImage: string = "";
  fullBannerImage: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private pusherService: PusherService
  ) {}

  ngOnInit(): void {
    this.contestId = this.route.snapshot.params.id;
    if (this.contestId !== null) {
      this.store.dispatch(
        new ContestsAction.FetchContestVoteResult({ contestId: this.contestId })
      );

      this.store
        .pipe(select(fromContest.selectContestVoteResult))
        .take(2)
        .subscribe((val: ContestVoteResult) => {
          if (val !== null) {
            this.setContestantProfileIImage(val);
            this.setContestBannerImage(val.contestPhoto);
          }
        });

      this.pusherService.channel.bind(VoteEvent.VOTE_RESULT, (data: any) => {
        this.setContestantProfileIImage(data);
      });
    }
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

  setContestantProfileIImage(contestData: ContestVoteResult) {
    // if (contestData)
    this.contestVoteResult = contestData;
    this.contestVoteResult.entries = contestData.entries.map((x) => {
      return Object.assign({}, x, {
        defaultUserProfileImage: fetchImageObjectFromCloudFormation(
          x.contestantPhoto,
          this.entryContestantDefaultParams
        ),
        fullUserProfileImage:
          x.contestantPhoto !== ""
            ? fetchImageObjectFromCloudFormation(
                x.contestantPhoto,
                this.entryContestantParams
              )
            : fetchNoMediaDefaultImage(),
      });
    });
  }

  navigateToPrevious(contestId: string): void {
    this.router.navigate(["/competitions/", contestId]);
  }
}
