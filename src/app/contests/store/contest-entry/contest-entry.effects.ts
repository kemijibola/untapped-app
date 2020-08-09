import { IUserContestListAnalysis } from "./../../../interfaces/user/filter-category";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as ContestEntryActions from "./contest-entry.action";
import { ContestService } from "src/app/services/contest.service";
import { map, catchError, mergeMap, concatMap } from "rxjs/operators";
import {
  IResult,
  IContestList,
  IUserContest,
  IContest,
  AppNotificationKey,
  ContestData,
  IContestEntry,
} from "src/app/interfaces";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";

@Injectable()
export class ContestEntryEffect {
  createContestEntry = createEffect(() =>
    this.action$.pipe(
      ofType(ContestEntryActions.ENTER_CONTEST),
      concatMap((action: ContestEntryActions.EnterContest) =>
        this.contestsService.enterContest(action.payload.newContestEntry).pipe(
          mergeMap((resp: IResult<IContestEntry>) => {
            return [
              new ContestEntryActions.EnterContestSuccess({
                contestEntry: resp.data,
              }),
              new NotificationActions.AddSuccess({
                key: AppNotificationKey.success,
                code: 201,
                message: "Hooray! You have entered contest.",
              }),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection.",
              })
            )
          )
        )
      )
    )
  );

  fetchUserParticipatedContests = createEffect(() =>
    this.action$.pipe(
      ofType(ContestEntryActions.FETCH_USER_PARTICIPATED_CONTEST),
      concatMap((action: ContestEntryActions.FetchUserParticipatedContest) =>
        this.contestsService.fetchUserParticipatedContests().pipe(
          mergeMap((resp: IResult<IUserContestListAnalysis[]>) => [
            new ContestEntryActions.SetUserParticipatedContest({
              participatedInContests: resp.data,
            }),
            new ContestEntryActions.FetchUserParticipatedContestSuccess(),
          ]),
          catchError((respError: HttpErrorResponse) =>
            of(new ContestEntryActions.FetchUserParticipatedContestError())
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
