import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as fromApp from '../../../store/app.reducers';
import { Store } from '@ngrx/store';
import * as UserSettingsActions from './settings.actions';
import { SettingsService } from 'src/app/services/settings.service';
import { IResult, ISettings } from 'src/app/interfaces';
import { map } from 'rxjs/operators';

@Injectable()
export class SettingsEffect {
  @Effect()
  fetchUserSettings = this.action$
    .pipe(ofType(UserSettingsActions.FETCH_USERSETTINGS))
    .switchMap(() => {
      return this.settingsService.fetchUserSettings();
    })
    .pipe(
      map((resp: IResult<ISettings>) => {
        return {
          type: UserSettingsActions.SET_USERSETTINGS,
          payload: resp.data
        };
      })
    );

  updateSetings = this.action$
    .pipe(ofType(UserSettingsActions.UPDATE_USERSETTINGS))
    .switchMap((action: UserSettingsActions.UpdateUserSettings) => {
      return this.settingsService.updateSettings(action.payload);
    })
    .pipe(
      map((resp: IResult<ISettings>) => {
        return {
          type: UserSettingsActions.SET_USERSETTINGS,
          payload: resp.data
        };
      })
    );
  constructor(
    private action$: Actions,
    private settingsService: SettingsService,
    private store: Store<fromApp.AppState>
  ) {}
}
