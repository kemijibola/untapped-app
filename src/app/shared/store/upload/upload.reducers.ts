import {
  IFileInputModel,
  IFileModel,
  IUploadedFiles,
  UPLOADOPERATIONS,
  PresignedUrl,
  SignedUrl
} from 'src/app/interfaces';
import * as UploadActions from './upload.actions';

export interface State {
  fileInput: IFileInputModel;
  file: IFileModel;
  preSignedUrls: SignedUrl;
  isReadyForUpload: boolean;
  uploadAction: UPLOADOPERATIONS;
}

const initialState: State = {
  fileInput: {
    state: false,
    process: UPLOADOPERATIONS.Default,
    multiple: false,
    accept: ''
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
  uploadAction: UPLOADOPERATIONS.Default
};

export function UploadReducers(
  state = initialState,
  action: UploadActions.UploadActions
) {
  switch (action.type) {
    case UploadActions.FILE_INPUT_CONFIG:
      return {
        ...state,
        fileInput: action.payload
      };
    case UploadActions.CLOUD_UPLOAD_SUCCESS:
      return {
        ...state,
        fileInput: {
          state: false,
          process: UPLOADOPERATIONS.Default,
          multiple: false,
          accept: ''
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
        uploadAction: UPLOADOPERATIONS.Default
      };
    case UploadActions.RESET_FILE_INPUT:
      return {
        ...state,
        fileInput: {
          state: false,
          process: UPLOADOPERATIONS.Default,
          multiple: false,
          accept: ''
        }
      };
    case UploadActions.FILE_TOUPLOAD:
      return {
        ...state,
        file: action.payload
      };
    case UploadActions.SET_PRESIGNED_URL:
      return {
        ...state,
        preSignedUrls: action.payload
      };
    case UploadActions.SET_APPUPLOAD_OPERATION:
      return {
        ...state,
        uploadAction: action.payload
      };
    default:
      return state;
  }
}
