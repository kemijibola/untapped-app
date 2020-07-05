import { TalentPortfolioPreview } from "src/app/interfaces";
import { Action } from "@ngrx/store";

export const FETCH_TALENT_GENERAL_PREVIEWS_SUCCESS =
  "FETCH_TALENT_GENERAL_PREVIEWS_SUCCESS";
export const FETCH_TALENT_GENERAL_PREVIEW = "FETCH_TALENT_GENERAL_PREVIEW";

export class FetchTalentGeneralPreviewsSuccess implements Action {
  readonly type = FETCH_TALENT_GENERAL_PREVIEWS_SUCCESS;
  constructor(public payload: { generalPreviews: TalentPortfolioPreview[] }) {}
}

export class FetchTalentGeneralPreview implements Action {
  readonly type = FETCH_TALENT_GENERAL_PREVIEW;
  constructor(public payload: { id: string }) {}
}

export type GeneralPreviewActions =
  | FetchTalentGeneralPreviewsSuccess
  | FetchTalentGeneralPreview;
