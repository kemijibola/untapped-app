import {
  IFileInputModel,
  IFileModel,
  IUploadedFiles,
  UPLOADOPERATIONS,
  PresignedUrl,
  SignedUrl,
  UploadedItems,
  MediaType,
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
  uploadAction: UPLOADOPERATIONS | null;
  uploadSuccessful: boolean;
  // uploadedItems: UploadedItems;
  selectedUploadedItemId: string | number | null;
  uploadedItems: UploadedItems | null;
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
    case UploadActions.CLOUD_UPLOAD_SUCCESS:
      return Object.assign({
        ...state,
        fileInput: null,
        file: null,
        preSignedUrls: null,
        isReadyForUpload: false,
        uploadAction: UPLOADOPERATIONS.Default,
        uploadSuccessful: true,
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
      });
    case UploadActions.SET_PRESIGNED_URL:
      return Object.assign({
        ...state,
        preSignedUrls: Object.assign({
          action: action.payload.action,
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

// export const selectUploadedItemsIds = createSelector(
//   getUploadState,
//   fromAdapter.selectUploadedItemIds
// );

// export const selectUploadedItemEntities = createSelector(
//   getUploadState,
//   fromAdapter.selectUploadedItemEntities
// );

// export const selectAllUploadedItems = createSelector(
//   getUploadState,
//   fromAdapter.selectAllUploadedItem
// );
// export const mediaCount = createSelector(
//   getUploadState,
//   fromAdapter.uploadedItemCount
// );

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
