import { Action } from "@ngrx/store";
import { ISettings } from "../../../interfaces";

export const UPDATE_USER_SETTINGS = "UPDATE_USER_SETTINGS";
export const UPDATE_USER_SETTINGS_SUCCESS = "UPDATE_USER_SETTINGS_SUCCESS";

export class UpdateUserSettings implements Action {
  readonly type = UPDATE_USER_SETTINGS;
  constructor(public payload: { updateObj: ISettings }) {}
}

export type UserSettingsAction = UpdateUserSettings;
