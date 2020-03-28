import * as CategoryActions from "./category.action";
import { ICategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<ICategory> {
  categories: ICategory[];
  selectedCategory: string;
}

export const categoryAdapter: EntityAdapter<ICategory> = createEntityAdapter<
  ICategory
>();

const initialState: State = categoryAdapter.getInitialState({
  categories: [],
  selectedCategory: ""
});

export function CategoryReducers(
  state = initialState,
  action: CategoryActions.CategoryActions
): State {
  switch (action.type) {
    case CategoryActions.SET_CATEGORIES:
      return categoryAdapter.setAll(action.payload, state);
    case CategoryActions.SET_SELECTED_CATEGORY:
      return categoryAdapter.setOne(
        state.categories[action.payload.selectedCategory],
        {
          ...state,
          selectedCategory: action.payload.selectedCategory
        }
      );
    default:
      return state;
  }
}
