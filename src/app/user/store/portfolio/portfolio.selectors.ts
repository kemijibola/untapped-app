import { createSelector, Store } from '@ngrx/store';
import * as fromPortfolio from './portfolio.reducers';

const userAudios = (state: fromPortfolio.PortfolioFeatureState) =>
  state.portfolios;
const userVideos = (state: fromPortfolio.PortfolioFeatureState) =>
  state.portfolios;
const userImages = (state: fromPortfolio.PortfolioFeatureState) =>
  state.portfolios;
const mediaType = (state: fromPortfolio.PortfolioFeatureState) =>
  state.portfolios;

export const selectUserAudioList = createSelector(
  userAudios,
  (state: fromPortfolio.State) => state.audios
);
export const selectUserVideoList = createSelector(
  userVideos,
  (state: fromPortfolio.State) => state.vidoes
);
export const selectUserImageList = createSelector(
  userImages,
  (state: fromPortfolio.State) => state.images
);
export const selectedMediaType = createSelector(
  mediaType,
  (state: fromPortfolio.State) => state.selectedMediaType
);
