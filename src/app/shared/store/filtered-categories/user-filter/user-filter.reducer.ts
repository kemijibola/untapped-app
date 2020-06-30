import { UserFilterCategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./user-filter.adapter";
import * as UserFilterActions from "./user-filter.action";

export interface UserFilterState extends EntityState<string> {
  searchText: string | null;
}

const initialState: UserFilterState = fromAdapter.adapter.getInitialState({
  searchText: null,
});

export function reducer(
  state = initialState,
  action: UserFilterActions.UserFilterActions
): UserFilterState {
  switch (action.type) {
    case UserFilterActions.SET_FILTER_TEXT:
      return Object.assign({
        ...state,
        searchText: action.payload.searchText,
      });
    default: {
      return state;
    }
  }
}

const getSearchText = (state: UserFilterState) => state.searchText;

export const userFilterState = createFeatureSelector<UserFilterState>(
  "userFilterState"
);

export const selectSearchText = createSelector(userFilterState, getSearchText);
