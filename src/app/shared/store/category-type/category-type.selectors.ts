import { createSelector } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromCategoryType from "./category-type.reducers";

const categoryTypes = (state: fromApp.AppState) => state.categories;
const selectedCategories = (state: fromApp.AppState) => state.categories;

export const selectCategoryTypes = createSelector(
  categoryTypes,
  (state: fromCategoryType.State) => state.categories
);

export const selectSelectedCategoryTypes = createSelector(
  selectedCategories,
  (state: fromCategoryType.State) => state.selectedCategories
);
