import { Action } from "@ngrx/store";
import {
  TalentPortfolioPreview,
  MediaQueryParams,
} from "src/app/interfaces/user/portfolio";

export const FETCH_TALENT_PORTFOLIO = "FETCH_TALENT_PORTFOLIO";

export class FetchTalentPortfolio implements Action {
  readonly type = FETCH_TALENT_PORTFOLIO;
  constructor(public payload: MediaQueryParams) {}
}

export type TalentsAction = FetchTalentPortfolio;
