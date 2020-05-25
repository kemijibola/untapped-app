import { Action } from "@ngrx/store";
import { IProfile, ISettings, IUser } from "../../../interfaces";

export const FETCH_USERPROFILE = "FETCH_USERPROFILE";
export const SET_USERPROFILE = "SET_USERPROFILE";
export const UPDATE_USERPROFILE = "UPDATE_USERPROFILE";
export const UPDATE_USER_SETTINGS_PREFERENCE =
  "UPDATE_USER_SETTINGS_PREFERENCE";
export const UPDATE_USER_SETTINGS_PREFERENCE_SUCCESS =
  "UPDATE_USER_SETTINGS_PREFERENCE_SUCCESS";
export const CREATE_USERPROFILE = "CREATE_USERPROFILE";
export const FETCH_USERPROFILE_ERROR = "FETCH_USERPROFILE_ERROR";
export const UPDATE_USERPROFILE_ERROR = "UPDATE_USERPROFILE_ERROR";
export const CREATE_USERPROFILE_ERROR = "CREATE_USERPROFILE_ERROR";

export const SUSPEND_USER_ACCOUNT = "SUSPEND_USER_ACCOUNT";
export const SUSPEND_USER_ACCOUNT_SUCCESS = "SUSPEND_USER_ACCOUNT_SUCCESS";
export const SUSPEND_USER_ACCOUNT_FAILURE = "SUSPEND_USER_ACCOUNT_FAILURE";

export class FetchUserProfileError implements Action {
  readonly type = FETCH_USERPROFILE_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class UpdateUserSettingsPreference implements Action {
  readonly type = UPDATE_USER_SETTINGS_PREFERENCE;
  constructor(public payload: { userSettings: IUser }) {}
}

export class UpdateUserSettingsPreferenceSuccess implements Action {
  readonly type = UPDATE_USER_SETTINGS_PREFERENCE_SUCCESS;
  constructor(public payload: { userSettings: IUser }) {}
}

export class UpdateUserProfileError implements Action {
  readonly type = UPDATE_USERPROFILE_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class CreateUserProfileError implements Action {
  readonly type = CREATE_USERPROFILE_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}
export class UpdateUserProfile implements Action {
  readonly type = UPDATE_USERPROFILE;
  constructor(public payload: IProfile) {}
}

export class FetchUserProfile implements Action {
  readonly type = FETCH_USERPROFILE;
}

export class SetUserProfile implements Action {
  readonly type = SET_USERPROFILE;
  constructor(public payload: { userProfile: IProfile }) {}
}

export class CreateUserProfile implements Action {
  readonly type = CREATE_USERPROFILE;
  constructor(public payload: IProfile) {}
}

export class SuspendUserAccount implements Action {
  readonly type = SUSPEND_USER_ACCOUNT;
}

export class SuspendUserAccountSuccess implements Action {
  readonly type = SUSPEND_USER_ACCOUNT_SUCCESS;
}
// SUSPEND_USER_ACCOUNT_FAILURE
// export class SuspendUserAccountFailure implements Action {
//   readonly type = SUSPEND_USER_ACCOUNT_FAILURE;
// }

export type ProfileActions =
  | UpdateUserProfile
  | FetchUserProfile
  | SetUserProfile
  | CreateUserProfile
  | FetchUserProfileError
  | UpdateUserProfileError
  | CreateUserProfileError
  | UpdateUserSettingsPreference
  | UpdateUserSettingsPreferenceSuccess
  | SuspendUserAccount
  | SuspendUserAccountSuccess;
