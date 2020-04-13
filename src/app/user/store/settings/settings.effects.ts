import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as fromApp from "../../../store/app.reducers";
import { Store } from "@ngrx/store";
import * as UserSettingsActions from "./settings.actions";
import { SettingsService } from "src/app/services/settings.service";
import { IResult, ISettings } from "src/app/interfaces";
import { map, switchMap, catchError } from "rxjs/operators";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";
import { of } from "rxjs";

@Injectable()
export class SettingsEffect {
  @Effect()
  fetchUserSettings = this.action$.pipe(
    ofType(UserSettingsActions.FETCH_USERSETTINGS),
    switchMap(() =>
      this.settingsService.fetchUserSettings().pipe(
        map((resp: IResult<ISettings>) => {
          return {
            type: UserSettingsActions.SET_USERSETTINGS,
            payload: resp.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  updateSetings = this.action$.pipe(
    ofType(UserSettingsActions.UPDATE_USERSETTINGS),
    switchMap((action: UserSettingsActions.UpdateUserSettings) =>
      this.settingsService.updateSettings(action.payload.updateObj).pipe(
        map((resp: IResult<ISettings>) => {
          return {
            type: UserSettingsActions.SET_USERSETTINGS,
            payload: resp.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
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
