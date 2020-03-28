import { createSelector } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromCategory from "./category.reducers";

const categories = (state: fromApp.AppState) => state.categories;
const selectedCategory = (state: fromApp.AppState) => state.categories;

export const selectCategories = createSelector(
  categories,
  (state: fromCategory.State) => state.categories
);

export const selectSelectedCategory = createSelector(
  selectedCategory,
  (state: fromCategory.State) => state.selectedCategory
);
