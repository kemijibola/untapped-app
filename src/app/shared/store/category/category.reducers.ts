import * as CategoryActions from "./category.action";
import { ICategory } from "src/app/interfaces";

export interface State {
  categories: ICategory[];
  selectedCategory: string;
}

const initialState: State = {
  categories: [],
  selectedCategory: ""
};

export function CategoryReducers(
  state = initialState,
  action: CategoryActions.CategoryActions
) {
  switch (action.type) {
    case CategoryActions.SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload]
      };
    case CategoryActions.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };
    default:
      return state;
  }
}
