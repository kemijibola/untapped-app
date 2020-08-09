import { ImagePortfolioPreview } from "src/app/interfaces";
import { Action } from "@ngrx/store";

export const FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEWS_SUCCESS =
  "FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEWS_SUCCESS";
export const FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEW =
  "FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEW";
export const RESET_TALENT_IMAGE_PORTFOLIO_PREVIEW =
  "RESET_TALENT_IMAGE_PORTFOLIO_PREVIEW";

export class FetchTalentImagePortfolioPreviewsSuccess implements Action {
  readonly type = FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEWS_SUCCESS;
  constructor(public payload: { imagePreviews: ImagePortfolioPreview[] }) {}
}

export class FetchTalentImagePortfolioPreview implements Action {
  readonly type = FETCH_TALENT_IMAGE_PORTFOLIO_PREVIEW;
  constructor(public payload: { id: string }) {}
}

export class ResetTalentImagePortfolioPreview implements Action {
  readonly type = RESET_TALENT_IMAGE_PORTFOLIO_PREVIEW;
}

export type TalentImagePreviewActions =
  | FetchTalentImagePortfolioPreviewsSuccess
  | FetchTalentImagePortfolioPreview
  | ResetTalentImagePortfolioPreview;
