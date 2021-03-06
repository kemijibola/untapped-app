import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as NewContestActions from "./new-contest.actions";
import { ContestService } from "src/app/services/contest.service";
import { map, mergeMap, catchError, concatMap, tap } from "rxjs/operators";
import {
  IResult,
  IUserContest,
  IContest,
  AppNotificationKey,
} from "src/app/interfaces";
import { Router } from "@angular/router";
import { of, pipe } from "rxjs";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class NewUserContestEffect {
  createContest = createEffect(() =>
    this.actions$.pipe(
      ofType(NewContestActions.CREATE_CONTEST),
      concatMap((action: NewContestActions.CreateContest) =>
        this.contestsService.createContest(action.payload.newContest).pipe(
          mergeMap((resp: IResult<IContest>) => {
            return [
              new NewContestActions.SetContest({
                contest: resp.data,
              }),
              new NewContestActions.CreateContestSuccess(),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new NewContestActions.CreateContestError()
            )
          )
        )
      )
    )
  );

  createSmsContest = createEffect(() =>
    this.actions$.pipe(
      ofType(NewContestActions.CREATE_SMS_VOTE),
      concatMap((action: NewContestActions.CreateSmsVote) =>
        this.contestsService.createSMSContest(action.payload.smsContest).pipe(
          mergeMap((resp: IResult<IContest>) => [
            new NotificationActions.AddSuccess({
              key: AppNotificationKey.success,
              code: 200,
              message: "SMS Vote created successfully",
            }),
            new NewContestActions.CreateSmsVoteSuccess({
              smsContest: resp.data,
            }),
          ]),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new NewContestActions.CreateSmsVoteFailed()
            )
          )
        )
      )
    )
  );

  updateContest = createEffect(() =>
    this.actions$.pipe(
      ofType(NewContestActions.UPDATE_CONTEST),
      concatMap((action: NewContestActions.UpdateContest) =>
        this.contestsService.updateContest(action.payload.newContest).pipe(
          mergeMap((resp: IResult<IContest>) => {
            return [
              new NewContestActions.SetContest({
                contest: resp.data,
              }),
              new NewContestActions.CreateContestSuccess(),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new NewContestActions.UpdateContestError()
            )
          )
        )
      )
    )
  );

  createContestSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NewContestActions.CREATE_CONTEST_SUCCESS),
        pipe(
          tap(() => this.router.navigate(["/user/competition/new/overview"]))
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private contestsService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
