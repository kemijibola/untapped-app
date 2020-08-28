import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AdminApprovalService } from "src/app/services/back-office/approvals/admin-approvals.service";
import * as PendingUserAction from "./profile.action";
import { concatMap, map, catchError } from "rxjs/operators";
import { TalentProfile, IResult, AppNotificationKey } from "src/app/interfaces";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../../store/global/notification/notification.action";
import { of } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { ProfileService } from "src/app/services/profile.service";

@Injectable()
export class PendingUserEffect {
  fetchPendingApprovals = createEffect(() =>
    this.action$.pipe(
      ofType(PendingUserAction.FETCH_PENDING_USERS),
      concatMap((action: PendingUserAction.FetchPendingUsers) =>
        this.profileService.fetchUserPendingApproval().pipe(
          map(
            (resp: IResult<TalentProfile[]>) =>
              new PendingUserAction.FetchPendingUsersSuccess({
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
      ofType(PendingUserAction.APPROVE_USER),
      concatMap((action: PendingUserAction.ApproveUser) =>
        this.userService.updateUserProfileStatus(action.payload.userId).pipe(
          map(
            (resp: IResult<boolean>) =>
              new PendingUserAction.ApproveUserSuccess()
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new PendingUserAction.ApproveUserFailed()
            )
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private userService: UserService,
    private profileService: ProfileService
  ) {}
}
