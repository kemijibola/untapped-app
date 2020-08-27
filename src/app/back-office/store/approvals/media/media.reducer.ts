import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./media.adapter";
import * as PendingMediaActions from "./media.action";
import { IMedia } from "src/app/interfaces";
import { OutboundState } from "src/app/shared/Util";

export interface PendingMediaState extends EntityState<IMedia> {
  selectedPendingMediaId: string | null;
  approveState: OutboundState;
  rejectState: OutboundState;
}

const initialState: PendingMediaState = fromAdapter.adapter.getInitialState({
  selectedPendingMediaId: null,
  approveState: OutboundState.initiated,
  rejectState: OutboundState.initiated,
});

export function pendingMediaReducer(
  state = initialState,
  action: PendingMediaActions.PendingMediaAction
) {
  switch (action.type) {
    case PendingMediaActions.APPROVE_MEDIA:
      return Object.assign({
        ...state,
        approveState: OutboundState.inprogress,
      });
    case PendingMediaActions.REJECT_MEDIA:
      return Object.assign({
        ...state,
        rejectState: OutboundState.inprogress,
      });
    case PendingMediaActions.APPROVE_MEDIA_SUCCESS:
      return Object.assign({
        ...state,
        approveState: OutboundState.completed,
      });
    case PendingMediaActions.REJECT_MEDIA_SUCCESS:
      return Object.assign({
        ...state,
        rejectState: OutboundState.completed,
      });
    case PendingMediaActions.APPROVE_MEDIA_FAILED:
      return Object.assign({
        ...state,
        approveState: OutboundState.failed,
      });
    case PendingMediaActions.REJECT_MEDIA_FAILED:
      return Object.assign({
        ...state,
        rejectState: OutboundState.failed,
      });
    case PendingMediaActions.FETCH_PENDING_APPROVALS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.pendingApprovals, state);
    case PendingMediaActions.FETCH_PENDING_APPROVAL:
      return Object.assign({
        ...state,
        selectedPendingMediaId: action.payload.pendingMediaId,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedPendingMediaId = (state: PendingMediaState) =>
  state.selectedPendingMediaId;

export const getPendingMediaState = createFeatureSelector<PendingMediaState>(
  "pendingMediaState"
);

export const selectAllPendingMediaIds = createSelector(
  getPendingMediaState,
  fromAdapter.selectPendingMediaIds
);

export const selectAllPendingMediaEntities = createSelector(
  getPendingMediaState,
  fromAdapter.selectPendingMediaEntities
);

export const selectAllPendingMedia = createSelector(
  getPendingMediaState,
  fromAdapter.selectAllPendingMedia
);
export const allPendingMediaCount = createSelector(
  getPendingMediaState,
  fromAdapter.pendingMediaCount
);

export const selectCurrentPendingMediaId = createSelector(
  getPendingMediaState,
  getSelectedPendingMediaId
);

export const selectPendingMedia = createSelector(
  selectAllPendingMediaEntities,
  selectCurrentPendingMediaId,
  (pendingMediaEntities, pendingMediaId) => pendingMediaEntities[pendingMediaId]
);

const getApproveCompleted = (state: PendingMediaState): boolean =>
  state.approveState === OutboundState.completed;

const getApproveInProgress = (state: PendingMediaState): boolean =>
  state.approveState === OutboundState.inprogress;

const getApproveInitiated = (state: PendingMediaState): boolean =>
  state.approveState === OutboundState.initiated;

const getApproveFailedStatus = (state: PendingMediaState): boolean =>
  state.approveState === OutboundState.failed;

const getRejectCompleted = (state: PendingMediaState): boolean =>
  state.rejectState === OutboundState.completed;

const getRejectInProgress = (state: PendingMediaState): boolean =>
  state.rejectState === OutboundState.inprogress;

const getRejectInitiated = (state: PendingMediaState): boolean =>
  state.rejectState === OutboundState.initiated;

const getRejectFailedStatus = (state: PendingMediaState): boolean =>
  state.rejectState === OutboundState.failed;

export const selectApprovalCompletedStatus = createSelector(
  getPendingMediaState,
  getApproveCompleted
);

export const selectApprovalInitiatedStatus = createSelector(
  getPendingMediaState,
  getApproveInitiated
);

export const selectApprovalInProgressStatus = createSelector(
  getPendingMediaState,
  getApproveInProgress
);

export const selectApprovalFailedStatus = createSelector(
  getPendingMediaState,
  getApproveFailedStatus
);

export const selectRejectCompletedStatus = createSelector(
  getPendingMediaState,
  getRejectCompleted
);

export const selectRejectInitiatedStatus = createSelector(
  getPendingMediaState,
  getRejectInitiated
);

export const selectRejectInProgressStatus = createSelector(
  getPendingMediaState,
  getRejectInProgress
);

export const selectRejectFailedStatus = createSelector(
  getPendingMediaState,
  getRejectFailedStatus
);
