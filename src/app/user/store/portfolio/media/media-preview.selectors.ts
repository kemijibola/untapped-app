import { createSelector, Store } from "@ngrx/store";
import * as fromMediaPreview from "./../media/media-preview.reducers";
import * as fromUser from "../../../user.reducers";

const userAudioPreviews = (state: fromUser.UserState) => state.mediaPreview;
const userVideoPreviews = (state: fromUser.UserState) => state.mediaPreview;
const userImagePreviews = (state: fromUser.UserState) => state.mediaPreview;

export const selectUserImagePreviewList = createSelector(
  userImagePreviews,
  (state: fromMediaPreview.State) => state.imagePreviews
);
export const selectUserAudioPreviewList = createSelector(
  userAudioPreviews,
  (state: fromMediaPreview.State) => state.audioPreviews
);
export const selectUserVideoPreviewList = createSelector(
  userVideoPreviews,
  (state: fromMediaPreview.State) => state.videoPreviews
);
