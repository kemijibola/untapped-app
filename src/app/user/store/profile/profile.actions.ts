import { Action } from "@ngrx/store";
import { IProfile } from "../../../interfaces";

export const FETCH_USERPROFILE = "FETCH_USERPROFILE";
export const SET_USERPROFILE = "SET_USERPROFILE";
export const UPDATE_USERPROFILE = "UPDATE_USERPROFILE";
export const CREATE_USERPROFILE = "CREATE_USERPROFILE";
export const FETCH_USERPROFILE_ERROR = "FETCH_USERPROFILE_ERROR";
export const UPDATE_USERPROFILE_ERROR = "UPDATE_USERPROFILE_ERROR";
export const CREATE_USERPROFILE_ERROR = "CREATE_USERPROFILE_ERROR";

export class FetchUserProfileError implements Action {
  readonly type = FETCH_USERPROFILE_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
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

export type ProfileActions =
  | UpdateUserProfile
  | FetchUserProfile
  | SetUserProfile
  | CreateUserProfile
  | FetchUserProfileError
  | UpdateUserProfileError
  | CreateUserProfileError;
