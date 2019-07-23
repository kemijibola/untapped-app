import { createSelector } from '@ngrx/store';
import * as fromUpload from './upload.reducers';
import * as fromApp from '../../../store/app.reducers';

const selectUpload = (state: fromApp.AppState) => state.upload;

export const selectUploadActionState = createSelector(
  selectUpload,
  (state: fromUpload.State) => state.isReadyForUpload
);
