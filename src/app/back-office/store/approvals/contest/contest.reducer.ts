import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./contest.adapter";
import * as PendingContestActions from "./contest.action";
import { IContest } from "src/app/interfaces";
import { OutboundState } from "src/app/shared/Util";

export interface PendingContestState extends EntityState<IContest> {
  approveState: OutboundState;
  rejectState: OutboundState;
}

const initialState: PendingContestState = fromAdapter.adapter.getInitialState({
  approveState: OutboundState.initiated,
  rejectState: OutboundState.initiated,
});

export function pendingContestReducer(
  state = initialState,
  action: PendingContestActions.PendingContestAction
) {
  switch (action.type) {
    case PendingContestActions.APPROVE_CONTEST:
      return Object.assign({
        ...state,
        approveState: OutboundState.inprogress,
      });
    case PendingContestActions.REJECT_CONTEST:
      return Object.assign({
        ...state,
        rejectState: OutboundState.inprogress,
      });
    case PendingContestActions.APPROVE_CONTEST_SUCCESS:
      return Object.assign({
        ...state,
        approveState: OutboundState.completed,
      });
    case PendingContestActions.REJECT_CONTEST_SUCCESS:
      return Object.assign({
        ...state,
        rejectState: OutboundState.completed,
      });
    case PendingContestActions.APPROVE_CONTEST_FAILED:
      return Object.assign({
        ...state,
        approveState: OutboundState.failed,
      });
    case PendingContestActions.REJECT_CONTEST_FAILED:
      return Object.assign({
        ...state,
        rejectState: OutboundState.failed,
      });
    case PendingContestActions.FETCH_PENDING_CONTESTS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.pendingContests, state);
    default: {
      return state;
    }
  }
}

export const getPendingContestState = createFeatureSelector<
  PendingContestState
>("pendingContestState");

export const selectAllPendingContestIds = createSelector(
  getPendingContestState,
  fromAdapter.selectPendingContestIds
);

export const selectAllPendingContestEntities = createSelector(
  getPendingContestState,
  fromAdapter.selectPendingContestEntities
);

export const selectAllPendingContest = createSelector(
  getPendingContestState,
  fromAdapter.selectAllPendingContest
);
export const allPendingContestCount = createSelector(
  getPendingContestState,
  fromAdapter.pendingContestCount
);

const getApproveCompleted = (state: PendingContestState): boolean =>
  state.approveState === OutboundState.completed;

const getApproveInProgress = (state: PendingContestState): boolean =>
  state.approveState === OutboundState.inprogress;

const getApproveInitiated = (state: PendingContestState): boolean =>
  state.approveState === OutboundState.initiated;

const getApproveFailedStatus = (state: PendingContestState): boolean =>
  state.approveState === OutboundState.failed;

const getRejectCompleted = (state: PendingContestState): boolean =>
  state.rejectState === OutboundState.completed;

const getRejectInProgress = (state: PendingContestState): boolean =>
  state.rejectState === OutboundState.inprogress;

const getRejectInitiated = (state: PendingContestState): boolean =>
  state.rejectState === OutboundState.initiated;

const getRejectFailedStatus = (state: PendingContestState): boolean =>
  state.rejectState === OutboundState.failed;

export const selectApprovalCompletedStatus = createSelector(
  getPendingContestState,
  getApproveCompleted
);

export const selectApprovalInitiatedStatus = createSelector(
  getPendingContestState,
  getApproveInitiated
);

export const selectApprovalInProgressStatus = createSelector(
  getPendingContestState,
  getApproveInProgress
);

export const selectApprovalFailedStatus = createSelector(
  getPendingContestState,
  getApproveFailedStatus
);

export const selectRejectCompletedStatus = createSelector(
  getPendingContestState,
  getRejectCompleted
);

export const selectRejectInitiatedStatus = createSelector(
  getPendingContestState,
  getRejectInitiated
);

export const selectRejectInProgressStatus = createSelector(
  getPendingContestState,
  getRejectInProgress
);

export const selectRejectFailedStatus = createSelector(
  getPendingContestState,
  getRejectFailedStatus
);
