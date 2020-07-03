import { UserFilterCategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./user-filter.adapter";
import * as UserFilterActions from "./user-filter.action";

export interface UserFilterState extends EntityState<UserFilterCategory> {
  searchText: string | null;
  selectedUserFilterId: string | number | null;
}

const initialState: UserFilterState = fromAdapter.adapter.getInitialState({
  searchText: null,
  selectedUserFilterId: null,
});

export function reducer(
  state = initialState,
  action: UserFilterActions.UserFilterActions
): UserFilterState {
  switch (action.type) {
    case UserFilterActions.FETCH_ALL_USERS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.users, state);
    case UserFilterActions.SET_FILTER_TEXT:
      return Object.assign({
        ...state,
        searchText: action.payload.searchText,
      });
    case UserFilterActions.FETCH_USER:
      return Object.assign({
        ...state,
        selectedUserFilterId: action.payload.id,
      });
    default: {
      return state;
    }
  }
}

const getSearchText = (state: UserFilterState) => state.searchText;

const getUserId = (state: UserFilterState) => state.selectedUserFilterId;

export const userFilterState = createFeatureSelector<UserFilterState>(
  "userFilterState"
);

export const selectSearchText = createSelector(userFilterState, getSearchText);

export const selectUserIds = createSelector(
  userFilterState,
  fromAdapter.selectUserIds
);

export const selectUserEntities = createSelector(
  userFilterState,
  fromAdapter.selectUserEntities
);

export const selectAllUsers = createSelector(
  userFilterState,
  fromAdapter.selectAllUsers
);
export const selectUserCount = createSelector(
  userFilterState,
  fromAdapter.userCount
);

export const selectCurrentUserId = createSelector(userFilterState, getUserId);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (users, filterId) => users[filterId]
);
