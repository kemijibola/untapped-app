import { VideoPortfolioPreview } from "src/app/interfaces";
import { Action } from "@ngrx/store";

export const FETCH_TALENT_VIDEO_PORTFOLIO_PREVIEWS_SUCCESS =
  "FETCH_TALENT_VIDEO_PORTFOLIO_PREVIEWS_SUCCESS";
export const FETCH_TALENT_VIDEO_PORTFOLIO_PREVIEW =
  "FETCH_TALENT_VIDEO_PORTFOLIO_PREVIEW";
export const RESET_TALENT_VIDEO_PORTFOLIO_PREVIEW =
  "RESET_TALENT_VIDEO_PORTFOLIO_PREVIEW";

export class FetchTalentVideoPortfolioPreviewsSuccess implements Action {
  readonly type = FETCH_TALENT_VIDEO_PORTFOLIO_PREVIEWS_SUCCESS;
  constructor(public payload: { videoPreviews: VideoPortfolioPreview[] }) {}
}

export class FetchTalentVideoPortfolioPreview implements Action {
  readonly type = FETCH_TALENT_VIDEO_PORTFOLIO_PREVIEW;
  constructor(public payload: { id: string }) {}
}

export class ResetTalentVideoPortfolioPreview implements Action {
  readonly type = RESET_TALENT_VIDEO_PORTFOLIO_PREVIEW;
}

export type TalentVideoPreviewActions =
  | FetchTalentVideoPortfolioPreviewsSuccess
  | FetchTalentVideoPortfolioPreview
  | ResetTalentVideoPortfolioPreview;
