import * as CategoryActions from "./category.action";
import { ICategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./category.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CategoryState extends EntityState<ICategory> {
  categories: ICategory[] | null;
  selectedCategoryId: string | null;
}

const initialState: CategoryState = fromAdapter.adapter.getInitialState({
  categories: null,
  selectedCategoryId: "",
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
    default: {
      return state;
    }
  }
}

export const getSelectedCategoryId = (state: CategoryState) =>
  state.selectedCategoryId;

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

export const selectCurrentCategory = createSelector(
  selectCategoryEntities,
  selectCurrentCategoryId,
  (categoryEntities, categoryId) => categoryEntities[categoryId]
);
