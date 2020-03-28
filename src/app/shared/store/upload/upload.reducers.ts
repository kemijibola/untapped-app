import {
  IFileInputModel,
  IFileModel,
  IUploadedFiles,
  UPLOADOPERATIONS,
  PresignedUrl,
  SignedUrl,
  UploadedItems,
  MediaType
} from "src/app/interfaces";
import * as UploadActions from "./upload.actions";

export interface State {
  fileInput: IFileInputModel;
  file: IFileModel;
  preSignedUrls: SignedUrl;
  isReadyForUpload: boolean;
  uploadAction: UPLOADOPERATIONS;
  uploadSuccessful: boolean;
  uploadedItems: UploadedItems;
}

const initialState: State = {
  fileInput: {
    state: false,
    process: UPLOADOPERATIONS.Default,
    multiple: false,
    accept: ""
  },
  file: {
    files: [],
    action: UPLOADOPERATIONS.Default
  },
  preSignedUrls: {
    action: UPLOADOPERATIONS.Default,
    presignedUrl: []
  },
  isReadyForUpload: false,
  uploadAction: UPLOADOPERATIONS.Default,
  uploadSuccessful: false,
  uploadedItems: {
    _id: "",
    title: "",
    shortDescription: "",
    type: MediaType.AUDIO,
    items: []
  }
};

export function UploadReducers(
  state = initialState,
  action: UploadActions.UploadActions
) {
  switch (action.type) {
    case UploadActions.FILE_INPUT_CONFIG:
      return {
        ...state,
        fileInput: action.payload.fileInput
      };
    case UploadActions.CLOUD_UPLOAD_SUCCESS:
      return {
        ...state,
        fileInput: {
          state: false,
          process: UPLOADOPERATIONS.Default,
          multiple: false,
          accept: ""
        },
        file: {
          files: [],
          action: UPLOADOPERATIONS.Default
        },
        preSignedUrls: {
          action: UPLOADOPERATIONS.Default,
          presignedUrl: []
        },
        isReadyForUpload: false,
        uploadAction: UPLOADOPERATIONS.Default,
        uploadSuccessful: true
      };
    case UploadActions.RESET_FILE_INPUT:
      return {
        ...state,
        fileInput: {
          state: false,
          process: UPLOADOPERATIONS.Default,
          multiple: false,
          accept: ""
        },
        uploadSuccessful: false
      };
    case UploadActions.FILE_TOUPLOAD:
      return {
        ...state,
        file: action.payload.file
      };
    case UploadActions.SET_PRESIGNED_URL:
      return {
        ...state,
        preSignedUrls: { ...action.payload }
      };
    case UploadActions.SET_APPUPLOAD_OPERATION:
      return {
        ...state,
        uploadAction: action.payload.uploadOperation
      };
    case UploadActions.SET_UPLOADED_ITEMS:
      return {
        ...state,
        uploadedItems: { ...action.payload }
      };
    case UploadActions.RESET_UPLOADED_ITEMS:
      return {
        ...state,
        uploadedItems: initialState.uploadedItems
      };
    default:
      return state;
  }
}
