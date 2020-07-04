import { Action } from "@ngrx/store";
import {
  TalentPortfolioPreview,
  MediaQueryParams,
} from "src/app/interfaces/user/portfolio";

export const FETCH_TALENT_PORTFOLIO = "FETCH_TALENT_PORTFOLIO";
export const FETCH_TALENT_GENERAL_MEDIA = "FETCH_TALENT_GENERAL_MEDIA";

export class FetchTalentPortfolio implements Action {
  readonly type = FETCH_TALENT_PORTFOLIO;
  constructor(public payload: MediaQueryParams) {}
}

export class FetchTalentGeneralMedia implements Action {
  readonly type = FETCH_TALENT_GENERAL_MEDIA;
  constructor(public payload: MediaQueryParams) {}
}
export type TalentsAction =
  | FetchTalentPortfolio
  | FetchTalentGeneralMedia;
