import { createSelector, Store } from "@ngrx/store";
import * as fromTalents from "./talents.reducers";
import * as fromApp from "../../../store/app.reducers";

const audioPortfolioPreviews = (state: fromApp.AppState) => state.talents;
const imagePortfolioPreviews = (state: fromApp.AppState) => state.talents;
const videoPortfolioPreviews = (state: fromApp.AppState) => state.talents;

export const selectTalentAudioPortfolio = createSelector(
  audioPortfolioPreviews,
  (state: fromTalents.State) => state.audioPortfolioPreview
);

export const selectTalentImagePortfolio = createSelector(
  imagePortfolioPreviews,
  (state: fromTalents.State) => state.imagePortfolioPreview
);

export const selectTalentVideoPortfolio = createSelector(
  videoPortfolioPreviews,
  (state: fromTalents.State) => state.videoPortfolioPreview
);
