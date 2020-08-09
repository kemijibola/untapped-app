import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./image-preview.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as TalentImagePreviewActions from "./image-preview.action";
import { ImagePortfolioPreview } from "src/app/interfaces";
import { transformImagePortfolioPreview } from "src/app/lib/Helper";

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
      const transformed = transformImagePortfolioPreview(
        action.payload.imagePreviews
      );
      return fromAdapter.adapter.setAll(transformed, state);
    case TalentImagePreviewActions.FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEW:
      return Object.assign({
        ...state,
        selectedImagePortfolioPreviewId: action.payload.id,
      });
    case TalentImagePreviewActions.RESET_TALENT_IMAGE_PORTFOLIO_PREVIEW:
      return fromAdapter.adapter.setAll([], state);
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
