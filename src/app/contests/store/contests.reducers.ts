import { IContestList, IContest, IUserContest } from "src/app/interfaces";
import * as ContestsActions from "./contests.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./contests.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ContestsState extends EntityState<IContestList> {
  selectedContestsPreviewId: string | number | null;
}

const initialState: ContestsState = fromAdapter.adapter.getInitialState({
  selectedContestsPreviewId: null,
});

export function reducer(
  state = initialState,
  action: ContestsActions.ContestsAction
): ContestsState {
  switch (action.type) {
    case ContestsActions.FETCH_CONTESTS_PREVIEW_SUCCESS:
      return fromAdapter.adapter.addMany(action.payload.runningContests, state);
    case ContestsActions.FETCH_CONTEST_PREVIEW:
      return Object.assign({
        ...state,
        selectedContestPreviewId: action.payload.contestPreviewId,
      });
    case ContestsActions.RESET_CONTESTS_PREVIEW_TO_DEFAULT:
      return fromAdapter.adapter.removeAll({
        ...state,
        selectedContestsPreviewId: null,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedContestPreviewId = (state: ContestsState) =>
  state.selectedContestsPreviewId;

export const getContestPreviewState = createFeatureSelector<ContestsState>(
  "contestsState"
);

export const selectContestsPreviewIds = createSelector(
  getContestPreviewState,
  fromAdapter.selectContestPreviewIds
);

export const selectContestsPreviewEntities = createSelector(
  getContestPreviewState,
  fromAdapter.selectContestPreviewEntities
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

export const selectCurrentContestPreview = createSelector(
  selectContestsPreviewEntities,
  selectCurrentContestsPreviewId,
  (contestsPreviewEntities, contestsPreviewId) =>
    contestsPreviewEntities[contestsPreviewId]
);
