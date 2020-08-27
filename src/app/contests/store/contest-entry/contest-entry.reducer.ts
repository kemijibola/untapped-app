import { IContestEntry, IUserContestListAnalysis } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./contest-entry.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as ContestEntryActions from "./contest-entry.action";
import { OutboundState } from "src/app/shared/Util";

export interface ContestEntryState extends EntityState<IContestEntry> {
  selectedContestEntryId: string | number | null;
  contestsParticipatedIn: IUserContestListAnalysis[] | null;
  contestEntryStatus: OutboundState | null;
  enterContestState: OutboundState | null;
}

const initialState: ContestEntryState = fromAdapter.adapter.getInitialState({
  selectedContestEntryId: null,
  contestsParticipatedIn: null,
  contestEntryStatus: OutboundState.initiated,
  enterContestState: OutboundState.initiated,
});

export function reducer(
  state = initialState,
  action: ContestEntryActions.ContestEntryActions
): ContestEntryState {
  switch (action.type) {
    case ContestEntryActions.FETCH_CONTEST_ENTRIES:
      return Object.assign({
        ...state,
        contestEntryStatus: OutboundState.inprogress,
      });
    case ContestEntryActions.ENTER_CONTEST:
      return Object.assign({
        ...state,
        enterContestState: OutboundState.inprogress,
      });
    case ContestEntryActions.ENTER_CONTEST_SUCCESS:
      return Object.assign({
        ...state,
        enterContestState: OutboundState.completed,
      });
    case ContestEntryActions.ENTER_CONTEST_FAILED:
      return Object.assign({
        ...state,
        enterContestState: OutboundState.failed,
      });
    case ContestEntryActions.SET_CONTEST_ENTRY:
      return fromAdapter.adapter.setOne(action.payload.contestEntry, state);
    case ContestEntryActions.FETCH_CONTEST_ENTRIES_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.entries, state);
    case ContestEntryActions.FETCH_CONTEST_ENTRY:
      return Object.assign({
        ...state,
        selectedContestEntryId: action.payload.contestEntryId,
      });
    case ContestEntryActions.SET_USER_PARTICIPATED_CONTEST:
      return Object.assign({
        ...state,
        contestsParticipatedIn: action.payload.participatedInContests,
      });
    case ContestEntryActions.FETCH_USER_PARTICIPATED_CONTEST_SUCCESS:
      return Object.assign({
        ...state,
        contestEntryStatus: OutboundState.completed,
      });
    case ContestEntryActions.FETCH_USER_PARTICIPATED_CONTEST_ERROR:
      return Object.assign({
        ...state,
        contestEntryStatus: OutboundState.failed,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedContestEntryId = (state: ContestEntryState) =>
  state.selectedContestEntryId;

const getContestEntryCompleted = (state: ContestEntryState): boolean =>
  state.contestEntryStatus === OutboundState.completed;

const getContestEntryInProgress = (state: ContestEntryState): boolean =>
  state.contestEntryStatus === OutboundState.inprogress;

const getContestEntryInitiated = (state: ContestEntryState): boolean =>
  state.contestEntryStatus === OutboundState.initiated;

const getContestEntryFailure = (state: ContestEntryState): boolean =>
  state.contestEntryStatus === OutboundState.failed;

const getEntryCompleted = (state: ContestEntryState): boolean =>
  state.enterContestState === OutboundState.completed;

const getEntryInProgress = (state: ContestEntryState): boolean =>
  state.enterContestState === OutboundState.inprogress;

const getEntryInitiated = (state: ContestEntryState): boolean =>
  state.enterContestState === OutboundState.initiated;

const getEntryFailure = (state: ContestEntryState): boolean =>
  state.enterContestState === OutboundState.failed;

const getContestsUserParticipatedIn = (state: ContestEntryState) =>
  state.contestsParticipatedIn;
export const getContestEntryState = createFeatureSelector<ContestEntryState>(
  "contestEntryState"
);

export const selectCurrentContestEntryId = createSelector(
  getContestEntryState,
  getSelectedContestEntryId
);

export const selectContestEntryIds = createSelector(
  getContestEntryState,
  fromAdapter.selectContestEntryIds
);

export const selectContestsUserParticipatedIn = createSelector(
  getContestEntryState,
  getContestsUserParticipatedIn
);

export const selectContestEntryEntities = createSelector(
  getContestEntryState,
  fromAdapter.selectContestEntryEntities
);

export const selectContestEntryInProgressStatus = createSelector(
  getContestEntryState,
  getContestEntryInProgress
);

export const selectContestEntryCompletedStatus = createSelector(
  getContestEntryState,
  getContestEntryCompleted
);

export const selectContestEntrytrInitiatedStatus = createSelector(
  getContestEntryState,
  getContestEntryInitiated
);

export const selectContestEntryFailedStatus = createSelector(
  getContestEntryState,
  getContestEntryFailure
);

export const selectEntryInProgressStatus = createSelector(
  getContestEntryState,
  getEntryInProgress
);

export const selectEntryCompletedStatus = createSelector(
  getContestEntryState,
  getEntryCompleted
);

export const selectEntrytrInitiatedStatus = createSelector(
  getContestEntryState,
  getEntryInitiated
);

export const selectEntryFailedStatus = createSelector(
  getContestEntryState,
  getEntryFailure
);

export const selectAllContestEntries = createSelector(
  getContestEntryState,
  fromAdapter.selectAllContestEntries
);
export const contestEntryCount = createSelector(
  getContestEntryState,
  fromAdapter.contestEntryCount
);

export const selectCurrentContestPreview = createSelector(
  selectContestEntryEntities,
  selectCurrentContestEntryId,
  (contestEntryEntities, contestEntryId) => contestEntryEntities[contestEntryId]
);
