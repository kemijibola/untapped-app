import { TalentPortfolioPreview } from "src/app/interfaces";
import { Action } from "@ngrx/store";

export const FETCH_TALENT_GENERAL_PREVIEWS_SUCCESS =
  "FETCH_TALENT_GENERAL_PREVIEWS_SUCCESS";
export const FETCH_TALENT_GENERAL_PREVIEW = "FETCH_TALENT_GENERAL_PREVIEW";
export const RESET_TALENT_GENERAL_PREVIEW = "RESET_TALENT_GENERAL_PREVIEW";

export class FetchTalentGeneralPreviewsSuccess implements Action {
  readonly type = FETCH_TALENT_GENERAL_PREVIEWS_SUCCESS;
  constructor(public payload: { generalPreviews: TalentPortfolioPreview[] }) {}
}

export class FetchTalentGeneralPreview implements Action {
  readonly type = FETCH_TALENT_GENERAL_PREVIEW;
  constructor(public payload: { id: string }) {}
}

export class ResetTalentGeneralPreview implements Action {
  readonly type = RESET_TALENT_GENERAL_PREVIEW;
}

export type GeneralPreviewActions =
  | FetchTalentGeneralPreviewsSuccess
  | FetchTalentGeneralPreview
  | ResetTalentGeneralPreview;
