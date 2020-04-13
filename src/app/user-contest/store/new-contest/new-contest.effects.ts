import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as NewContestActions from "./new-contest.actions";
import { ContestService } from "src/app/services/contest.service";
import { map, switchMap, mergeMap, catchError } from "rxjs/operators";
import { IResult, IUserContest, IContest } from "src/app/interfaces";
import { Router } from "@angular/router";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";

@Injectable()
export class UserContestEffect {
  @Effect()
  createContest = this.action$.pipe(
    ofType(NewContestActions.CREATE_CONTEST),
    switchMap((action: NewContestActions.CreateContest) =>
      this.contestsService.createContest(action.payload).pipe(
        mergeMap((resp: IResult<IContest>) => {
          return [
            {
              type: NewContestActions.SET_CONTEST_SUCCESS
            },
            {
              type: NewContestActions.SET_NEW_CONTEST,
              payload: resp.data
            }
          ];
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  // @Effect({ dispatch: false })
  // createContestSuccess = this.action$
  //   .pipe(ofType(NewContestActions.SET_CONTEST_SUCCESS))
  //   .do((action: NewContestActions.SetContestSuccess) => {
  //     this.router.navigate(["/new-contest/success/overview"]);
  //   });

  // @Effect()
  // updateContestJudge = this.action$
  //   .pipe(ofType(NewContestActions.ADD_CONTEST_JUDGE))
  //   .switchMap((action: NewContestActions.AddContestJudge) => {
  //     const { _id, judges } = action.payload;
  //     return this.contestsService.updateContestWithJudge(_id, judges);
  //   })
  //   .pipe(
  //     map((resp: IResult<IContest>) => {
  //       // TODO:: on success, navigate to user/contest?tab=all
  //     })
  //   );

  constructor(
    private action$: Actions,
    private router: Router,
    private contestsService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
