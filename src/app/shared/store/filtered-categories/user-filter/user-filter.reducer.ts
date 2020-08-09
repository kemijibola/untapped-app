import { UserFilterCategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./user-filter.adapter";
import * as UserFilterActions from "./user-filter.action";
import { OutboundState } from "src/app/shared/Util";

export interface UserFilterState extends EntityState<UserFilterCategory> {
  searchText: string | null;
  selectedUserFilterId: string | number | null;
  fetchUsersStatus: OutboundState | null;
}

const initialState: UserFilterState = fromAdapter.adapter.getInitialState({
  searchText: null,
  selectedUserFilterId: null,
  fetchUsersStatus: OutboundState.initiated,
});

export function reducer(
  state = initialState,
  action: UserFilterActions.UserFilterActions
): UserFilterState {
  switch (action.type) {
    case UserFilterActions.FETCH_ALL_USERS:
      return Object.assign({
        ...state,
        fetchUsersStatus: OutboundState.inprogress,
      });
    case UserFilterActions.FETCH_ALL_USERS_SUCCESS:
      return Object.assign({
        ...state,
        fetchUsersStatus: OutboundState.completed,
      });
    case UserFilterActions.FETCH_ALL_USERS_NOOP:
      return Object.assign({
        ...state,
        fetchUsersStatus: OutboundState.completed,
      });
    case UserFilterActions.FETCH_ALL_USERS_ERROR:
      return Object.assign({
        ...state,
        fetchUsersStatus: OutboundState.failed,
      });
    case UserFilterActions.SET_ALL_USERS:
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
    case UserFilterActions.LIKE_TALENT_SUCCESS:
      return fromAdapter.adapter.upsertOne(action.payload.user, state);
    case UserFilterActions.UNLIKE_TALENT_SUCCESS:
      return fromAdapter.adapter.upsertOne(action.payload.user, state);
    case UserFilterActions.LIKE_TALENT_ERROR:
      const userToUpdate = action.payload.user;
      userToUpdate.tappedBy = userToUpdate.tappedBy.filter(
        (x) => x !== action.payload.likedBy
      );
      return fromAdapter.adapter.upsertOne(userToUpdate, state);
    case UserFilterActions.UNLIKE_TALENT_ERROR:
      const userToAdd = action.payload.user;
      userToAdd.tappedBy = [...userToAdd.tappedBy, action.payload.unLikedBy];
      return fromAdapter.adapter.upsertOne(userToAdd, state);
    default: {
      return state;
    }
  }
}

const getSearchText = (state: UserFilterState) => state.searchText;

const getUserId = (state: UserFilterState) => state.selectedUserFilterId;

const getUsersCompleted = (state: UserFilterState): boolean =>
  state.fetchUsersStatus === OutboundState.completed;

const getUsersInProgress = (state: UserFilterState): boolean =>
  state.fetchUsersStatus === OutboundState.inprogress;

const getUsersInitiated = (state: UserFilterState): boolean =>
  state.fetchUsersStatus === OutboundState.initiated;

const getUsersFailure = (state: UserFilterState): boolean =>
  state.fetchUsersStatus === OutboundState.failed;

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

export const selectUsersInProgressStatus = createSelector(
  userFilterState,
  getUsersInProgress
);

export const selectUsersCompletedStatus = createSelector(
  userFilterState,
  getUsersCompleted
);

export const selectUsersInitiatedStatus = createSelector(
  userFilterState,
  getUsersInitiated
);

export const selectUsersFailedStatus = createSelector(
  userFilterState,
  getUsersFailure
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
