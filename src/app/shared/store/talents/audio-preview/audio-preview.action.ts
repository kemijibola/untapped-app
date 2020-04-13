import { AudioPortfolioPreview } from "src/app/interfaces";
import { Action } from "@ngrx/store";

export const FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEWS_SUCCESS =
  "FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEWS_SUCCESS";
export const FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEW =
  "FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEW";

export class FetchTalentAudioPortfolioPreviewsSuccess implements Action {
  readonly type = FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEWS_SUCCESS;
  constructor(public payload: { audioPreviews: AudioPortfolioPreview[] }) {}
}

export class FetchTalentAudioPortfolioPreview implements Action {
  readonly type = FETCH_TALENT_AUDIO_PORTFOLIO_PREVIEW;
  constructor(public payload: { id: string }) {}
}

export type TalentAudioPreviewActions =
  | FetchTalentAudioPortfolioPreviewsSuccess
  | FetchTalentAudioPortfolioPreview;
