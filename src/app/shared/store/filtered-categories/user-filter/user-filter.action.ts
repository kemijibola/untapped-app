import { Action } from "@ngrx/store";
import { UserFilterRequest, UserFilterCategory } from "src/app/interfaces";

export const SET_FILTER_TEXT = "SET_FILTER_TEXT";
export const SET_FILTER_INPUT_STATE = "SET_FILTER_INPUT_STATE";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const SET_ALL_USERS = "SET_ALL_USERS";
export const FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS";
export const FETCH_ALL_USERS_ERROR = "FETCH_ALL_USERS_ERROR";
export const FETCH_USER = "FETCH_USER";

export const LIKE_TALENT = "LIKE_TALENT";
export const LIKE_TALENT_SUCCESS = "LIKE_TALENT_SUCCESS";
export const LIKE_TALENT_ERROR = "LIKE_TALENT_ERROR";

export const UNLIKE_TALENT = "UNLIKE_TALENT";
export const UNLIKE_TALENT_SUCCESS = "UNLIKE_TALENT_SUCCESS";
export const UNLIKE_TALENT_ERROR = "UNLIKE_TALENT_ERROR";

export class SetFilterText implements Action {
  readonly type = SET_FILTER_TEXT;
  constructor(public payload: { searchText: string }) {}
}

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
}

export class FetchAllUsersError implements Action {
  readonly type = FETCH_ALL_USERS_ERROR;
}
export class SetAllUsers implements Action {
  readonly type = SET_ALL_USERS;
  constructor(public payload: { users: UserFilterCategory[] }) {}
}

export class LikeTalent implements Action {
  readonly type = LIKE_TALENT;
  constructor(public payload: { user: UserFilterCategory; likedBy: string }) {}
}

export class LikeTalentSuccess implements Action {
  readonly type = LIKE_TALENT_SUCCESS;
  constructor(public payload: { user: UserFilterCategory }) {}
}

export class LikeTalentError implements Action {
  readonly type = LIKE_TALENT_ERROR;
  constructor(public payload: { user: UserFilterCategory; likedBy: string }) {}
}

export class UnLikeTalent implements Action {
  readonly type = UNLIKE_TALENT;
  constructor(
    public payload: { user: UserFilterCategory; unLikedBy: string }
  ) {}
}

export class UnLikeTalentSuccess implements Action {
  readonly type = UNLIKE_TALENT_SUCCESS;
  constructor(public payload: { user: UserFilterCategory }) {}
}

export class UnLikeTalentError implements Action {
  readonly type = UNLIKE_TALENT_ERROR;
  constructor(
    public payload: { user: UserFilterCategory; unLikedBy: string }
  ) {}
}

export type UserFilterActions =
  | SetFilterText
  | FetchAllUsers
  | FetchUser
  | FetchAllUsersSuccess
  | LikeTalent
  | LikeTalentSuccess
  | LikeTalentError
  | UnLikeTalent
  | UnLikeTalentSuccess
  | UnLikeTalentError
  | FetchAllUsersError
  | SetAllUsers;
