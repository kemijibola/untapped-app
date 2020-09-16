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
  smsContestState: OutboundState;
  agreementStatus: boolean;
}
const initialState: NewContestState = fromAdapter.adapter.getInitialState({
  contest: null,
  bannerImageKey: null,
  newContestState: OutboundState.initiated,
  smsContestState: OutboundState.initiated,
  agreementStatus: false,
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
        contest: action.payload.newContest,
      });
    case NewContestActions.CREATE_SMS_VOTE:
      return Object.assign({
        ...state,
        smsContestState: OutboundState.inprogress,
      });
    case NewContestActions.CREATE_SMS_VOTE_SUCCESS:
      return Object.assign({
        ...state,
        smsContestState: OutboundState.completed,
        contest: action.payload.smsContest,
      });
    case NewContestActions.CREATE_SMS_VOTE_FAILED:
      return Object.assign({
        ...state,
        smsContestState: OutboundState.failed,
      });
    case NewContestActions.UPDATE_CONTEST:
      return Object.assign({
        ...state,
        newContestState: OutboundState.inprogress,
        contest: action.payload.newContest,
      });
    case NewContestActions.SET_CONTEST_AGREEMENT:
      return Object.assign({
        ...state,
        agreementStatus: action.payload.status,
      });
    case NewContestActions.CREATE_CONTEST_ERROR:
      return Object.assign({
        ...state,
        newContestState: OutboundState.failed,
      });
    case NewContestActions.UPDATE_CONTEST_ERROR:
      return Object.assign({
        ...state,
        newContestState: OutboundState.failed,
      });
    case NewContestActions.SET_CONTEST_IN_EDIT_MODE:
      return Object.assign({
        ...state,
        contest: action.payload.editContest,
      });
    case NewContestActions.SET_CONTEST:
      return Object.assign({
        ...state,
        contest: action.payload.contest,
        newContestState: OutboundState.completed,
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

const getAgreementStatus = (state: NewContestState): boolean =>
  state.agreementStatus ? true : false;

const getSaveInProgress = (state: NewContestState): boolean =>
  state.newContestState === OutboundState.inprogress;

const getSaveInitiated = (state: NewContestState): boolean =>
  state.newContestState === OutboundState.initiated;

const getFailedStatus = (state: NewContestState): boolean =>
  state.newContestState === OutboundState.failed;

const getSmsSaveCompleted = (state: NewContestState): boolean =>
  state.smsContestState === OutboundState.completed;

const getSmsSaveInProgress = (state: NewContestState): boolean =>
  state.smsContestState === OutboundState.inprogress;

const getSmsSaveInitiated = (state: NewContestState): boolean =>
  state.smsContestState === OutboundState.initiated;

const getSmsFailedStatus = (state: NewContestState): boolean =>
  state.smsContestState === OutboundState.failed;

export const selectNewContestCompletedStatus = createSelector(
  getNewUserContestState,
  getSaveCompleted
);

export const selectNewContestInitiatedStatus = createSelector(
  getNewUserContestState,
  getSaveInitiated
);

export const selectAgreementStatus = createSelector(
  getNewUserContestState,
  getAgreementStatus
);

export const selectNewContestInProgressStatus = createSelector(
  getNewUserContestState,
  getSaveInProgress
);

export const selectNewContestFailedStatus = createSelector(
  getNewUserContestState,
  getFailedStatus
);

export const selectSmsContestCompletedStatus = createSelector(
  getNewUserContestState,
  getSmsSaveCompleted
);

export const selectSmsContestInitiatedStatus = createSelector(
  getNewUserContestState,
  getSmsSaveInitiated
);

export const selectSmsContestInProgressStatus = createSelector(
  getNewUserContestState,
  getSmsSaveInProgress
);

export const selectSmsContestFailedStatus = createSelector(
  getNewUserContestState,
  getSmsFailedStatus
);
