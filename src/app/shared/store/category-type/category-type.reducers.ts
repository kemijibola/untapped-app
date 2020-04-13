import * as CategoryTypeAction from "./category-type.actions";
import { CategoryType } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./category-type.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CategoryTypeState extends EntityState<CategoryType> {
  selectedCategoryTypes: string[];
  selectedCategoryTypeId: string | number | null;
}

const initialState: CategoryTypeState = fromAdapter.adapter.getInitialState({
  selectedCategoryTypes: [],
  selectedCategoryTypeId: null,
});

export function reducer(
  state = initialState,
  action: CategoryTypeAction.CategoryTypeAction
): CategoryTypeState {
  switch (action.type) {
    case CategoryTypeAction.SET_CATEGORY_TYPES:
      return fromAdapter.adapter.setAll(action.payload, state);
    case CategoryTypeAction.SET_SELECTED_CATEGORY_TYPE:
      return Object.assign({
        ...state,
        selectedCategoryTypes: action.payload.selectedCategoryType,
      });
    case CategoryTypeAction.FETCH_CATEGORY_TYPE:
      return Object.assign({
        ...state,
        selectedCategoryTypeId: action.payload.categoryTypeId,
      });
    default:
      return state;
  }
}

const getSelectedCategoryTypeId = (state: CategoryTypeState) =>
  state.selectedCategoryTypeId;

const getSelectedCategoryTypes = (state: CategoryTypeState) =>
  state.selectedCategoryTypes;

export const getCategoryTypeState = createFeatureSelector<CategoryTypeState>(
  "categoryTypeState"
);

export const selectCategoryTypeIds = createSelector(
  getCategoryTypeState,
  fromAdapter.selectCategoryTypeIds
);

export const selectCategoryTypeEntities = createSelector(
  getCategoryTypeState,
  fromAdapter.selectCategoryTypeEntities
);

export const selectAllCategoryTypes = createSelector(
  getCategoryTypeState,
  fromAdapter.selectAllCategoryTypes
);
export const categoryTypeCount = createSelector(
  getCategoryTypeState,
  fromAdapter.CategoryTypeCount
);

export const selectCurrentCategoryTypeId = createSelector(
  getCategoryTypeState,
  getSelectedCategoryTypeId
);

export const selectSelectedCategoryTypes = createSelector(
  getCategoryTypeState,
  getSelectedCategoryTypes
);
export const selectCurrentCategoryType = createSelector(
  selectCategoryTypeEntities,
  selectCurrentCategoryTypeId,
  (categoryTypeEntities, categoryTypeId) => categoryTypeEntities[categoryTypeId]
);
