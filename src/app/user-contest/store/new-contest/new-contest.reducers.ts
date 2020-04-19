import { IContest, IUserContest } from "src/app/interfaces";
import * as NewContestActions from "./new-contest.actions";
import { EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./new-contest.adapter";

export interface NewContestState extends EntityState<IContest> {
  contest: IContest | null;
  bannerImageKey: string | null;
}
const initialState: NewContestState = fromAdapter.adapter.getInitialState({
  contest: null,
  bannerImageKey: null,
});

export function newContestReducer(
  state = initialState,
  action: NewContestActions.NewContestActions
) {
  switch (action.type) {
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
      console.log(action.payload.bannerKey);
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
