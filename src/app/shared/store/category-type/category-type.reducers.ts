import * as CategoryTypeAction from "./category-type.actions";
import { CategoryType } from "src/app/interfaces";

export interface State {
  categoryTypes: CategoryType[];
  selectedCategoryTypes: string[];
}

const initialState: State = {
  categoryTypes: [],
  selectedCategoryTypes: []
};

export function CategoryTypeReducers(
  state = initialState,
  action: CategoryTypeAction.CategoryTypeAction
) {
  switch (action.type) {
    case CategoryTypeAction.SET_CATEGORY_TYPES:
      return {
        ...state,
        categoryTypes: [...action.payload]
      };
    case CategoryTypeAction.SET_SELECTED_CATEGORY_TYPE:
      return {
        ...state,
        selectedCategoryTypes: [...action.payload]
      };
    default:
      return state;
  }
}
