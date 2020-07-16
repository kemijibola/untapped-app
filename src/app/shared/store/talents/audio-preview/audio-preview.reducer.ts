import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./audio-preview.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as TalentAudioPreviewActions from "./audio-preview.action";
import { AudioPortfolioPreview } from "src/app/interfaces";

export interface AudioPortfolioPreviewState
  extends EntityState<AudioPortfolioPreview> {
  selectedAudioPortfolioPreviewId: string | number | null;
}

const initialState: AudioPortfolioPreviewState = fromAdapter.adapter.getInitialState(
  {
    selectedAudioPortfolioPreviewId: null,
  }
);

export function reducer(
  state = initialState,
  action: TalentAudioPreviewActions.TalentAudioPreviewActions
): AudioPortfolioPreviewState {
  switch (action.type) {
    case TalentAudioPreviewActions.FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEWS_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.audioPreviews, state);
    case TalentAudioPreviewActions.FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEW:
      return Object.assign({
        ...state,
        selectedAudioPortfolioPreviewId: action.payload.id,
      });
    case TalentAudioPreviewActions.FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEW:
      return fromAdapter.adapter.setAll([], state);
    default: {
      return state;
    }
  }
}

export const getSelectedAudioPortfolioPreviewId = (
  state: AudioPortfolioPreviewState
) => state.selectedAudioPortfolioPreviewId;

export const getAudioPortfolioPreviewState = createFeatureSelector<
  AudioPortfolioPreviewState
>("audioPortfolioPreviewState");

export const selectAudioPortfolioPreviewIds = createSelector(
  getAudioPortfolioPreviewState,
  fromAdapter.selectAudioPortfolioPreviewIds
);

export const selectAudioPortfolioPreviewEntities = createSelector(
  getAudioPortfolioPreviewState,
  fromAdapter.selectAudioPortfolioPreviewEntities
);

export const selectAudioPortfolioPreviews = createSelector(
  getAudioPortfolioPreviewState,
  fromAdapter.selectAllAudioPortfolioPreview
);
export const audioPortfolioPreviewCount = createSelector(
  getAudioPortfolioPreviewState,
  fromAdapter.audioPortfolioPreviewCount
);

export const selectCurrentAudioPortfolioPreviewId = createSelector(
  getAudioPortfolioPreviewState,
  getSelectedAudioPortfolioPreviewId
);

export const selectCurrentAudioPortfolioPreview = createSelector(
  selectAudioPortfolioPreviewEntities,
  selectCurrentAudioPortfolioPreviewId,
  (audioPortfolioPreviewEntities, audioPortfolioPreviewId) =>
    audioPortfolioPreviewEntities[audioPortfolioPreviewId]
);
