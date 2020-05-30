import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { ContestService } from "src/app/services/contest.service";
import * as AllContestActions from "./../all-contest/all-contest.actions";
import { concatMap, map, catchError, mergeMap } from "rxjs/operators";
import {
  IResult,
  IContest,
  AppNotificationKey,
  IUserContest,
  IUserContestListAnalysis,
} from "src/app/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class AllUserContestEffect {
  fetchContestsCreatedByUser = createEffect(() =>
    this.action$.pipe(
      ofType(AllContestActions.FETCH_USER_CONTEST_LIST),
      concatMap(() =>
        this.contestService.fetchContestsCreatedByUser().pipe(
          map(
            (resp: IResult<IUserContestListAnalysis[]>) =>
              new AllContestActions.FetchUserContestListSuccess({
                userContests: resp.data,
              })
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  // fetchContestsCreatedByCurrentUser = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(AllContestActions.FETCH_CONTESTS_CREATED_BY_USER),
  //     concatMap(() =>
  //       this.contestService.fetchContestsCreatedByUser().pipe(
  //         map(
  //           (resp: IResult<IUserContestListAnalysis[]>) =>
  //             new AllContestActions.FatchContestCreatedByUserSuccess({
  //               createdbyUser: resp.data,
  //             })
  //         ),
  //         catchError((respError: HttpErrorResponse) =>
  //           of(
  //             new NotificationActions.AddError({
  //               key: AppNotificationKey.error,
  //               code: respError.error.response_code || -1,
  //               message:
  //                 respError.error.response_message || "No Internet connection",
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );

  constructor(
    private action$: Actions,
    private contestService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
