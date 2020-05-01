import { IContestEntry } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./contest-entry.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as ContestEntryActions from "./contest-entry.action";

export interface ContestEntryState extends EntityState<IContestEntry> {
  selectedContestEntryId: string | number | null;
}

const initialState: ContestEntryState = fromAdapter.adapter.getInitialState({
  selectedContestEntryId: null,
});

export function reducer(
  state = initialState,
  action: ContestEntryActions.ContestEntryActions
): ContestEntryState {
  switch (action.type) {
    case ContestEntryActions.ENTER_CONTEST_SUCCESS:
      return fromAdapter.adapter.setOne(action.payload.contestEntry, state);
    case ContestEntryActions.FETCH_CONTEST_ENTRIES_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.entries, state);
    case ContestEntryActions.FETCH_CONTEST_ENTRY:
      return Object.assign({
        ...state,
        selectedContestEntryId: action.payload.contestEntryId,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedContestEntryId = (state: ContestEntryState) =>
  state.selectedContestEntryId;

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

export const selectContestEntryEntities = createSelector(
  getContestEntryState,
  fromAdapter.selectContestEntryEntities
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
