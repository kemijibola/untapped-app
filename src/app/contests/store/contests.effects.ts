import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as ContestsActions from "./contests.action";
import { ContestService } from "src/app/services/contest.service";
import { map, switchMap, catchError, mergeMap } from "rxjs/operators";
import {
  IResult,
  IContestList,
  IUserContest,
  IContest,
  AppNotificationKey,
} from "src/app/interfaces";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../store/global/notification/notification.action";

@Injectable()
export class ContestsEffect {
  fetchAllContests = createEffect(() =>
    this.action$.pipe(
      ofType(ContestsActions.FETCH_CONTESTS_PREVIEW),
      switchMap((action: ContestsActions.FetchContestsPreview) =>
        this.contestsService
          .fetchContestPreviews(action.payload.page, action.payload.perPage)
          .pipe(
            map(
              (resp: IResult<IContestList[]>) =>
                new ContestsActions.FetchContestsPreviewSuccess({
                  runningContests: resp.data,
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
