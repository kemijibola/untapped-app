import * as CategoryTypeAction from "./category-type.actions";
import { CategoryType } from "src/app/interfaces";

export interface State {
  categories: CategoryType[];
  selectedCategories: string[];
}

const initialState: State = {
  categories: [],
  selectedCategories: []
};

export function CategoryTypeReducers(
  state = initialState,
  action: CategoryTypeAction.CategoryTypeAction
) {
  switch (action.type) {
    case CategoryTypeAction.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case CategoryTypeAction.SET_SELECTED_CATEGORIES:
      return {
        ...state,
        selectedCategories: [...action.payload]
      };
    default:
      return state;
  }
}
