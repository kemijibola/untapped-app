import { createSelector, Store } from "@ngrx/store";
import * as fromPortfolio from "./portfolio.reducers";
import * as fromUser from "../../user.reducers";

const media = (state: fromUser.UserState) => state.portfolio;
const userAudios = (state: fromUser.UserState) => state.portfolio;
const userVideos = (state: fromUser.UserState) => state.portfolio;
const userImages = (state: fromUser.UserState) => state.portfolio;
const userAudioPreviews = (state: fromUser.UserState) => state.portfolio;
const userVideoPreviews = (state: fromUser.UserState) => state.portfolio;
const userImagePreviews = (state: fromUser.UserState) => state.portfolio;
const mediaType = (state: fromUser.UserState) => state.portfolio;
const operationType = (state: fromUser.UserState) => state.portfolio;
const accept = (state: fromUser.UserState) => state.portfolio;

export const selectMedia = createSelector(
  media,
  (state: fromPortfolio.State) => state.media
);

export const selectUserAudioList = createSelector(
  userAudios,
  (state: fromPortfolio.State) => state.audios
);
export const selectUserVideoList = createSelector(
  userVideos,
  (state: fromPortfolio.State) => state.vidoes
);
export const selectUserImageList = createSelector(
  userImagePreviews,
  (state: fromPortfolio.State) => state.images
);
export const selectUserAudioPreviewList = createSelector(
  userAudioPreviews,
  (state: fromPortfolio.State) => state.audioPreviews
);
export const selectUserVideoPreviewList = createSelector(
  userVideoPreviews,
  (state: fromPortfolio.State) => state.videoPreviews
);
export const selectUserImagePreviewList = createSelector(
  userImages,
  (state: fromPortfolio.State) => state.imagePreviews
);
export const selectedMediaType = createSelector(
  mediaType,
  (state: fromPortfolio.State) => state.selectedMediaType
);
export const selectOperationType = createSelector(
  operationType,
  (state: fromPortfolio.State) => state.operationType
);
export const selectMediaAccept = createSelector(
  accept,
  (state: fromPortfolio.State) => state.accept
);
