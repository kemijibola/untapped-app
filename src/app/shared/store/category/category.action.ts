import { Action } from "@ngrx/store";
import { ICategory } from "src/app/interfaces";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";

export class FetchCategories implements Action {
  readonly type = FETCH_CATEGORIES;
}

export class SetCategories implements Action {
  readonly type = SET_CATEGORIES;
  constructor(public payload: ICategory[]) {}
}

export class SetSelectedCategory implements Action {
  readonly type = SET_SELECTED_CATEGORY;
  constructor(public payload: { selectedCategory: string }) {}
}

export type CategoryActions =
  | FetchCategories
  | SetCategories
  | SetSelectedCategory;
