import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AdminApprovalService } from "src/app/services/back-office/approvals/admin-approvals.service";
import * as PendingContestAction from "./contest.action";
import { concatMap, map, catchError } from "rxjs/operators";
import { IResult, AppNotificationKey, IContest } from "src/app/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../../store/global/notification/notification.action";
import { of } from "rxjs";

@Injectable()
export class PendingContestEffect {
  fetchPendingApprovals = createEffect(() =>
    this.action$.pipe(
      ofType(PendingContestAction.FETCH_PENDING_CONTESTS),
      concatMap((action: PendingContestAction.FetchPendingContests) =>
        this.adminApprovalService.fetchPendingContest().pipe(
          map(
            (resp: IResult<IContest[]>) =>
              new PendingContestAction.FetchPendingContestsSuccess({
                pendingContests: resp.data,
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

  approve = createEffect(() =>
    this.action$.pipe(
      ofType(PendingContestAction.APPROVE_CONTEST),
      concatMap((action: PendingContestAction.ApproveContest) =>
        this.adminApprovalService.approveContest(action.payload.contestId).pipe(
          map(
            (resp: IResult<boolean>) =>
              new PendingContestAction.ApproveContestSuccess()
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new PendingContestAction.ApproveContestFailed()
            )
          )
        )
      )
    )
  );

  reject = createEffect(() =>
    this.action$.pipe(
      ofType(PendingContestAction.REJECT_CONTEST),
      concatMap((action: PendingContestAction.RejectContest) =>
        this.adminApprovalService.rejectContest(action.payload.contestId).pipe(
          map(
            (resp: IResult<boolean>) =>
              new PendingContestAction.RejectContestSuccess()
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new PendingContestAction.RejectContestFailed()
            )
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private adminApprovalService: AdminApprovalService
  ) {}
}
