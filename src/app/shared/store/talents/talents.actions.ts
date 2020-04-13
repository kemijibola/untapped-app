import { Action } from "@ngrx/store";
import {
  TalentPortfolioPreview,
  MediaQueryParams,
} from "src/app/interfaces/user/portfolio";

export const FETCH_TALENT_PORTFOLIO = "FETCH_TALENT_PORTFOLIO";
export const FETCH_TALENT_PORTFOLIO_ERROR = "FETCH_TALENT_PORTFOLIO_ERROR";

export class FetchTalentPortfolio implements Action {
  readonly type = FETCH_TALENT_PORTFOLIO;
  constructor(public payload: MediaQueryParams) {}
}

export class FetchTalentPortfolioError implements Action {
  readonly type = FETCH_TALENT_PORTFOLIO_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export type TalentsAction = FetchTalentPortfolio | FetchTalentPortfolioError;
