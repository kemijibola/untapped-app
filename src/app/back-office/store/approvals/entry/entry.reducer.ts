import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./entry.adapter";
import * as PendingEntryActions from "./entry.action";
import { IContestEntry } from "src/app/interfaces";
import { OutboundState } from "src/app/shared/Util";

export interface PendingEntryState extends EntityState<IContestEntry> {
  approveState: OutboundState;
  rejectState: OutboundState;
}

const initialState: PendingEntryState = fromAdapter.adapter.getInitialState({
  approveState: OutboundState.initiated,
  rejectState: OutboundState.initiated,
});

export function pendingEntryReducer(
  state = initialState,
  action: PendingEntryActions.PendingEntryAction
) {
  switch (action.type) {
    case PendingEntryActions.APPROVE_ENTRY:
      return Object.assign({
        ...state,
        approveState: OutboundState.inprogress,
      });
    case PendingEntryActions.REJECT_ENTRY:
      return Object.assign({
        ...state,
        rejectState: OutboundState.inprogress,
      });
    case PendingEntryActions.APPROVE_ENTRY_SUCCESS:
      return Object.assign({
        ...state,
        approveState: OutboundState.completed,
      });
    case PendingEntryActions.REJECT_ENTRY_SUCCESS:
      return Object.assign({
        ...state,
        rejectState: OutboundState.completed,
      });
    case PendingEntryActions.APPROVE_ENTRY_FAILED:
      return Object.assign({
        ...state,
        approveState: OutboundState.failed,
      });
    case PendingEntryActions.REJECT_ENTRY_FAILED:
      return Object.assign({
        ...state,
        rejectState: OutboundState.failed,
      });
    case PendingEntryActions.FETCH_PENDING_ENTRIES_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.pendingEntries, state);
    default: {
      return state;
    }
  }
}

export const getPendingEntryState = createFeatureSelector<PendingEntryState>(
  "pendingEntryState"
);

export const selectAllPendingEntryIds = createSelector(
  getPendingEntryState,
  fromAdapter.selectPendingEntryIds
);

export const selectAllPendingEntryEntities = createSelector(
  getPendingEntryState,
  fromAdapter.selectPendingEntryEntities
);

export const selectAllPendingEntry = createSelector(
  getPendingEntryState,
  fromAdapter.selectAllPendingEntry
);
export const allPendingEntryCount = createSelector(
  getPendingEntryState,
  fromAdapter.pendingEntryCount
);

const getApproveCompleted = (state: PendingEntryState): boolean =>
  state.approveState === OutboundState.completed;

const getApproveInProgress = (state: PendingEntryState): boolean =>
  state.approveState === OutboundState.inprogress;

const getApproveInitiated = (state: PendingEntryState): boolean =>
  state.approveState === OutboundState.initiated;

const getApproveFailedStatus = (state: PendingEntryState): boolean =>
  state.approveState === OutboundState.failed;

const getRejectCompleted = (state: PendingEntryState): boolean =>
  state.rejectState === OutboundState.completed;

const getRejectInProgress = (state: PendingEntryState): boolean =>
  state.rejectState === OutboundState.inprogress;

const getRejectInitiated = (state: PendingEntryState): boolean =>
  state.rejectState === OutboundState.initiated;

const getRejectFailedStatus = (state: PendingEntryState): boolean =>
  state.rejectState === OutboundState.failed;

export const selectApprovalCompletedStatus = createSelector(
  getPendingEntryState,
  getApproveCompleted
);

export const selectApprovalInitiatedStatus = createSelector(
  getPendingEntryState,
  getApproveInitiated
);

export const selectApprovalInProgressStatus = createSelector(
  getPendingEntryState,
  getApproveInProgress
);

export const selectApprovalFailedStatus = createSelector(
  getPendingEntryState,
  getApproveFailedStatus
);

export const selectRejectCompletedStatus = createSelector(
  getPendingEntryState,
  getRejectCompleted
);

export const selectRejectInitiatedStatus = createSelector(
  getPendingEntryState,
  getRejectInitiated
);

export const selectRejectInProgressStatus = createSelector(
  getPendingEntryState,
  getRejectInProgress
);

export const selectRejectFailedStatus = createSelector(
  getPendingEntryState,
  getRejectFailedStatus
);
