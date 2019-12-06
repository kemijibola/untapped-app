import { createSelector } from "@ngrx/store";
import * as fromUpload from "./upload.reducers";
import * as fromApp from "../../../store/app.reducers";

const upload = (state: fromApp.AppState) => state.upload;
const fileInput = (state: fromApp.AppState) => state.upload;
const currentUploadAction = (state: fromApp.AppState) => state.upload;
const fileToUpload = (state: fromApp.AppState) => state.upload;
const presignedUrls = (state: fromApp.AppState) => state.upload;
const uploadSuccess = (state: fromApp.AppState) => state.upload;

export const selectUploadActionState = createSelector(
  upload,
  (state: fromUpload.State) => state.isReadyForUpload
);

export const selectFileInput = createSelector(
  fileInput,
  (state: fromUpload.State) => state.fileInput
);

export const selectUploadAction = createSelector(
  currentUploadAction,
  (state: fromUpload.State) => state.uploadAction
);

export const selectFilesToUpload = createSelector(
  fileToUpload,
  (state: fromUpload.State) => state.file
);

export const selectPresignedUrls = createSelector(
  presignedUrls,
  (state: fromUpload.State) => state.preSignedUrls
);

export const selectUploadSuccess = createSelector(
  uploadSuccess,
  (state: fromUpload.State) => state.uploadSuccessful
);
