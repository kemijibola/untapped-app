import { Action } from "@ngrx/store";
import { CategoryType } from "src/app/interfaces";

export const FETCH_CATEGORY_TYPES = "FETCH_CATEGORY_TYPES";
export const SET_CATEGORY_TYPES = "SET_CATEGORY_TYPES";
export const SET_SELECTED_CATEGORY_TYPE = "SET_SELECTED_CATEGORY_TYPE";

export class FetchCategoryTypes implements Action {
  readonly type = FETCH_CATEGORY_TYPES;
}

export class SetCategoryTypes implements Action {
  readonly type = SET_CATEGORY_TYPES;
  constructor(public payload: CategoryType[]) {}
}

export class SetSelectedCategoryType implements Action {
  readonly type = SET_SELECTED_CATEGORY_TYPE;
  constructor(public payload: string[]) {}
}

export type CategoryTypeAction =
  | FetchCategoryTypes
  | SetCategoryTypes
  | SetSelectedCategoryType;
