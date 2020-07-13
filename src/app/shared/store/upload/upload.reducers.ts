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
  thumbnailPresignedUrl: SignedUrl | null;
  isReadyForUpload: boolean;
  uploadAction: UPLOADCOMPONENT | null;
  uploadSuccessful: boolean;
  // uploadedItems: UploadedItems;
  selectedUploadedItemId: string | number | null;
  uploadedItems: UploadedItems | null;
  uploadStarted: boolean;
  uploadCompleted: boolean;
  uploadState: UploadStatus;
  mediaThumbnail: IFileModel | null;
  thumbnailUrl: string | null;
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
  uploadState: UploadStatus.Ready,
  uploadCompleted: null,
  mediaThumbnail: null,
  thumbnailPresignedUrl: null,
  thumbnailUrl: null,
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
        thumbnailUrl: null,
        thumbnailPresignedUrl: null,
        mediaThumbnail: null,
        isReadyForUpload: false,
        uploadAction: UPLOADCOMPONENT.default,
        uploadSuccessful: true,
      });
    case UploadActions.UPLOAD_COMPLETED:
      return Object.assign({
        ...state,
        uploadState: UploadStatus.Completed,
      });
    case UploadActions.UPLOAD_FILES:
      return Object.assign({
        ...state,
        uploadState: UploadStatus.Started,
      });
    case UploadActions.UPLOAD_FILES_ERROR:
      return Object.assign({
        ...state,
        uploadState: UploadStatus.Failed,
      });
    case UploadActions.UPLOAD_THUMBNAIL_SUCCESS:
      return Object.assign({
        ...state,
        thumbnailUrl: action.payload.thumbnailUrl,
      });
    case UploadActions.RESET_FILE_INPUT:
      return Object.assign({
        ...state,
        fileInput: null,
        file: null,
        thumbnailUrl: null,
        thumbnailPresignedUrl: null,
        mediaThumbnail: null,
        uploadSuccessful: false,
        uploadState: UploadStatus.Ready,
      });
    case UploadActions.FILE_TOUPLOAD:
      return Object.assign({
        ...state,
        file: { ...action.payload.file },
        uploadState: UploadStatus.Started,
      });
    case UploadActions.SET_THUMBNAIL_PRESIGNED_URL:
      return Object.assign({
        ...state,
        thumbnailPresignedUrl: { ...action.payload },
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
    case UploadActions.UPLOAD_THUMBNAIL_ERROR:
      return Object.assign({
        ...state,
        uploadState: UploadStatus.Failed,
      });
    case UploadActions.SET_UPLOADED_ITEMS:
      return Object.assign({
        ...state,
        uploadedItems: { ...action.payload.uploadedItems },
      });
    case UploadActions.SET_MEDIA_THUMBNAIL:
      return Object.assign({
        ...state,
        mediaThumbnail: { ...action.payload.thumbnail },
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

const getThumbnailUrl = (state: UploadState) => state.thumbnailUrl;

const getThumbnailPresignedUrl = (state: UploadState) =>
  state.thumbnailPresignedUrl;

const getFilesToUpload = (state: UploadState) => state.file;

const getUploadStatus = (state: UploadState) => state.uploadSuccessful;

const getUploadedItems = (state: UploadState) => state.uploadedItems;

const getMediaThumbnail = (state: UploadState) => state.mediaThumbnail;

const getUploadCompleted = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Completed;

const getUploadInProgress = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Started;

const getUploadInitiated = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Started;

const getUploadFailure = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Failed;

const getUploadReady = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Ready;

export const getUploadState = createFeatureSelector<UploadState>("uploadState");

const getUploadProgressState = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Started;

const getS3UploadSuccess = (state: UploadState): boolean =>
  state.uploadState === UploadStatus.Completed;

export const selectCurrentUploadStatus = createSelector(
  getUploadState,
  getUploadProgressState
);

export const selectThumbnailUrl = createSelector(
  getUploadState,
  getThumbnailUrl
);

export const selectMediaThumbnailFile = createSelector(
  getUploadState,
  getMediaThumbnail
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

export const selectUploadInProgressStatus = createSelector(
  getUploadState,
  getUploadInProgress
);

export const selectUploadCompletedStatus = createSelector(
  getUploadState,
  getUploadCompleted
);

export const selectUploadInitiatedStatus = createSelector(
  getUploadState,
  getUploadInitiated
);

export const selectUploadFailedStatus = createSelector(
  getUploadState,
  getUploadFailure
);

export const selectThumbnailPresignedUrl = createSelector(
  getUploadState,
  getThumbnailPresignedUrl
);

export const selectFilesToUpload = createSelector(
  getUploadState,
  getFilesToUpload
);

export const selectUploadReadyStatus = createSelector(
  getUploadState,
  getUploadReady
);

export const selectUploadStatus = createSelector(
  getUploadState,
  getUploadStatus
);
