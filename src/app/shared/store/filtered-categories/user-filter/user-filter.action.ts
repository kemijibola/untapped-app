import { Action } from "@ngrx/store";

export const SET_FILTER_TEXT = "SET_FILTER_TEXT";

export class SetFilterText implements Action {
  readonly type = SET_FILTER_TEXT;
  constructor(public payload: { searchText: string }) {}
}

export type UserFilterActions = SetFilterText;
