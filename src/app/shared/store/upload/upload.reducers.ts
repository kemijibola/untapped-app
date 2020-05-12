import {
  IFileInputModel,
  IFileModel,
  IUploadedFiles,
  PresignedUrl,
  SignedUrl,
  UploadedItems,
  MediaType,
  UPLOADCOMPONENT,
  UploadStatus,
} from "src/app/interfaces";
import * as UploadActions from "./upload.actions";
import { EntityState } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./upload.adapter";

export interface UploadState extends EntityState<any> {
  fileInput: IFileInputModel | null;
  file: IFileModel | null;
  preSignedUrls: SignedUrl | null;
  isReadyForUpload: boolean;
  uploadAction: UPLOADCOMPONENT | null;
  uploadSuccessful: boolean;
  // uploadedItems: UploadedItems;
  selectedUploadedItemId: string | number | null;
  uploadedItems: UploadedItems | null;
  uploadStarted: boolean;
  uploadCompleted: boolean;
  uploadState: UploadStatus;
}

const initialState: UploadState = fromAdapter.adapter.getInitialState({
  fileInput: null,
  file: null,
  preSignedUrls: null,
  isReadyForUpload: false,
  uploadAction: null,
  uploadSuccessful: false,
  uploadedItems: null,
  selectedUploadedItemId: null,
  uploadStarted: null,
  uploadState: null,
  uploadCompleted: null,
});

export function reducer(
  state = initialState,
  action: UploadActions.UploadActions
): UploadState {
  switch (action.type) {
    case UploadActions.FILE_INPUT_CONFIG:
      return Object.assign({
        ...state,
        fileInput: { ...action.payload },
      });
    case UploadActions.UPLOAD_FILES_SUCCESS:
      return Object.assign({
        ...state,
        fileInput: null,
        file: null,
        preSignedUrls: null,
        isReadyForUpload: false,
        uploadAction: UPLOADCOMPONENT.default,
        uploadSuccessful: true,
        uploadState: UploadStatus.Completed,
      });
    case UploadActions.RESET_FILE_INPUT:
      return Object.assign({
        ...state,
        fileInput: null,
        file: null,
        uploadSuccessful: false,
      });
    case UploadActions.FILE_TOUPLOAD:
      return Object.assign({
        ...state,
        file: { ...action.payload.file },
        uploadState: UploadStatus.Started,
      });
    case UploadActions.SET_PRESIGNED_URL:
      return Object.assign({
        ...state,
        preSignedUrls: Object.assign({
          component: action.payload.component,
          presignedUrl: action.payload.presignedUrl,
        }),
      });
    case UploadActions.SET_APPUPLOAD_OPERATION:
      return Object.assign({
        ...state,
        uploadAction: action.payload.uploadOperation,
      });
    case UploadActions.SET_UPLOADED_ITEMS:
      return Object.assign({
        ...state,
        uploadedItems: { ...action.payload.uploadedItems },
      });
    case UploadActions.RESET_UPLOADED_ITEMS:
      return Object.assign({
        ...state,
        uploadedItems: null,
      });
    default: {
      return state;
    }
  }
}

export const getselectedUploadedItemId = (state: UploadState) =>
  state.selectedUploadedItemId;

const getUploadActionState = (state: UploadState) => state.isReadyForUpload;

const getFileInput = (state: UploadState) => state.fileInput;

const getUploadAction = (state: UploadState) => state.uploadAction;

const getPresignedUrls = (state: UploadState) => state.preSignedUrls;

const getFilesToUpload = (state: UploadState) => state.file;

const getUploadStatus = (state: UploadState) => state.uploadSuccessful;

const getUploadedItems = (state: UploadState) => state.uploadedItems;

export const getUploadState = createFeatureSelector<UploadState>("uploadState");

const getUploadProgressState = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Started;

const getS3UploadSuccess = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Completed;

export const selectCurrentUploadStatus = createSelector(
  getUploadState,
  getUploadProgressState
);

export const selectUploadCompleted = createSelector(
  getUploadState,
  getS3UploadSuccess
);
export const selectCurrentUploadedItemId = createSelector(
  getUploadState,
  getselectedUploadedItemId
);

export const selectCurrentUploadedItem = createSelector(
  getUploadState,
  getUploadedItems
);

export const selectUploadActionState = createSelector(
  getUploadState,
  getUploadActionState
);

export const selectUserMediaType = createSelector(
  getUploadState,
  getUploadState
);

export const selectUploadFileInput = createSelector(
  getUploadState,
  getFileInput
);

export const selectUploadAction = createSelector(
  getUploadState,
  getUploadAction
);

export const selectPresignedUrls = createSelector(
  getUploadState,
  getPresignedUrls
);

export const selectFilesToUpload = createSelector(
  getUploadState,
  getFilesToUpload
);

export const selectUploadStatus = createSelector(
  getUploadState,
  getUploadStatus
);
