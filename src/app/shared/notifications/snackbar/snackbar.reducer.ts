import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./snackbar.adapter";
import * as SnackBarActions from "./snackbar.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SnackBarData } from "src/app/interfaces";

export interface SnackBarState extends EntityState<SnackBarData> {
  show: boolean | null;
}

const initialState: SnackBarState = fromAdapter.adapter.getInitialState({
  show: null
});

export function reducer(
  state = initialState,
  action: SnackBarActions.SnackBarActions
): SnackBarState {
  switch (action.type) {
    case SnackBarActions.SNACKBAR_CLOSE:
      return Object.assign({
        ...state,
        show: false
      });
    case SnackBarActions.SNACKBAR_OPEN:
      return Object.assign({
        ...state,
        show: true
      });
    default: {
      return state;
    }
  }
}

export const getSnackBarViewMode = (state: SnackBarState) => state.show;

export const getSnackBarState = createFeatureSelector<SnackBarState>(
  "snackBarState"
);

export const selectSnackbarEntities = createSelector(
  getSnackBarState,
  fromAdapter.selectSnackBarEntities
);
export const selectAllSnackbars = createSelector(
  getSnackBarState,
  fromAdapter.selectAllSnackBars
);
export const snackBarCount = createSelector(
  getSnackBarState,
  fromAdapter.snackbarCount
);

export const selectSnackBarViewState = createSelector(
  getSnackBarState,
  getSnackBarViewMode
);
