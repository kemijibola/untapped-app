import {
  IUserContest,
  IUserContestListAnalysis,
  AllContestViewModel,
  CompetitionParticipant,
  IVoteResult,
} from "src/app/interfaces";
import * as AllContestActions from "./all-contest.actions";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./all-contest.adapter";
import { OutboundState } from "src/app/shared/Util";

export interface AllContestState extends EntityState<AllContestViewModel> {
  selectedUserContestId: string | number | null;
  participantState: OutboundState;
  resultState: OutboundState;
  contestParticipants: CompetitionParticipant[] | null;
  contestVoteResult: IVoteResult[] | null;
}

const initialState: AllContestState = fromAdapter.adapter.getInitialState({
  selectedUserContestId: null,
  participantState: OutboundState.initiated,
  resultState: OutboundState.initiated,
  contestParticipants: null,
  contestVoteResult: null,
});

export function allContestReducer(
  state = initialState,
  action: AllContestActions.AllContestActions
) {
  switch (action.type) {
    case AllContestActions.FETCH_COMPETITION_PARTICIPANTS:
      return Object.assign({
        ...state,
        participantState: OutboundState.inprogress,
      });
    case AllContestActions.FETCH_COMPETITION_RESULT:
      return Object.assign({
        ...state,
        resultState: OutboundState.inprogress,
      });
    case AllContestActions.FETCH_COMPETITION_PARTICIPANTS_SUCCESS:
      return Object.assign({
        ...state,
        participantState: OutboundState.completed,
        contestParticipants: action.payload.participants,
      });
    case AllContestActions.FETCH_COMPETITION_RESULT_SUCCESS:
      return Object.assign({
        ...state,
        resultState: OutboundState.completed,
        contestVoteResult: action.payload.competitionResults,
      });
    case AllContestActions.FETCH_COMPETITION_RESULT_FAILED:
      return Object.assign({
        ...state,
        resultState: OutboundState.failed,
      });
    case AllContestActions.FETCH_COMPETITION_PARTICIPANTS_FAILED:
      return Object.assign({
        ...state,
        participantState: OutboundState.failed,
      });
    case AllContestActions.FETCH_USER_CONTEST_LIST_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.userContests, state);
    case AllContestActions.FETCH_USER_CONTEST_BY_ID:
      return Object.assign({
        ...state,
        selectedUserContestId: action.payload.contestId,
      });
    default: {
      return state;
    }
  }
}

const getDownloadCodeCompleted = (state: AllContestState): boolean =>
  state.participantState === OutboundState.completed;

const getDownloadCodeInProgress = (state: AllContestState): boolean =>
  state.participantState === OutboundState.inprogress;

const getDownloadCodeInitiated = (state: AllContestState): boolean =>
  state.participantState === OutboundState.initiated;

const getDownloadCodeFailedStatus = (state: AllContestState): boolean =>
  state.participantState === OutboundState.failed;

const getDownloadResultCompleted = (state: AllContestState): boolean =>
  state.resultState === OutboundState.completed;

const getDownloadResultInProgress = (state: AllContestState): boolean =>
  state.resultState === OutboundState.inprogress;

const getDownloadResultInitiated = (state: AllContestState): boolean =>
  state.resultState === OutboundState.initiated;

const getDownloadResultFailedStatus = (state: AllContestState): boolean =>
  state.resultState === OutboundState.failed;

export const getSelectedUserContestId = (state: AllContestState) =>
  state.selectedUserContestId;

export const getUserContestState = createFeatureSelector<AllContestState>(
  "allContestState"
);

const getContestParticipants = (state: AllContestState) =>
  state.contestParticipants;

const getContestResult = (state: AllContestState) => state.contestVoteResult;

export const selectAllUserContestIds = createSelector(
  getUserContestState,
  fromAdapter.selectAllContestIds
);

export const selectAllUserContestEntities = createSelector(
  getUserContestState,
  fromAdapter.selectAllContestEntities
);

export const selectAllUserContests = createSelector(
  getUserContestState,
  fromAdapter.selectAllUserContests
);
export const allUserContestCount = createSelector(
  getUserContestState,
  fromAdapter.allContestCount
);

export const selectCurrentUserContestId = createSelector(
  getUserContestState,
  getSelectedUserContestId
);

export const selectContestsCreatedByUser = createSelector(
  selectAllUserContestEntities,
  selectCurrentUserContestId,
  (userContestEntities, contestId) => userContestEntities[contestId]
);

export const selectDownloadCodeCompletedStatus = createSelector(
  getUserContestState,
  getDownloadCodeCompleted
);

export const selectDownloadCodeInitiatedStatus = createSelector(
  getUserContestState,
  getDownloadCodeInitiated
);

export const selectDownloadCodeInProgressStatus = createSelector(
  getUserContestState,
  getDownloadCodeInProgress
);

export const selectDownloadCodeFailedStatus = createSelector(
  getUserContestState,
  getDownloadCodeFailedStatus
);

export const selectContestParticipants = createSelector(
  getUserContestState,
  getContestParticipants
);

export const selectDownloadResultCompletedStatus = createSelector(
  getUserContestState,
  getDownloadResultCompleted
);

export const selectDownloadResultInitiatedStatus = createSelector(
  getUserContestState,
  getDownloadResultInitiated
);

export const selectDownloadResultInProgressStatus = createSelector(
  getUserContestState,
  getDownloadResultInProgress
);

export const selectDownloadResultFailedStatus = createSelector(
  getUserContestState,
  getDownloadResultFailedStatus
);

export const selectContestResult = createSelector(
  getUserContestState,
  getContestResult
);
