import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./profile.adapter";
import * as PendingUserActions from "./profile.action";
import { TalentProfile } from "src/app/interfaces";
import { OutboundState } from "src/app/shared/Util";

export interface PendingUserState extends EntityState<TalentProfile> {
  approveState: OutboundState;
}

const initialState: PendingUserState = fromAdapter.adapter.getInitialState({
  approveState: OutboundState.initiated,
});

export function pendingUserReducer(
  state = initialState,
  action: PendingUserActions.PendingUserAction
) {
  switch (action.type) {
    case PendingUserActions.APPROVE_USER:
      return Object.assign({
        ...state,
        approveState: OutboundState.inprogress,
      });
    case PendingUserActions.APPROVE_USER_SUCCESS:
      return Object.assign({
        ...state,
        approveState: OutboundState.completed,
      });
    case PendingUserActions.APPROVE_USER_FAILED:
      return Object.assign({
        ...state,
        approveState: OutboundState.failed,
      });

    case PendingUserActions.FETCH_PENDING_USERS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.pendingApprovals, state);
    default: {
      return state;
    }
  }
}

export const getPendingUserState = createFeatureSelector<PendingUserState>(
  "pendingUserState"
);

export const selectAllPendingUserIds = createSelector(
  getPendingUserState,
  fromAdapter.selectPendingUsersIds
);

export const selectAllPendingUserEntities = createSelector(
  getPendingUserState,
  fromAdapter.selectPendingUserEntities
);

export const selectAllPendingUser = createSelector(
  getPendingUserState,
  fromAdapter.selectAllPendingUser
);
export const allPendingUserCount = createSelector(
  getPendingUserState,
  fromAdapter.pendingUserCount
);

const getUserApproveCompleted = (state: PendingUserState): boolean =>
  state.approveState === OutboundState.completed;

const getUserApproveInProgress = (state: PendingUserState): boolean =>
  state.approveState === OutboundState.inprogress;

const getUserApproveInitiated = (state: PendingUserState): boolean =>
  state.approveState === OutboundState.initiated;

const getUserApproveFailedStatus = (state: PendingUserState): boolean =>
  state.approveState === OutboundState.failed;

export const selectUserApprovalCompletedStatus = createSelector(
  getPendingUserState,
  getUserApproveCompleted
);

export const selectUserApprovalInitiatedStatus = createSelector(
  getPendingUserState,
  getUserApproveInitiated
);

export const selectUserApprovalInProgressStatus = createSelector(
  getPendingUserState,
  getUserApproveInProgress
);

export const selectUserApprovalFailedStatus = createSelector(
  getPendingUserState,
  getUserApproveFailedStatus
);
