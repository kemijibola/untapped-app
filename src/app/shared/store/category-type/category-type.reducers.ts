import * as CategoryTypeAction from "./category-type.actions";
import { CategoryType } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<CategoryType> {
  categoryTypes: CategoryType[];
  selectedCategoryTypes: string[];
}

export const categoryTypeAdapter: EntityAdapter<CategoryType> = createEntityAdapter<
  CategoryType
>();

const initialState: State = categoryTypeAdapter.getInitialState({
  categoryTypes: [],
  selectedCategoryTypes: []
});

export function CategoryTypeReducers(
  state = initialState,
  action: CategoryTypeAction.CategoryTypeAction
): State {
  switch (action.type) {
    case CategoryTypeAction.SET_CATEGORY_TYPES:
      return categoryTypeAdapter.setAll(action.payload.categoryTypes, state);
    case CategoryTypeAction.SET_SELECTED_CATEGORY_TYPE:
      return categoryTypeAdapter.setAll(state.categoryTypes, {
        ...state,
        selectedCategoryTypes: action.payload
      });
    default:
      return state;
  }
}
