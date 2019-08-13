import { Action } from '@ngrx/store';
import {
  IFileInputModel,
  IFileModel,
  IPresignRequest,
  IUploadedFiles,
  UPLOADOPERATIONS,
  PresignedUrl,
  SignedUrl,
  CloudUploadParams
} from 'src/app/interfaces';

export const FILE_INPUT_CONFIG = 'FILE_INPUT_CONFIG';
export const RESET_FILE_INPUT = 'RESET_FILE_INPUT';

export const FILE_TOUPLOAD = 'FILE_TOUPLOAD';
export const GET_PRESIGNED_URL = 'GET_PRESIGNED_URL';
export const SET_PRESIGNED_URL = 'SET_PRESIGNED_URL';
export const SET_APPUPLOAD_OPERATION = 'SET_APPUPLOAD_OPERATION';

export const UPLOAD_FILES = 'UPLOAD_FILES';

export const CLOUD_UPLOAD_SUCCESS = 'CLOUD_UPLOAD_SUCCESS';

export class FileInputConfig implements Action {
  readonly type = FILE_INPUT_CONFIG;
  constructor(public payload: { fileInput: IFileInputModel }) {}
}

export class CloudUploadSuccess implements Action {
  readonly type = CLOUD_UPLOAD_SUCCESS;
}

export class SetAppUploadOperation implements Action {
  readonly type = SET_APPUPLOAD_OPERATION;
  constructor(public payload: { uploadOperation: UPLOADOPERATIONS }) {}
}
export class ResetFileInput implements Action {
  readonly type = RESET_FILE_INPUT;
}

export class FileToUpload implements Action {
  readonly type = FILE_TOUPLOAD;
  constructor(public payload: { file: IFileModel }) {}
}

export class GetPresignedUrl implements Action {
  readonly type = GET_PRESIGNED_URL;
  constructor(public payload: { preSignRequest: IPresignRequest }) {}
}

export class SetPresignedUrl implements Action {
  readonly type = SET_PRESIGNED_URL;
  constructor(public payload: { signedUrl: SignedUrl }) {}
}

export class UploadFiles implements Action {
  readonly type = UPLOAD_FILES;
  constructor(public payload: { cloudParams: CloudUploadParams }) {}
}

export type UploadActions =
  | FileInputConfig
  | ResetFileInput
  | FileToUpload
  | GetPresignedUrl
  | UploadFiles
  | SetPresignedUrl
  | SetAppUploadOperation
  | CloudUploadSuccess;
