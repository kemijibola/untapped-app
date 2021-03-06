import { ContestVoteResult } from "./../../interfaces/contests/Contest";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as ContestsActions from "./contests.action";
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
} from "src/app/interfaces";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../store/global/notification/notification.action";
import { PusherService } from "src/app/services/pusher.service";

@Injectable()
export class ContestsEffect {
  fetchAllContests = createEffect(() =>
    this.action$.pipe(
      ofType(ContestsActions.FETCH_CONTESTS_PREVIEW),
      concatMap((action: ContestsActions.FetchContestsPreview) =>
        this.contestsService
          .fetchContestPreviews(action.payload.page, action.payload.perPage)
          .pipe(
            mergeMap((resp: IResult<IContestList[]>) => [
              new ContestsActions.SetContestsPreview({
                runningContests: resp.data,
              }),
              new ContestsActions.FetchContestsPreviewSuccess(),
            ]),
            catchError((respError: HttpErrorResponse) =>
              of(new ContestsActions.FetchContestsPreviewError())
            )
          )
      )
    )
  );

  fetchContestDetailsById = createEffect(() =>
    this.action$.pipe(
      ofType(ContestsActions.FETCH_CONTEST_BY_ID),
      concatMap((action: ContestsActions.FetchContestById) =>
        this.contestsService.fetchContest(action.payload.id).pipe(
          map(
            (resp: IResult<ContestData>) =>
              new ContestsActions.FetchContestByIdSuccess({
                contest: resp.data,
              })
          ),
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

  fetchContestVoteResult = createEffect(() =>
    this.action$.pipe(
      ofType(ContestsActions.FETCH_CONTEST_VOTE_RESULT),
      concatMap((action: ContestsActions.FetchContestVoteResult) =>
        this.pusherService.fetchContestResult(action.payload.contestId).pipe(
          map(
            (resp: IResult<ContestVoteResult>) =>
              new ContestsActions.SetContestVoteResult({
                voteResult: resp.data,
              })
          ),
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

  fetchContestResult = createEffect(() =>
    this.action$.pipe(
      ofType(ContestsActions.FETCH_CONTEST_VOTE_RESULT),
      concatMap((action: ContestsActions.FetchContestVoteResult) =>
        this.pusherService.fetchContestResult(action.payload.contestId).pipe(
          map(
            (resp: IResult<ContestVoteResult>) =>
              new ContestsActions.SetContestVoteResult({
                voteResult: resp.data,
              })
          ),
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


  postContestLike = createEffect(() =>
    this.action$.pipe(
      ofType(ContestsActions.ADD_CONTEST_LIKE),
      concatMap((action: ContestsActions.AddContestLike) =>
        this.contestsService
          .postContestLike(action.payload.contest.contest._id)
          .pipe(
            map(
              (resp: IResult<boolean>) =>
                new ContestsActions.AddContestLikeSuccess()
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new ContestsActions.AddContestLikeError({
                  contest: action.payload.contest,
                  likedBy: action.payload.likedBy,
                })
              )
            )
          )
      )
    )
  );

  postContestPageView = createEffect(() =>
    this.action$.pipe(
      ofType(ContestsActions.POST_CONTEST_VIEW),
      concatMap((action: ContestsActions.PostContestView) =>
        this.contestsService.postContestPageView(action.payload.id).pipe(
          map(
            (resp: IResult<boolean>) =>
              new ContestsActions.PostContestViewSuccess()
          ),
          catchError((respError: HttpErrorResponse) =>
            of(new ContestsActions.PostContestViewFailed())
          )
        )
      )
    )
  );

  postContestUnLike = createEffect(() =>
    this.action$.pipe(
      ofType(ContestsActions.REMOVE_CONTEST_LIKE),
      concatMap((action: ContestsActions.RemoveContestLike) =>
        this.contestsService
          .postContestUnLike(action.payload.contest.contest._id)
          .pipe(
            map(
              (resp: IResult<boolean>) =>
                new ContestsActions.RemoveContestLikeSuccess()
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new ContestsActions.RemoveContestLikeError({
                  contest: action.payload.contest,
                  likedBy: action.payload.unLikedBy,
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
    private pusherService: PusherService,
    private store: Store<fromApp.AppState>
  ) {}
}
