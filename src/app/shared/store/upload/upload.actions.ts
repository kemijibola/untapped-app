import { Action } from '@ngrx/store';
import { FileInputModel, FileUploadModel, FileModel, PresignFileModel } from 'src/app/models/shared/file';

export const FILE_INPUT_CONFIG = 'FILE_INPUT_CONFIG';
export const RESET_FILE_INPUT = 'RESET_FILE_INPUT';
export const FILE_TO_UPLOAD = 'FILE_TO_UPLOAD';
export const GET_PRESIGNED_URL = 'GET_PRESIGNED_URL';
export const SET_PRESIGNED_URL = 'SET_PRESIGNED_URL';

export class FileInputConfig implements Action {
    readonly type = FILE_INPUT_CONFIG;
    constructor(public payload: { fileInput: FileInputModel}) {}
}

export class ResetFileInput implements Action {
    readonly type = RESET_FILE_INPUT;
}

export class FileToUpload implements Action {
    readonly type = FILE_TO_UPLOAD;
    constructor(public payload: { file: FileModel }) {}
}

export class GetPresignedUrl implements Action {
    readonly type = GET_PRESIGNED_URL;
    constructor(public payload: { file: PresignFileModel}) {}
}

export class SetPresignedUrl implements Action {
    readonly type = SET_PRESIGNED_URL;
    constructor(public payload: { presignedUrls: {}}) {}
}

export type UploadActions =
FileInputConfig | ResetFileInput |
FileToUpload | GetPresignedUrl |
SetPresignedUrl;
