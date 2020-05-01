import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as fromApp from "../../../store/app.reducers";
import { Store } from "@ngrx/store";
import * as UserSettingsActions from "./settings.actions";
import { SettingsService } from "src/app/services/settings.service";
import { IResult, ISettings, AppNotificationKey } from "src/app/interfaces";
import { map, concatMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";

@Injectable()
export class SettingsEffect {
  @Effect()
  fetchUserSettings = this.action$.pipe(
    ofType(UserSettingsActions.FETCH_USERSETTINGS),
    concatMap(() =>
      this.settingsService.fetchUserSettings().pipe(
        map((resp: IResult<ISettings>) => {
          return {
            type: UserSettingsActions.SET_USERSETTINGS,
            payload: resp.data,
          };
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
  );

  updateSetings = this.action$.pipe(
    ofType(UserSettingsActions.UPDATE_USERSETTINGS),
    concatMap((action: UserSettingsActions.UpdateUserSettings) =>
      this.settingsService.updateSettings(action.payload.updateObj).pipe(
        map((resp: IResult<ISettings>) => {
          return {
            type: UserSettingsActions.SET_USERSETTINGS,
            payload: resp.data,
          };
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
  );

  constructor(
    private action$: Actions,
    private settingsService: SettingsService,
    private store: Store<fromApp.AppState>
  ) {}
}
