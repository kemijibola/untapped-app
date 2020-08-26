import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AdminApprovalService } from "src/app/services/back-office/approvals/admin-approvals.service";
import * as PendingMedia from "./media.action";
import { concatMap, map, catchError } from "rxjs/operators";
import { IMedia, IResult, AppNotificationKey } from "src/app/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../../store/global/notification/notification.action";
import { of } from "rxjs";

@Injectable()
export class PendingMediaEffect {
  fetchPendingApprovals = createEffect(() =>
    this.action$.pipe(
      ofType(PendingMedia.FETCH_PENDING_APPROVALS),
      concatMap((action: PendingMedia.FetchPendingApprovals) =>
        this.adminApprovalService.fetchPendingMediaApprovals().pipe(
          map(
            (resp: IResult<IMedia[]>) =>
              new PendingMedia.FetchPendingApprovalsSuccess({
                pendingApprovals: resp.data,
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
      ofType(PendingMedia.APPROVE_MEDIA),
      concatMap((action: PendingMedia.ApproveMedia) =>
        this.adminApprovalService
          .approveMediaItem(action.payload.mediaId, action.payload.mediaItemId)
          .pipe(
            map(
              (resp: IResult<boolean>) => new PendingMedia.ApproveMediaSuccess()
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
                new PendingMedia.ApproveMediaFailed()
              )
            )
          )
      )
    )
  );

  reject = createEffect(() =>
    this.action$.pipe(
      ofType(PendingMedia.REJECT_MEDIA),
      concatMap((action: PendingMedia.RejectMedia) =>
        this.adminApprovalService
          .rejectMediaItem(
            action.payload.mediaId,
            action.payload.mediaItemId,
            action.payload.reason
          )
          .pipe(
            map(
              (resp: IResult<boolean>) => new PendingMedia.RejectMediaSuccess()
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
                new PendingMedia.RejectMediaFailed()
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
