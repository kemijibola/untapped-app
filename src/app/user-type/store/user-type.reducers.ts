import {
  Action,
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IUserType } from "../../interfaces";
import * as UserTypeActions from "./user-type.actions";
import * as fromAdapter from "./user-type.adapter";
import { OutboundState } from "src/app/shared/Util";

export interface UserTypeState extends EntityState<IUserType> {
  selectedUserTypeId: string | number | null;
  fetchUserTypeStatus: OutboundState | null;
}

const initialState: UserTypeState = fromAdapter.adapter.getInitialState({
  selectedUserTypeId: null,
  fetchUserTypeStatus: OutboundState.initiated,
});

export function reducer(
  state = initialState,
  action: UserTypeActions.UserTypeActions
): UserTypeState {
  switch (action.type) {
    case UserTypeActions.FETCH_USER_TYPES:
      return Object.assign({
        ...state,
        fetchUserTypeStatus: OutboundState.inprogress,
      });
    case UserTypeActions.SET_USER_TYPES:
      return fromAdapter.adapter.setAll(action.payload.userTypes, state);
    case UserTypeActions.FETCH_USER_TYPES_SUCCESS:
      return Object.assign({
        ...state,
        fetchUserTypeStatus: OutboundState.completed,
      });
    case UserTypeActions.FETCH_USER_TYPES_ERROR:
      return Object.assign({
        ...state,
        fetchUserTypeStatus: OutboundState.failed,
      });
    case UserTypeActions.FETCH_USER_TYPE:
      return Object.assign({
        ...state,
        selectedUserTypeId: action.payload.userTypeId,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedUserTypeId = (state: UserTypeState) =>
  state.selectedUserTypeId;

export const getUserTypeState = createFeatureSelector<UserTypeState>(
  "userTypeState"
);

const getUserTypesCompleted = (state: UserTypeState): boolean =>
  state.fetchUserTypeStatus === OutboundState.completed;

const getUserTypesInProgress = (state: UserTypeState): boolean =>
  state.fetchUserTypeStatus === OutboundState.inprogress;

const getUserTypesInitiated = (state: UserTypeState): boolean =>
  state.fetchUserTypeStatus === OutboundState.initiated;

const getUserTypesFailure = (state: UserTypeState): boolean =>
  state.fetchUserTypeStatus === OutboundState.failed;

export const selectUserTypeIds = createSelector(
  getUserTypeState,
  fromAdapter.selectUserTypeIds
);

export const selectUserTypeEntities = createSelector(
  getUserTypeState,
  fromAdapter.selectUserTypeEntities
);

export const selectFetchUserTypesInProgressStatus = createSelector(
  getUserTypeState,
  getUserTypesInProgress
);

export const selectFetchUserTypesCompletedStatus = createSelector(
  getUserTypeState,
  getUserTypesCompleted
);

export const selectFetchUserTypesInitiatedStatus = createSelector(
  getUserTypeState,
  getUserTypesInitiated
);

export const selectUserTypesFailedStatus = createSelector(
  getUserTypeState,
  getUserTypesFailure
);

export const selectAllUserTypes = createSelector(
  getUserTypeState,
  fromAdapter.selectAllUserTypes
);
export const userTypeCount = createSelector(
  getUserTypeState,
  fromAdapter.userTypeCount
);

export const selectCurrentUserTypeId = createSelector(
  getUserTypeState,
  getSelectedUserTypeId
);

export const selectCurrentUserType = createSelector(
  selectUserTypeEntities,
  selectCurrentUserTypeId,
  (userTypeEntities, userTypeId) => userTypeEntities[userTypeId]
);
