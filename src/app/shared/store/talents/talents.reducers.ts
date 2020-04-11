import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  AudioPortfolioPreview,
  ImagePortfolioPreview,
  VideoPortfolioPreview,
  MediaType,
  TalentPortfolioPreview,
} from "src/app/interfaces";
import * as TalentsAction from "./talents.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./talents.adapter";
import { AppError } from "src/app/store/global/error/error.reducers";

export interface TalentPortfolioState
  extends EntityState<TalentPortfolioPreview> {
  talentPorfolioPreviewError: AppError | null;
}

const initialState: TalentPortfolioState = fromAdapter.adapter.getInitialState({
  talentPorfolioPreviewError: null,
});

export function reducer(
  state = initialState,
  action: TalentsAction.TalentsAction
): TalentPortfolioState {
  switch (action.type) {
    case TalentsAction.FETCH_TALENT_PORTFOLIO_ERROR:
      return Object.assign({
        ...state,
        talentPorfolioPreviewError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    default: {
      return state;
    }
  }
}

const getTalentPortfolioPreviewError = (state: TalentPortfolioState) =>
  state.talentPorfolioPreviewError;

export const getTalentPortfolioState = createFeatureSelector<
  TalentPortfolioState
>("talentPortfolioState");

export const selectTalentPortfolioPreviewError = createSelector(
  getTalentPortfolioState,
  getTalentPortfolioPreviewError
);
