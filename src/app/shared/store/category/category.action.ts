import { Action } from "@ngrx/store";
import { ICategory } from "src/app/interfaces";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_CATEGORY = "FETCH_CATEGORY";
export const FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";

export class FetchCategories implements Action {
  readonly type = FETCH_CATEGORIES;
}

export class FetchCategoriesSuccess implements Action {
  readonly type = FETCH_CATEGORIES_SUCCESS;
  constructor(public payload: { categories: ICategory[] }) {}
}

export class FetchCategoriesError implements Action {
  readonly type = FETCH_CATEGORIES_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class FetchCategory implements Action {
  readonly type = FETCH_CATEGORY;
  constructor(public payload: { categoryId: string }) {}
}

export type CategoryActions =
  | FetchCategories
  | FetchCategoriesSuccess
  | FetchCategory
  | FetchCategoriesError;
