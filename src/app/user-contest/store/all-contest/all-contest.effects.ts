import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as AllContestActions from "./all-contest.actions";
import { ContestService } from "src/app/services/contest.service";
import { map, mergeMap } from "rxjs/operators";
import { IResult, IUserContest, IContest } from "src/app/interfaces";
import { Router } from "@angular/router";

@Injectable()
export class AllUserContestEffect {
  // @Effect()
  // fetchUserContests = this.action$
  //   .pipe(ofType(AllContestActions.FETCH_USER_CONTESTS))
  //   .switchMap((action: AllContestActions.FetchUserContests) => {
  //     return this.contestsService.fetchUserContests(action.payload.id);
  //   })
  //   .pipe(
  //     map((resp: IResult<IUserContest[]>) => {
  //       return {
  //         type: AllContestActions.SET_USER_CONTESTS,
  //         payload: resp.data
  //       };
  //     })
  //   );

  constructor(
    private action$: Actions,
    private router: Router,
    private contestsService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
