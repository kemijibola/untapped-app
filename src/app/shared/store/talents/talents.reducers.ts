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

export interface TalentPortfolioState
  extends EntityState<TalentPortfolioPreview> {}

const initialState: TalentPortfolioState = fromAdapter.adapter.getInitialState(
  {}
);

export function reducer(
  state = initialState,
  action: TalentsAction.TalentsAction
): TalentPortfolioState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getTalentPortfolioState = createFeatureSelector<
  TalentPortfolioState
>("talentPortfolioState");
