import { Component, OnInit } from "@angular/core";
import * as ContestEntryActions from "../../contests/store/contest-entry/contest-entry.action";
import * as fromContestEntry from "../../contests/store/contest-entry/contest-entry.reducer";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { IUserContestListAnalysis } from "src/app/interfaces";
import { Observable } from "rxjs";

@Component({
  selector: "app-talent-contest",
  templateUrl: "./talent-contest.component.html",
  styleUrls: ["./talent-contest.component.css"],
})
export class TalentContestComponent implements OnInit {
  userContests: IUserContestListAnalysis[] = [];
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new ContestEntryActions.FetchUserParticipatedContest());

    this.store
      .pipe(select(fromContestEntry.selectContestsUserParticipatedIn))
      .subscribe((val: IUserContestListAnalysis[]) => {
        if (val !== null) {
          this.userContests = [...val];
        }
      });
  }
}
