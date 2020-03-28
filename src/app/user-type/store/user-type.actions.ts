import { Action } from "@ngrx/store";
import { IUserType } from "src/app/interfaces";

export const FETCH_USER_TYPES = "FETCH_USER_TYPES";
export const FETCH_USER_TYPES_SUCCESS = "FETCH_USER_TYPES_SUCCESS";
export const FETCH_USER_TYPES_ERROR = "FETCH_USER_TYPES_ERROR";
export const SET_SELECTED_USER_TYPE = "SET_SELECTED_USER_TYPE";
export const RESET_SELECTED_USER_TYPE = "RESET_SELECTED_USER_TYPE";

export class FetchUserTypesSucess implements Action {
  readonly type = FETCH_USER_TYPES_SUCCESS;
  constructor(public payload: { userTypes: IUserType[] }) {}
}

export class FetchUserTypesError implements Action {
  readonly type = FETCH_USER_TYPES_ERROR;
  constructor(public payload: { error: string }) {}
}

export class FetchUserTypes implements Action {
  readonly type = FETCH_USER_TYPES;
}

export class SetSelectedUserType implements Action {
  readonly type = SET_SELECTED_USER_TYPE;
  constructor(public payload: { selectedUserType: IUserType }) {}
}

export class ResetSelectedUserType implements Action {
  readonly type = RESET_SELECTED_USER_TYPE;
  constructor(public payload: { selectedUserType: IUserType }) {}
}

export type UserTypeActions =
  | FetchUserTypesSucess
  | FetchUserTypes
  | SetSelectedUserType
  | ResetSelectedUserType
  | FetchUserTypesError;
