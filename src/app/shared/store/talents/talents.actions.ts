import { Action } from "@ngrx/store";
import {
  TalentPortfolioPreview,
  MediaQueryParams
} from "src/app/interfaces/user/portfolio";

export const FETCH_TALENT_PORTFOLIO = "FETCH_TALENT_PORTFOLIO";
export const SET_TALENT_PORTFOLIO = "SET_TALENT_PORTFOLIO";
export const SET_SELECTED_TALENT_PORTFOLIO = "SET_SELECTED_TALENT_PORTFOLIO";

export class FetchTalentPortfolio implements Action {
  readonly type = FETCH_TALENT_PORTFOLIO;
  constructor(public payload: MediaQueryParams) {}
}

export class SetTalentPortfolio implements Action {
  readonly type = SET_TALENT_PORTFOLIO;
  constructor(public payload: TalentPortfolioPreview[]) {}
}

export class SetSelectedTalentPortfolio implements Action {
  readonly type = SET_SELECTED_TALENT_PORTFOLIO;
  constructor(public payload: TalentPortfolioPreview) {}
}

export type TalentsAction =
  | FetchTalentPortfolio
  | SetTalentPortfolio
  | SetSelectedTalentPortfolio;
