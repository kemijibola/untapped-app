import * as CategoryActions from "./category.action";
import { ICategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { AppError } from "src/app/store/global/error/error.reducers";
import * as fromAdapter from "./category.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CategoryState extends EntityState<ICategory> {
  categories: ICategory[] | null;
  selectedCategoryId: string | null;
  categoryError: AppError | null;
}

const initialState: CategoryState = fromAdapter.adapter.getInitialState({
  categories: null,
  selectedCategoryId: "",
  categoryError: null,
});

export function reducer(
  state = initialState,
  action: CategoryActions.CategoryActions
): CategoryState {
  switch (action.type) {
    case CategoryActions.FETCH_CATEGORIES_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.categories, state);
    case CategoryActions.FETCH_CATEGORY:
      return Object.assign({
        ...state,
        selectedCategoryId: action.payload.categoryId,
      });
    case CategoryActions.FETCH_CATEGORIES_ERROR:
      return Object.assign({
        ...state,
        categoryError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    default: {
      return state;
    }
  }
}

export const getSelectedCategoryId = (state: CategoryState) =>
  state.selectedCategoryId;

const getCategoryError = (state: CategoryState) => state.categoryError;

export const getCategoryState = createFeatureSelector<CategoryState>(
  "categoryState"
);

export const selectCategoryIds = createSelector(
  getCategoryState,
  fromAdapter.selectCategoryIds
);

export const selectCategoryEntities = createSelector(
  getCategoryState,
  fromAdapter.selectCategoryEntities
);

export const selectCategories = createSelector(
  getCategoryState,
  fromAdapter.selectAllCategories
);
export const categoryCount = createSelector(
  getCategoryState,
  fromAdapter.categoryCount
);

export const selectCurrentCategoryId = createSelector(
  getCategoryState,
  getSelectedCategoryId
);

export const selectUserTypeError = createSelector(
  getCategoryState,
  getCategoryError
);
export const selectCurrentCategory = createSelector(
  selectCategoryEntities,
  selectCurrentCategoryId,
  (categoryEntities, categoryId) => categoryEntities[categoryId]
);
