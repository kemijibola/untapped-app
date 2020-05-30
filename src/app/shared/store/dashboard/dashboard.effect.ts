import { Injectable } from "@angular/core";
import { ContestService } from "src/app/services/contest.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as DashboardActions from "./dashboard.action";
import { ContestWithEntriesPreview } from "src/app/interfaces/shared/dashboard";
import { mergeMap, concatMap, map, catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { AppNotificationKey, IResult } from "src/app/interfaces";
import { of } from "rxjs";

@Injectable()
export class DashboardEffects {
  fetchRunningContests = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.FETCH_DASHBOARD_CONTESTS),
      concatMap(() =>
        this.contestService.fetchRunningContests().pipe(
          map(
            (response: IResult<ContestWithEntriesPreview[]>) =>
              new DashboardActions.FetchDashboardContestsSuccess({
                runningContests: response.data,
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

  constructor(
    private actions$: Actions,
    private contestService: ContestService
  ) {}
}
