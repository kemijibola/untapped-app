import { createSelector, Store } from "@ngrx/store";
import * as fromPortfolio from "./portfolio.reducers";
import * as fromUser from "../../user.reducers";

const media = (state: fromUser.UserState) => state.portfolio;
const userAudios = (state: fromUser.UserState) => state.portfolio;
const userVideos = (state: fromUser.UserState) => state.portfolio;
const userImages = (state: fromUser.UserState) => state.portfolio;
const mediaType = (state: fromUser.UserState) => state.portfolio;
const operationType = (state: fromUser.UserState) => state.portfolio;
const accept = (state: fromUser.UserState) => state.portfolio;
const imageDeleteSucess = (state: fromUser.UserState) => state.portfolio;
const audioDeleteSucess = (state: fromUser.UserState) => state.portfolio;
const videoDeleteSucess = (state: fromUser.UserState) => state.portfolio;
const mediaItemDeleteSucess = (state: fromUser.UserState) => state.portfolio;

export const selectImageDeleteSuccess = createSelector(
  imageDeleteSucess,
  (state: fromPortfolio.State) => state.imageDeleted
);

export const selectMediaItemDeleteSuccess = createSelector(
  mediaItemDeleteSucess,
  (state: fromPortfolio.State) => state.mediaItemDeleted
);

export const selectAudioDeleteSuccess = createSelector(
  audioDeleteSucess,
  (state: fromPortfolio.State) => state.audioDeleted
);

export const selectVideoDeleteSuccess = createSelector(
  videoDeleteSucess,
  (state: fromPortfolio.State) => state.videoDeleted
);
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
  userImages,
  (state: fromPortfolio.State) => state.images
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
