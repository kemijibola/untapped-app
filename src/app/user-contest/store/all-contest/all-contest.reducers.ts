import { IUserContest, IUserContestListAnalysis } from "src/app/interfaces";
import * as AllContestActions from "./all-contest.actions";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./all-contest.adapter";

export interface AllContestState extends EntityState<IUserContestListAnalysis> {
  selectedUserContestId: string | number | null;
}
const initialState: AllContestState = fromAdapter.adapter.getInitialState({
  selectedUserContestId: null,
});

export function allContestReducer(
  state = initialState,
  action: AllContestActions.AllContestActions
) {
  switch (action.type) {
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

export const getSelectedUserContestId = (state: AllContestState) =>
  state.selectedUserContestId;

export const getUserContestState = createFeatureSelector<AllContestState>(
  "allContestState"
);

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
