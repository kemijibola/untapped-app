import {
  IFileInputModel,
  IFileModel,
  IUploadedFiles
} from 'src/app/interfaces';
import * as UploadActions from './upload.actions';

export interface State {
  fileInput: IFileInputModel;
  file: IFileModel;
  preSignedUrls: IUploadedFiles;
}

const initialState: State = {
  fileInput: null,
  file: null,
  preSignedUrls: null
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
    case UploadActions.RESET_FILE_INPUT:
      return {
        ...state,
        fileInput: null
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
    default:
      return state;
  }
}
