import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AdminApprovalService } from "src/app/services/back-office/approvals/admin-approvals.service";
import * as PendingEntryAction from "./entry.action";
import { concatMap, map, catchError } from "rxjs/operators";
import {
  IResult,
  AppNotificationKey,
  IContestEntryDetails,
} from "src/app/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../../store/global/notification/notification.action";
import { of } from "rxjs";

@Injectable()
export class PendingEntryEffect {
  fetchPendingApprovals = createEffect(() =>
    this.action$.pipe(
      ofType(PendingEntryAction.FETCH_PENDING_ENTRIES),
      concatMap((action: PendingEntryAction.FetchPendingEntries) =>
        this.adminApprovalService.fetchPendingEntries().pipe(
          map(
            (resp: IResult<IContestEntryDetails[]>) =>
              new PendingEntryAction.FetchPendingEntriesSuccess({
                pendingEntries: resp.data,
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
      ofType(PendingEntryAction.APPROVE_ENTRY),
      concatMap((action: PendingEntryAction.ApproveEntry) =>
        this.adminApprovalService.approveEntry(action.payload.entryId).pipe(
          map(
            (resp: IResult<boolean>) =>
              new PendingEntryAction.ApproveEntrySuccess()
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new PendingEntryAction.ApproveEntryFailed()
            )
          )
        )
      )
    )
  );

  reject = createEffect(() =>
    this.action$.pipe(
      ofType(PendingEntryAction.REJECT_ENTRY),
      concatMap((action: PendingEntryAction.RejectEntry) =>
        this.adminApprovalService
          .rejectEntry(action.payload.entryId, action.payload.reason)
          .pipe(
            map(
              (resp: IResult<boolean>) =>
                new PendingEntryAction.RejectEntrySuccess()
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
                new PendingEntryAction.RejectEntryFailed()
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
