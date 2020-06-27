import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as ContestActions from "./../contest/contest.action";
import { ContestService } from "src/app/services/contest.service";
import { map, catchError, mergeMap, concatMap } from "rxjs/operators";
import {
  IResult,
  IContestList,
  IUserContest,
  IContest,
  AppNotificationKey,
  ContestData,
  ContestEligibilityData,
  ContestVoteResult,
} from "src/app/interfaces";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { PusherService } from "src/app/services/pusher.service";

@Injectable()
export class ContestEffect {
  checkEligibility = createEffect(() =>
    this.action$.pipe(
      ofType(ContestActions.CHECK_USER_ELIGIBILITY),
      concatMap((action: ContestActions.CheckUserEligibility) =>
        this.contestsService
          .checkUserEligibility(action.payload.contestId)
          .pipe(
            map(
              (resp: IResult<ContestEligibilityData>) =>
                new ContestActions.CheckUserEligibilitySuccess({
                  response: resp.data,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection.",
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private action$: Actions,
    private router: Router,
    private contestsService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
