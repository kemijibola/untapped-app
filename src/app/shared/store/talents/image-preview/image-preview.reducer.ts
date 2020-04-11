import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./image-preview.adapter";
import { AppError } from "src/app/store/global/error/error.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as TalentImagePreviewActions from "./image-preview.action";
import { ImagePortfolioPreview } from "src/app/interfaces";

export interface ImagePortfolioPreviewState
  extends EntityState<ImagePortfolioPreview> {
  selectedImagePortfolioPreviewId: string | number | null;
}

const initialState: ImagePortfolioPreviewState = fromAdapter.adapter.getInitialState(
  {
    selectedImagePortfolioPreviewId: null,
  }
);

export function reducer(
  state = initialState,
  action: TalentImagePreviewActions.TalentImagePreviewActions
): ImagePortfolioPreviewState {
  switch (action.type) {
    case TalentImagePreviewActions.FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEWS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.imagePreviews, state);
    case TalentImagePreviewActions.FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEW:
      return Object.assign({
        ...state,
        selectedImagePortfolioPreviewId: action.payload.id,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedImagePortfolioPreviewId = (
  state: ImagePortfolioPreviewState
) => state.selectedImagePortfolioPreviewId;

export const getImagePortfolioPreviewState = createFeatureSelector<
  ImagePortfolioPreviewState
>("imagePortfolioPreviewState");

export const selectImagePortfolioPreviewIds = createSelector(
  getImagePortfolioPreviewState,
  fromAdapter.selectImagePortfolioPreviewIds
);

export const selectImagePortfolioPreviewEntities = createSelector(
  getImagePortfolioPreviewState,
  fromAdapter.selectImagePortfolioPreviewEntities
);

export const selectImagePortfolioPreviews = createSelector(
  getImagePortfolioPreviewState,
  fromAdapter.selectAllImagePortfolioPreview
);
export const audioPortfolioPreviewCount = createSelector(
  getImagePortfolioPreviewState,
  fromAdapter.imagePortfolioPreviewCount
);

export const selectCurrentImagePortfolioPreviewId = createSelector(
  getImagePortfolioPreviewState,
  getSelectedImagePortfolioPreviewId
);

export const selectCurrentAudioPortfolioPreview = createSelector(
  selectImagePortfolioPreviewEntities,
  selectCurrentImagePortfolioPreviewId,
  (imagePortfolioPreviewEntities, imagePortfolioPreviewId) =>
    imagePortfolioPreviewEntities[imagePortfolioPreviewId]
);
