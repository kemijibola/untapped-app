import { Action } from "@ngrx/store";
import { IUserType } from "src/app/interfaces";

export const FETCH_USER_TYPES = "FETCH_USER_TYPES";
export const FETCH_USER_TYPE = "FETCH_USER_TYPE";
export const FETCH_USER_TYPES_SUCCESS = "FETCH_USER_TYPES_SUCCESS";
export const SET_USER_TYPES = "SET_USER_TYPES";
export const FETCH_USER_TYPES_ERROR = "FETCH_USER_TYPES_ERROR";

export class FetchUserTypesSucess implements Action {
  readonly type = FETCH_USER_TYPES_SUCCESS;
}

export class SetUserTypes implements Action {
  readonly type = SET_USER_TYPES;
  constructor(public payload: { userTypes: IUserType[] }) {}
}

export class FetchUserTypesError implements Action {
  readonly type = FETCH_USER_TYPES_ERROR;
}

export class FetchUserType implements Action {
  readonly type = FETCH_USER_TYPE;
  constructor(public payload: { userTypeId: string }) {}
}

export class FetchUserTypes implements Action {
  readonly type = FETCH_USER_TYPES;
}

export type UserTypeActions =
  | FetchUserTypesSucess
  | FetchUserTypes
  | FetchUserType
  | FetchUserTypesError
  | SetUserTypes;
