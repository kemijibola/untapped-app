import { ContestWithEntriesPreview } from "./../../../interfaces/shared/dashboard";
import {
  Action,
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./dashboard.adpter";
import * as DashboardActions from "./dashboard.action";

export interface DashboadState extends EntityState<ContestWithEntriesPreview> {
  runningContestId: string | number | null;
}

const initialState: DashboadState = fromAdapter.adapter.getInitialState({
  runningContestId: null,
});

export function reducer(
  state = initialState,
  action: DashboardActions.DashboardActions
): DashboadState {
  switch (action.type) {
    case DashboardActions.FETCH_DASHBOARD_CONTESTS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.runningContests, state);
    case DashboardActions.FETCH_DASHBOARD_CONTEST:
      return Object.assign({
        ...state,
        runningContestId: action.payload.contestId,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedRunningContestId = (state: DashboadState) =>
  state.runningContestId;

export const getDashboardState = createFeatureSelector<DashboadState>(
  "dashboadState"
);

export const selectRunningContestIds = createSelector(
  getDashboardState,
  fromAdapter.selectRunningContestIds
);

export const selectRunningContestEntities = createSelector(
  getDashboardState,
  fromAdapter.selectRunningContestEntities
);

export const selectAllRunningContests = createSelector(
  getDashboardState,
  fromAdapter.selectAllRunningContests
);
export const runningContestCount = createSelector(
  getDashboardState,
  fromAdapter.runningContestCount
);

export const selectCurrentRunningContestId = createSelector(
  getDashboardState,
  getSelectedRunningContestId
);

export const selectCurrentRunningContest = createSelector(
  selectRunningContestEntities,
  selectCurrentRunningContestId,
  (runningContestEntities, runningContestId) =>
    runningContestEntities[runningContestId]
);
