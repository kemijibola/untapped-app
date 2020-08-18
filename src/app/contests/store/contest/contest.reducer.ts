import {
  IContestList,
  IContest,
  IUserContest,
  ContestData,
  ContestEligibilityData,
  ContestVoteResult,
} from "src/app/interfaces";
import * as ContestActions from "./contest.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./contest.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ContestState extends EntityState<ContestData> {
  selectedContestId: string | number | null;
  userEligibilityStatus: ContestEligibilityData | null;
  userEntryVoteCount: number | null;
}

const initialState: ContestState = fromAdapter.adapter.getInitialState({
  selectedContestId: null,
  userEligibilityStatus: null,
  userEntryVoteCount: null,
});

export function reducer(
  state = initialState,
  action: ContestActions.ContestActions
): ContestState {
  switch (action.type) {
    case ContestActions.SET_SELECTED_CONTEST:
      return fromAdapter.adapter.setOne(action.payload.selectedContest, state);
    case ContestActions.CHECK_USER_ELIGIBILITY:
      return Object.assign({
        ...state,
        selectedContestId: action.payload.contestId,
      });
    case ContestActions.CHECK_USER_ELIGIBILITY_SUCCESS:
      return Object.assign({
        ...state,
        userEligibilityStatus: action.payload.response,
      });
    case ContestActions.FETCH_CONTEST_BY_ID:
      return Object.assign({
        ...state,
        selectedContestId: action.payload.contestId,
      });
    case ContestActions.FETCH_CONTEST_BY_ID:
      return Object.assign({
        ...state,
        selectedContestId: action.payload.contestId,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedContestId = (state: ContestState) =>
  state.selectedContestId;

export const getContestState = createFeatureSelector<ContestState>(
  "contestState"
);

const getSelectedUserEligibility = (state: ContestState) =>
  state.userEligibilityStatus;

export const selectContestIds = createSelector(
  getContestState,
  fromAdapter.selectContestIds
);

export const selectContestEntities = createSelector(
  getContestState,
  fromAdapter.selectContestEntities
);

export const selectAllContests = createSelector(
  getContestState,
  fromAdapter.selectAllContests
);
export const contestPreviewCount = createSelector(
  getContestState,
  fromAdapter.contestCount
);

export const selectCurrentContestId = createSelector(
  getContestState,
  getSelectedContestId
);

export const selectCurrentUserEligibility = createSelector(
  getContestState,
  getSelectedUserEligibility
);

export const selectCurrentContest = createSelector(
  selectContestEntities,
  selectCurrentContestId,
  (contestEntities, contestId) => contestEntities[contestId]
);
