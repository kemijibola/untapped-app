import {
  IFileInputModel,
  IFileUploadModel,
  IFileModel
} from 'src/app/interfaces';
import * as UploadActions from './upload.actions';

export interface State {
  fileInput: IFileInputModel;
  file: IFileModel;
  preSignedUrls: {};
}

const initialState: State = {
  fileInput: {
    state: false,
    process: '',
    multiple: false,
    accept: ''
  },
  file: null,
  preSignedUrls: {}
};

export function UploadReducers(
  state = initialState,
  action: UploadActions.UploadActions
) {
  switch (action.type) {
    case UploadActions.FILE_INPUT_CONFIG:
      return {
        ...state,
        fileInput: action.payload.fileInput,
        file: null,
        preSignedUrls: {}
      };
    case UploadActions.RESET_FILE_INPUT:
      return {
        ...state,
        fileInput: {
          state: false,
          process: '',
          multiple: false,
          accept: ''
        },
        file: null,
        preSignedUrls: {}
      };
    case UploadActions.FILE_TO_UPLOAD:
      return {
        ...state,
        file: action.payload.file,
        preSignedUrls: {}
      };
    case UploadActions.SET_PRESIGNED_URL:
      return {
        ...state,
        preSignedUrls: action.payload.presignedUrls
      };
    default:
      return state;
  }
}
