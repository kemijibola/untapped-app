import {
  VoteEvent,
  ContestVoteResult,
} from "./../../interfaces/contests/Contest";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as ContestsAction from "../store/contests.action";
import * as fromContest from "../store/contests.reducers";
import { PusherService } from "src/app/services/pusher.service";

@Component({
  selector: "app-contest-analysis-report",
  templateUrl: "./contest-analysis-report.component.html",
  styleUrls: ["./contest-analysis-report.component.css"],
})
export class ContestAnalysisReportComponent implements OnInit {
  contestId: string | null;
  contestVoteResult: ContestVoteResult | null;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private pusherService: PusherService
  ) {}

  ngOnInit(): void {
    this.contestId = this.route.snapshot.params.id;
    if (this.contestId !== null) {
      console.log(this.contestId);
      this.store.dispatch(
        new ContestsAction.FetchContestVoteResult({ contestId: this.contestId })
      );

      this.store
        .pipe(select(fromContest.selectContestVoteResult))
        .subscribe((val: ContestVoteResult) => {
          if (val) {
            this.contestVoteResult = { ...val["voteResult"] };
            console.log(val);
          }
        });

      this.pusherService.channel.bind(VoteEvent.VOTE_RESULT, (data: any) => {
        console.log("from pusher", data);
        this.contestVoteResult = { ...data };
      });
    }
  }
}
