import { Action } from '@ngrx/store';
import {
  IFileInputModel,
  IFileModel,
  IPresignFileModel,
  IUploadedFiles,
  UPLOADOPERATIONS
} from 'src/app/interfaces';

export const FILE_INPUT_CONFIG = 'FILE_INPUT_CONFIG';
export const RESET_FILE_INPUT = 'RESET_FILE_INPUT';

export const FILE_TOUPLOAD = 'FILE_TOUPLOAD';
export const GET_PRESIGNED_URL = 'GET_PRESIGNED_URL';
export const SET_PRESIGNED_URL = 'SET_PRESIGNED_URL';
export const SET_APPUPLOAD_OPERATION = 'SET_APPUPLOAD_OPERATION';

export class FileInputConfig implements Action {
  readonly type = FILE_INPUT_CONFIG;
  constructor(public payload: IFileInputModel) {}
}

export class SetAppUploadOperation implements Action {
  readonly type = SET_APPUPLOAD_OPERATION;
  constructor(public payload: UPLOADOPERATIONS) {}
}
export class ResetFileInput implements Action {
  readonly type = RESET_FILE_INPUT;
}

export class FileToUpload implements Action {
  readonly type = FILE_TOUPLOAD;
  constructor(public payload: IFileModel) {}
}

export class GetPresignedUrl implements Action {
  readonly type = GET_PRESIGNED_URL;
  constructor(public payload: IPresignFileModel) {}
}

export class SetPresignedUrl implements Action {
  readonly type = SET_PRESIGNED_URL;
  constructor(public payload: IUploadedFiles) {}
}

export type UploadActions =
  | FileInputConfig
  | ResetFileInput
  | FileToUpload
  | GetPresignedUrl
  | SetPresignedUrl
  | SetAppUploadOperation;
