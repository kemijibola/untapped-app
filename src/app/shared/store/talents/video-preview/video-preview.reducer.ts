import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./video-preview.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as TalentVideoPreviewActions from "./video-preview.action";
import { VideoPortfolioPreview } from "src/app/interfaces";
import { transformVideoPortfolioPreview } from "src/app/lib/Helper";

export interface VideoPortfolioPreviewState
  extends EntityState<VideoPortfolioPreview> {
  selectedVideoPortfolioPreviewId: string | number | null;
}

const initialState: VideoPortfolioPreviewState = fromAdapter.adapter.getInitialState(
  {
    selectedVideoPortfolioPreviewId: null,
  }
);

export function reducer(
  state = initialState,
  action: TalentVideoPreviewActions.TalentVideoPreviewActions
): VideoPortfolioPreviewState {
  switch (action.type) {
    case TalentVideoPreviewActions.FETCH_TALENT_VIDEO_PORTFOLIO_PREVIEWS_SUCCESS:
      const transformed = transformVideoPortfolioPreview(
        action.payload.videoPreviews
      );
      return fromAdapter.adapter.setAll(transformed, state);
    case TalentVideoPreviewActions.FETCH_TALENT_VIDEO_PORTFOLIO_PREVIEW:
      return Object.assign({
        ...state,
        selectedAudioPortfolioPreviewId: action.payload.id,
      });
    case TalentVideoPreviewActions.RESET_TALENT_VIDEO_PORTFOLIO_PREVIEW:
      return fromAdapter.adapter.setAll([], state);
    default: {
      return state;
    }
  }
}

export const getSelectedVideoPortfolioPreviewId = (
  state: VideoPortfolioPreviewState
) => state.selectedVideoPortfolioPreviewId;

export const getVideoPortfolioPreviewState = createFeatureSelector<
  VideoPortfolioPreviewState
>("videoPortfolioPreviewState");

export const selectVideoPortfolioPreviewIds = createSelector(
  getVideoPortfolioPreviewState,
  fromAdapter.selectVideoPortfolioPreviewIds
);

export const selectVideoPortfolioPreviewEntities = createSelector(
  getVideoPortfolioPreviewState,
  fromAdapter.selectVideoPortfolioPreviewEntities
);

export const selectVideoPortfolioPreviews = createSelector(
  getVideoPortfolioPreviewState,
  fromAdapter.selectAllVideoPortfolioPreview
);
export const videoPortfolioPreviewCount = createSelector(
  getVideoPortfolioPreviewState,
  fromAdapter.videoPortfolioPreviewCount
);

export const selectCurrentVideoPortfolioPreviewId = createSelector(
  getVideoPortfolioPreviewState,
  getSelectedVideoPortfolioPreviewId
);

export const selectCurrentAudioPortfolioPreview = createSelector(
  selectVideoPortfolioPreviewEntities,
  selectCurrentVideoPortfolioPreviewId,
  (videoPortfolioPreviewEntities, videoPortfolioPreviewId) =>
    videoPortfolioPreviewEntities[videoPortfolioPreviewId]
);
