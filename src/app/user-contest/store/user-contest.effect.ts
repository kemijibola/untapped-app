import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import * as NotificationActions from "../../store/global/notification/notification.action";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { ContestService } from "src/app/services/contest.service";
import * as UserContestActions from "./user-contest.action";
import { concatMap, map, catchError, mergeMap } from "rxjs/operators";
import {
  IResult,
  IContest,
  AppNotificationKey,
  IUserContest,
} from "src/app/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class UserContestEffect {
  fetchUserContests = createEffect(() =>
    this.action$.pipe(
      ofType(UserContestActions.FETCH_USER_CONTEST_LIST),
      concatMap(() =>
        this.contestService.fetchUserContests().pipe(
          map(
            (resp: IResult<IUserContest[]>) =>
              new UserContestActions.FetchUserContestListSuccess({
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

  createContest = createEffect(() =>
    this.action$.pipe(
      ofType(UserContestActions.CREATE_CONTEST),
      concatMap((action: UserContestActions.CreateContest) =>
        this.contestService.createContest(action.payload.newContest).pipe(
          mergeMap((resp: IResult<IContest>) => {
            return [
              new UserContestActions.FetchUserContestById({
                contestId: resp.data._id,
              }),
              new NotificationActions.AddSuccess({
                key: AppNotificationKey.success,
                code: 200,
                message: "Contest successfully created",
              }),
            ];
          }),
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

  constructor(
    private action$: Actions,
    private contestService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
