import { Action } from "@ngrx/store";
import { CategoryType } from "src/app/interfaces";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_SELECTED_CATEGORIES = "SET_SELECTED_CATEGORIES";

export class FetchCategories implements Action {
  readonly type = FETCH_CATEGORIES;
}

export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;
  constructor(public payload: CategoryType[]) {}
}

export class SetSelectedCategories implements Action {
  readonly type = SET_SELECTED_CATEGORIES;
  constructor(public payload: string[]) {}
}

export type CategoryTypeAction =
  | FetchCategories
  | SetCategories
  | SetSelectedCategories;
