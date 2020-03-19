import * as fromApp from "../../../store/app.reducers";
import { createSelector } from "@ngrx/store";
import * as fromUserCategory from "./user-category.reducers";

const talents = (state: fromApp.AppState) => state.userCategories;
const user = (state: fromApp.AppState) => state.userCategories;

export const selectAllTalents = createSelector(
  talents,
  (state: fromUserCategory.State) => state.talents
);

export const selectSelectedUser = createSelector(
  user,
  (state: fromUserCategory.State) => state.selectedUser
);
