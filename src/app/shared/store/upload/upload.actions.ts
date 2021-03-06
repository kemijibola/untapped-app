import { Action } from "@ngrx/store";
import {
  IFileInputModel,
  IFileModel,
  IPresignRequest,
  IUploadedFiles,
  PresignedUrl,
  SignedUrl,
  CloudUploadParams,
  UploadedItems,
  UPLOADCOMPONENT,
  UploadStatus,
} from "src/app/interfaces";

export const FILE_INPUT_CONFIG = "FILE_INPUT_CONFIG";
export const RESET_FILE_INPUT = "RESET_FILE_INPUT";

export const FILE_TOUPLOAD = "FILE_TOUPLOAD";
export const GET_PRESIGNED_URL = "GET_PRESIGNED_URL";
export const GET_PRESIGNED_URL_ERROR = "GET_PRESIGNED_URL_ERROR";
export const SET_PRESIGNED_URL = "SET_PRESIGNED_URL";

export const SET_APPUPLOAD_OPERATION = "SET_APPUPLOAD_OPERATION";

// export const UPLOAD_FILES = "UPLOAD_FILES";
// export const UPLOAD_FILES_ERROR = "UPLOAD_FILES_ERROR";
// export const CLOUD_UPLOAD_SUCCESS = "CLOUD_UPLOAD_SUCCESS";

export const UPLOAD_FILES_REQUEST = "UPLOAD_FILES_REQUEST";
export const UPLOAD_FILES = "UPLOAD_FILES";
export const UPLOAD_FILES_CANCEL = "UPLOAD_FILES_CANCEL";
export const UPLOAD_FILES_RESET = "UPLOAD_FILES_RESET";
export const UPLOAD_FILES_STARTED = "UPLOAD_FILES_STARTED";
export const UPLOAD_FILES_PROGRESS = "UPLOAD_FILES_PROGRESS";
export const UPLOAD_FILES_ERROR = "UPLOAD_FILES_ERROR";
export const UPLOAD_FILES_SUCCESS = "UPLOAD_FILES_SUCCESS";
export const UPLOAD_COMPLETED = "UPLOAD_COMPLETED";

export const GET_THUMBNAIL_PRESIGNED_URL = "GET_THUMBNAIL_PRESIGNED_URL";
export const SET_THUMBNAIL_PRESIGNED_URL = "SET_THUMBNAIL_PRESIGNED_URL";
export const SET_MEDIA_THUMBNAIL = "SET_MEDIA_THUMBNAIL";
export const UPLOAD_THUMBNAIL = "UPLOAD_THUMBNAIL";
export const UPLOAD_THUMBNAIL_SUCCESS = "UPLOAD_THUMBNAIL_SUCCESS";
export const UPLOAD_THUMBNAIL_ERROR = "UPLOAD_THUMBNAIL_ERROR";
// export const GET_THUMBNAIL_URL = "GET_THUMBNAIL_URL";
// export const GET_THUMBNAIL_URL_SUCCESS = "GET_THUMBNAIL_URL_SUCCESS";
// export const GET_THUMBNAIL_URL_ERROR = "GET_THUMBNAIL_URL_ERROR";

export const SET_UPLOADED_ITEMS = "SET_UPLOADED_ITEMS";
export const RESET_UPLOADED_ITEMS = "RESET_UPLOADED_ITEMS";

// export const UPLOAD_FILES_ERROR_RESET = "UPLOAD_FILES_ERROR_RESET";

export class SetUploadedItems implements Action {
  readonly type = SET_UPLOADED_ITEMS;
  constructor(public payload: { uploadedItems: UploadedItems }) {}
}
export class SetMediaThumbnail implements Action {
  readonly type = SET_MEDIA_THUMBNAIL;
  constructor(public payload: { thumbnail: IFileModel }) {}
}
export class GetPresignedUrlError implements Action {
  readonly type = GET_PRESIGNED_URL_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}
export class ResetUploadedItems implements Action {
  readonly type = RESET_UPLOADED_ITEMS;
  constructor(public payload: { uploadedItemId: string }) {}
}

export class FileInputConfig implements Action {
  readonly type = FILE_INPUT_CONFIG;
  constructor(public payload: { fileInput: IFileInputModel }) {}
}

// export class CloudUploadSuccess implements Action {
//   readonly type = CLOUD_UPLOAD_SUCCESS;
// }

export class SetAppUploadOperation implements Action {
  readonly type = SET_APPUPLOAD_OPERATION;
  constructor(public payload: { uploadOperation: UPLOADCOMPONENT }) {}
}
export class ResetFileInput implements Action {
  readonly type = RESET_FILE_INPUT;
}

export class FileToUpload implements Action {
  readonly type = FILE_TOUPLOAD;
  constructor(public payload: { file: IFileModel }) {}
}
export class GetThumbnailPresignedUrl implements Action {
  readonly type = GET_THUMBNAIL_PRESIGNED_URL;
  constructor(public payload: { preSignRequest: IPresignRequest }) {}
}
export class GetPresignedUrl implements Action {
  readonly type = GET_PRESIGNED_URL;
  constructor(public payload: { preSignRequest: IPresignRequest }) {}
}

export class SetThumbnailPresignedUrl implements Action {
  readonly type = SET_THUMBNAIL_PRESIGNED_URL;
  constructor(public payload: SignedUrl) {}
}
export class SetPresignedUrl implements Action {
  readonly type = SET_PRESIGNED_URL;
  constructor(public payload: SignedUrl) {}
}

export class UploadThumbnail implements Action {
  readonly type = UPLOAD_THUMBNAIL;
  constructor(public payload: CloudUploadParams[]) {}
}
export class UploadThumbnailSuccess implements Action {
  readonly type = UPLOAD_THUMBNAIL_SUCCESS;
  constructor(public payload: { thumbnailUrl: string }) {}
}

export class UploadThumbnailError implements Action {
  readonly type = UPLOAD_THUMBNAIL_ERROR;
}
export class UploadFiles implements Action {
  readonly type = UPLOAD_FILES;
  constructor(public payload: CloudUploadParams[]) {}
}

export class UploadCompleted implements Action {
  readonly type = UPLOAD_COMPLETED;
}
export class UploadFilesCancel implements Action {
  readonly type = UPLOAD_FILES_CANCEL;
}
export class UploadFilesReset implements Action {
  readonly type = UPLOAD_FILES_RESET;
}
export class UploadFilesStarted implements Action {
  readonly type = UPLOAD_FILES_STARTED;
}
export class UploadFilesError implements Action {
  readonly type = UPLOAD_FILES_ERROR;
}
export class UploadFilesSuccess implements Action {
  readonly type = UPLOAD_FILES_SUCCESS;
}
export class UploadFilesRequest implements Action {
  readonly type = UPLOAD_FILES_REQUEST;
}

export type UploadActions =
  | FileInputConfig
  | ResetFileInput
  | FileToUpload
  | GetPresignedUrl
  | UploadFiles
  | SetPresignedUrl
  | SetAppUploadOperation
  | SetUploadedItems
  | ResetUploadedItems
  | GetPresignedUrlError
  | UploadFilesCancel
  | UploadFilesReset
  | UploadFilesStarted
  | UploadFilesSuccess
  | UploadFilesError
  | UploadFilesRequest
  | SetMediaThumbnail
  | UploadThumbnail
  | UploadThumbnailSuccess
  | UploadThumbnailError
  | GetThumbnailPresignedUrl
  | SetThumbnailPresignedUrl
  | UploadCompleted;
