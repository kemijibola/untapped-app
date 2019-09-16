import { Action } from '@ngrx/store';
import { ISettings } from '../../../interfaces';

export const FETCH_USERSETTINGS = 'FETCH_USERSETTINGS';
export const SET_USERSETTINGS = 'SET_USERSETTINGS';
export const UPDATE_USERSETTINGS = 'UPDATE_USERSETTINGS';

export class FetchUserSettings implements Action {
  readonly type = FETCH_USERSETTINGS;
}

export class SetUserSettings implements Action {
  readonly type = SET_USERSETTINGS;
  constructor(public payload: { userSetting: ISettings }) {}
}

export class UpdateUserSettings implements Action {
  readonly type = UPDATE_USERSETTINGS;
  constructor(public payload: { updateObj: ISettings }) {}
}

export type UserSettingsAction =
  | FetchUserSettings
  | SetUserSettings
  | UpdateUserSettings;
