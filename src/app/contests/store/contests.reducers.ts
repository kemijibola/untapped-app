import {
  IContestList,
  IContest,
  IUserContest,
  ContestData,
  ContestEligibilityData,
  ContestVoteResult,
} from "src/app/interfaces";
import * as ContestsActions from "./contests.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./contests.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OutboundState } from "src/app/shared/Util";

export interface ContestsState extends EntityState<IContestList> {
  selectedContestsPreviewId: string | number | null;
  selectedContest: ContestData | null;
  userEligibilityStatus: ContestEligibilityData | null;
  contestVoteResult: ContestVoteResult | null;
  fetchContestStatus: OutboundState | null;
}

const initialState: ContestsState = fromAdapter.adapter.getInitialState({
  selectedContestsPreviewId: null,
  selectedContest: null,
  userEligibilityStatus: null,
  contestVoteResult: null,
  fetchContestStatus: OutboundState.initiated,
});

export function reducer(
  state = initialState,
  action: ContestsActions.ContestsAction
): ContestsState {
  switch (action.type) {
    case ContestsActions.FETCH_CONTESTS_PREVIEW:
      return Object.assign({
        ...state,
        fetchContestStatus: OutboundState.inprogress,
      });
    case ContestsActions.ADD_CONTEST_LIKE:
      const contestObj = { ...action.payload.contest };
      contestObj.contest.likedBy = [
        ...contestObj.contest.likedBy,
        action.payload.likedBy,
      ];
      return Object.assign({
        ...state,
        selectedContest: contestObj,
      });
    case ContestsActions.ADD_CONTEST_LIKE_ERROR:
      const contestToRemoveLike = { ...action.payload.contest };
      contestToRemoveLike.contest.likedBy = contestToRemoveLike.contest.likedBy.filter(
        (x) => x !== action.payload.likedBy
      );
      return Object.assign({
        ...state,
        selectedContest: contestToRemoveLike,
      });
    case ContestsActions.REMOVE_CONTEST_LIKE:
      const contestToRemoveLikeObj = { ...action.payload.contest };
      contestToRemoveLikeObj.contest.likedBy = contestToRemoveLikeObj.contest.likedBy.filter(
        (x) => x !== action.payload.unLikedBy
      );
      return Object.assign({
        ...state,
        selectedContest: contestToRemoveLikeObj,
      });
    case ContestsActions.FETCH_CONTESTS_PREVIEW_SUCCESS:
      return Object.assign({
        ...state,
        fetchContestStatus: OutboundState.completed,
      });
    case ContestsActions.REMOVE_CONTEST_LIKE_ERROR:
      const contestToUnLike = { ...action.payload.contest };
      contestToUnLike.contest.likedBy = contestToUnLike.contest.likedBy.filter(
        (x) => x !== action.payload.likedBy
      );
      return Object.assign({
        ...state,
        selectedContest: contestToUnLike,
      });
    case ContestsActions.SET_CONTESTS_PREVIEW:
      return fromAdapter.adapter.setAll(action.payload.runningContests, state);
    case ContestsActions.FETCH_CONTEST_PREVIEW:
      return Object.assign({
        ...state,
        selectedContestPreviewId: action.payload.contestPreviewId,
      });
    case ContestsActions.FETCH_CONTESTS_PREVIEW_ERROR:
      return Object.assign({
        ...state,
        fetchContestStatus: OutboundState.failed,
      });
    case ContestsActions.FETCH_CONTEST_BY_ID_SUCCESS:
      return Object.assign({
        ...state,
        selectedContest: action.payload.contest,
      });
    case ContestsActions.SET_CONTEST_VOTE_RESULT:
      return Object.assign({
        ...state,
        contestVoteResult: action.payload.voteResult,
      });
    case ContestsActions.RESET_CONTESTS_PREVIEW_TO_DEFAULT:
      return fromAdapter.adapter.removeAll({
        ...state,
        selectedContestsPreviewId: null,
      });
    case ContestsActions.CHECK_USER_ELIGIBILITY_SUCCESS:
      return Object.assign({
        ...state,
        userEligibilityStatus: action.payload.response,
      });
    case ContestsActions.RESET_CONTEST_DATA:
      return Object.assign({
        ...state,
        selectedContest: null,
      });
    case ContestsActions.RESET_USER_ELIGIBILITY_STATUS:
      return Object.assign({
        ...state,
        userEligibilityStatus: null,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedContestPreviewId = (state: ContestsState) =>
  state.selectedContestsPreviewId;

const getSelectedCurrentContestDetails = (state: ContestsState) =>
  state.selectedContest;

const getContestsCompleted = (state: ContestsState): boolean =>
  state.fetchContestStatus === OutboundState.completed;

const getContestsInProgress = (state: ContestsState): boolean =>
  state.fetchContestStatus === OutboundState.inprogress;

const getContestsInitiated = (state: ContestsState): boolean =>
  state.fetchContestStatus === OutboundState.initiated;

const getContestsFailure = (state: ContestsState): boolean =>
  state.fetchContestStatus === OutboundState.failed;

export const getContestPreviewState = createFeatureSelector<ContestsState>(
  "contestsState"
);

const getSelectedUserEligibility = (state: ContestsState) =>
  state.userEligibilityStatus;

const getContestVoteResut = (state: ContestsState) => state.contestVoteResult;

export const selectContestsPreviewIds = createSelector(
  getContestPreviewState,
  fromAdapter.selectContestPreviewIds
);

export const selectContestVoteResult = createSelector(
  getContestPreviewState,
  getContestVoteResut
);

export const selectContestsPreviewEntities = createSelector(
  getContestPreviewState,
  fromAdapter.selectContestPreviewEntities
);

export const selectContestsInProgressStatus = createSelector(
  getContestPreviewState,
  getContestsInProgress
);

export const selectContestsCompletedStatus = createSelector(
  getContestPreviewState,
  getContestsCompleted
);

export const selectContestsInitiatedStatus = createSelector(
  getContestPreviewState,
  getContestsInitiated
);

export const selectContestsFailedStatus = createSelector(
  getContestPreviewState,
  getContestsFailure
);

export const selectAllContestsPreviews = createSelector(
  getContestPreviewState,
  fromAdapter.selectAllContestPreviews
);
export const contestsPreviewCount = createSelector(
  getContestPreviewState,
  fromAdapter.contestPreviewCount
);

export const selectCurrentContestsPreviewId = createSelector(
  getContestPreviewState,
  getSelectedContestPreviewId
);

export const selectCurrentUserEligibility = createSelector(
  getContestPreviewState,
  getSelectedUserEligibility
);

export const selectCurrentContestDetails = createSelector(
  getContestPreviewState,
  getSelectedCurrentContestDetails
);

export const selectCurrentContestPreview = createSelector(
  selectContestsPreviewEntities,
  selectCurrentContestsPreviewId,
  (contestsPreviewEntities, contestsPreviewId) =>
    contestsPreviewEntities[contestsPreviewId]
);
