import { EntityState } from "@ngrx/entity";
import * as fromAdapter from "./general-preview.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as GeneralPreviewActions from "./general-preview.action";
import { TalentPortfolioPreview } from "src/app/interfaces";

export interface GeneralPreviewState
  extends EntityState<TalentPortfolioPreview> {
  selectedGeneralPreviewId: string | number | null;
}

const initialState: GeneralPreviewState = fromAdapter.adapter.getInitialState({
  selectedGeneralPreviewId: null,
});

export function reducer(
  state = initialState,
  action: GeneralPreviewActions.GeneralPreviewActions
): GeneralPreviewState {
  switch (action.type) {
    case GeneralPreviewActions.FETCH_TALENT_GENERAL_PREVIEWS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.generalPreviews, state);
    case GeneralPreviewActions.FETCH_TALENT_GENERAL_PREVIEW:
      return Object.assign({
        ...state,
        selectedGeneralPreviewId: action.payload.id,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedGeneralPreviewId = (state: GeneralPreviewState) =>
  state.selectedGeneralPreviewId;

export const getGeneralPreviewState = createFeatureSelector<
  GeneralPreviewState
>("generalPreviewState");

export const selectGeneralPreviewIds = createSelector(
  getGeneralPreviewState,
  fromAdapter.selectGeneralPreviewIds
);

export const selectGeneralPreviewEntities = createSelector(
  getGeneralPreviewState,
  fromAdapter.selectGeneralPreviewEntities
);

export const selectGeneralPreviews = createSelector(
  getGeneralPreviewState,
  fromAdapter.selectAllGeneralPreview
);
export const generalPreviewCount = createSelector(
  getGeneralPreviewState,
  fromAdapter.generalPreviewCount
);

export const selectCurrentGeneralPreviewId = createSelector(
  getGeneralPreviewState,
  getSelectedGeneralPreviewId
);

export const selectCurrentGeneralPreview = createSelector(
  selectGeneralPreviewEntities,
  selectCurrentGeneralPreviewId,
  (generalEntities, generalId) => generalEntities[generalId]
);
