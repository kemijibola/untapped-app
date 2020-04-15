import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import * as NotificationActions from "./notification.action";
import { pipe } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import * as SnackBarActions from "../../../shared/notifications/snackbar/snackbar.action";
import {
  SnackBarData,
  AppNotificationKey,
  AppNotification,
} from "src/app/interfaces";

@Injectable()
export class NotificationEffect {
  addGlobalError = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.ADD_ERROR),
      pipe(
        map((action: NotificationActions.AddError) => action.payload),
        map((payload: AppNotification) => {
          if ([400, 403, 404, 409, 422].includes(payload.code)) {
            const snackBarConfig: SnackBarData = {
              message: payload["message"],
              action: "X",
              config: {
                panelClass: ["error-snackbar"],
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 7000,
              },
            };

            return {
              type: SnackBarActions.SNACKBAR_OPEN,
              payload: snackBarConfig,
            };
          }
          if (payload.code === 500) {
            // navigate to internal server error page
            console.log("internal server error");
          }
        })
        // map(
        //   () =>
        //     new NotificationActions.ClearNotification({
        //       type: AppNotificationKey.error,
        //     })
        // )
      )
    )
  );

  addGlobalSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.ADD_SUCCESS),
      pipe(
        map((action: NotificationActions.AddSuccess) => action.payload),
        map((payload) => {
          const snackBarConfig: SnackBarData = {
            message: payload["message"],
            action: "X",
            config: {
              panelClass: ["success-snackbar"],
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 7000,
            },
          };
          return {
            type: SnackBarActions.SNACKBAR_OPEN,
            payload: snackBarConfig,
          };
        })
        // map(
        //   () =>
        //     new NotificationActions.ClearNotification({
        //       type: AppNotificationKey.success,
        //     })
        // )
      )
    )
  );

  addGlobalInfo = createEffect(() =>
    this.actions$.pipe(
      ofType(NotificationActions.ADD_INFO),
      pipe(
        map((action: NotificationActions.AddInfo) => action.payload),
        map((payload) => {
          const snackBarConfig: SnackBarData = {
            message: payload.message,
            action: "X",
            config: {
              panelClass: ["info-snackbar"],
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 7000,
            },
          };
          return {
            type: SnackBarActions.SNACKBAR_OPEN,
            payload: snackBarConfig,
          };
        })
        // map(
        //   () =>
        //     new NotificationActions.ClearNotification({
        //       type: AppNotificationKey.success,
        //     })
        // )
      )
    )
  );

  constructor(private actions$: Actions) {}
}
