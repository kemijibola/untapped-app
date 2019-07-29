import { createSelector } from '@ngrx/store';
import * as fromUpload from './upload.reducers';
import * as fromApp from '../../../store/app.reducers';

const upload = (state: fromApp.AppState) => state.upload;
const fileInput = (state: fromApp.AppState) => state.upload;
const currentUploadAction = (state: fromApp.AppState) => state.upload;

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
