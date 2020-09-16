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
  AllContestViewModel,
  CompetitionParticipant,
  IVoteResult,
} from "src/app/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

@Injectable()
export class AllUserContestEffect {
  fetchContestsCreatedByUser = createEffect(() =>
    this.action$.pipe(
      ofType(AllContestActions.FETCH_USER_CONTEST_LIST),
      concatMap((action: AllContestActions.FetchUserContestList) =>
        this.contestService
          .fetchContestsCreatedByUser(
            action.payload.page,
            action.payload.perPage
          )
          .pipe(
            map(
              (resp: IResult<AllContestViewModel[]>) =>
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
                    respError.error.response_message ||
                    "No Internet connection",
                })
              )
            )
          )
      )
    )
  );

  fetchContestParticipants = createEffect(() =>
    this.action$.pipe(
      ofType(AllContestActions.FETCH_COMPETITION_PARTICIPANTS),
      concatMap((action: AllContestActions.FetchCompetitionParticipants) =>
        this.contestService
          .fetchContestParticipants(action.payload.contestId)
          .pipe(
            map(
              (resp: IResult<CompetitionParticipant[]>) =>
                new AllContestActions.FetchCompetitionParticipantsSuccess({
                  participants: resp.data,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                }),
                new AllContestActions.FetchCompetitionParticipantsFailed()
              )
            )
          )
      )
    )
  );

  fetchUserCompetitionResult = createEffect(() =>
    this.action$.pipe(
      ofType(AllContestActions.FETCH_COMPETITION_RESULT),
      concatMap((action: AllContestActions.FetchCompetitionResult) =>
        this.contestService
          .fetchUserCompetitionResult(action.payload.contestId)
          .pipe(
            map(
              (resp: IResult<IVoteResult[]>) =>
                new AllContestActions.FetchCompetitionResultSuccess({
                  competitionResults: resp.data,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                }),
                new AllContestActions.FetchCompetitionResultFailed()
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
