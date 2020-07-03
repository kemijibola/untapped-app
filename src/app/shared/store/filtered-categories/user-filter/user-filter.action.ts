import { Action } from "@ngrx/store";
import { UserFilterRequest, UserFilterCategory } from "src/app/interfaces";

export const SET_FILTER_TEXT = "SET_FILTER_TEXT";
export const SET_FILTER_INPUT_STATE = "SET_FILTER_INPUT_STATE";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
"FETCH_ALL_TALENT_HIGHEST_COMMENT";
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS";
export const FETCH_USER = "FETCH_USER";

export class SetFilterText implements Action {
  readonly type = SET_FILTER_TEXT;
  constructor(public payload: { searchText: string }) {}
}

// export class SetFilterInputState implements Action {
//   readonly type = SET_FILTER_INPUT_STATE;
//   constructor(public payload: { state }) {}
// }
export class FetchAllUsers implements Action {
  readonly type = FETCH_ALL_USERS;
  constructor(public payload: { queryParams: UserFilterRequest }) {}
}

export class FetchUser implements Action {
  readonly type = FETCH_USER;
  constructor(public payload: { id: string }) {}
}

export class FetchAllUsersSuccess implements Action {
  readonly type = FETCH_ALL_USERS_SUCCESS;
  constructor(public payload: { users: UserFilterCategory[] }) {}
}

export type UserFilterActions =
  | SetFilterText
  | FetchAllUsers
  | FetchUser
  | FetchAllUsersSuccess;
