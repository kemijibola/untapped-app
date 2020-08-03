import { IContest, IUserContest } from "src/app/interfaces";
import * as NewContestActions from "./new-contest.actions";
import { EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./new-contest.adapter";
import { OutboundState } from "src/app/shared/Util";

export interface NewContestState extends EntityState<IContest> {
  contest: IContest | null;
  bannerImageKey: string | null;
  newContestState: OutboundState;
}
const initialState: NewContestState = fromAdapter.adapter.getInitialState({
  contest: null,
  bannerImageKey: null,
  newContestState: OutboundState.initiated,
});

export function newContestReducer(
  state = initialState,
  action: NewContestActions.NewContestActions
) {
  switch (action.type) {
    case NewContestActions.CREATE_CONTEST:
      return Object.assign({
        ...state,
        newContestState: OutboundState.inprogress,
        contest: { ...action.payload.newContest },
      });
    case NewContestActions.CREATE_CONTEST_SUCCESS:
      return Object.assign({
        ...state,
        newContestState: OutboundState.completed,
      });
    case NewContestActions.CREATE_CONTEST_ERROR:
      return Object.assign({
        ...state,
        newContestState: OutboundState.failed,
      });
    case NewContestActions.SET_CONTEST_IN_EDIT_MODE:
      return Object.assign({
        ...state,
        contest: { ...action.payload.editContest },
      });
    case NewContestActions.SET_CONTEST:
      return Object.assign({
        ...state,
        contest: { ...action.payload.contest },
      });
    case NewContestActions.SET_CONTEST_BANNER:
      return Object.assign({
        ...state,
        bannerImageKey: action.payload.bannerKey,
      });
    default: {
      return state;
    }
  }
}

const getSelectContest = (state: NewContestState) => state.contest;

const getSelectbannerImageKey = (state: NewContestState) =>
  state.bannerImageKey;

export const getNewUserContestState = createFeatureSelector<NewContestState>(
  "newUserContestState"
);

export const selectCurrentContest = createSelector(
  getNewUserContestState,
  getSelectContest
);

export const selectCurrentBannerKey = createSelector(
  getNewUserContestState,
  getSelectbannerImageKey
);

const getSaveCompleted = (state: NewContestState): boolean =>
  state.newContestState === OutboundState.completed;

const getSaveInProgress = (state: NewContestState): boolean =>
  state.newContestState === OutboundState.inprogress;

const getSaveInitiated = (state: NewContestState): boolean =>
  state.newContestState === OutboundState.initiated;

const getFailedStatus = (state: NewContestState): boolean =>
  state.newContestState === OutboundState.failed;

export const selectNewContestCompletedStatus = createSelector(
  getNewUserContestState,
  getSaveCompleted
);

export const selectNewContestInitiatedStatus = createSelector(
  getNewUserContestState,
  getSaveInitiated
);

export const selectNewContestInProgressStatus = createSelector(
  getNewUserContestState,
  getSaveInProgress
);

export const selectNewContestFailedStatus = createSelector(
  getNewUserContestState,
  getFailedStatus
);
