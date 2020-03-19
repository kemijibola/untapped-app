import { Action } from "@ngrx/store";
import { UserFilterCategory, ReportType } from "src/app/interfaces";

export const FETCH_ALL_TALENT_HIGHEST_COMMENT =
  "FETCH_ALL_TALENT_HIGHEST_COMMENT";
export const SET_ALL_TALENT_HIGHEST_COMMENT = "SET_ALL_TALENT_HIGHEST_COMMENT";
export const SET_SELECTED_USER = "SET_SELECTED_USER";

export class FetchAllTalentHighestComment implements Action {
  readonly type = FETCH_ALL_TALENT_HIGHEST_COMMENT;
  constructor(public payload: ReportType) {}
}

export class SetAllTalentHighestComment implements Action {
  readonly type = SET_ALL_TALENT_HIGHEST_COMMENT;
  constructor(public payload: UserFilterCategory[]) {}
}

export class SetSelectedUser implements Action {
  readonly type = SET_SELECTED_USER;
  constructor(public payload: UserFilterCategory) {}
}

export type UserCategoryActions =
  | FetchAllTalentHighestComment
  | SetAllTalentHighestComment
  | SetSelectedUser;
