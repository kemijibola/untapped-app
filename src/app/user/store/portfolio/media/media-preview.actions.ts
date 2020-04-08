import {
  MediaQueryParams,
  MediaPreview,
  AudioPreview,
  ImagePreview,
  VideoPreview,
} from "src/app/interfaces";
import { Action } from "@ngrx/store";
import { DeleteAudioByIdError } from "../portfolio.actions";

export const FETCH_USER_MEDIA_LIST_PREVIEW = "FETCH_USER_MEDIA_LIST_PREVIEW";
export const FETCH_USER_MEDIA_LIST_PREVIEW_ERROR =
  "FETCH_USER_MEDIA_LIST_PREVIEW_ERROR";
export const SET_USER_MEDIA_LIST_PREVIEW = "SET_USER_MEDIA_LIST_PREVIEW";
export const SET_USER_AUDIO_PREVIEWS = "SET_USER_AUDIO_PREVIEWS";
export const SET_USER_VIDEO_PREVIEWS = "SET_USER_VIDEO_PREVIEWS";
export const SET_USER_IMAGE_PREVIEWS = "SET_USER_IMAGE_PREVIEWS";

export const DELETE_IMAGE_LIST_BY_ID = "DELETE_IMAGE_LIST_BY_ID";
export const DELETE_IMAGE_LIST_BY_ID_SUCCESS =
  "DELETE_IMAGE_LIST_BY_ID_SUCCESS";
export const DELETE_IMAGE_LIST_BY_ID_ERROR = "DELETE_IMAGE_LIST_BY_ID_ERROR";

export const DELETE_AUDIO_LIST_BY_ID = "DELETE_AUDIO_LIST_BY_ID";
export const DELETE_AUDIO_LIST_BY_ID_SUCCESS =
  "DELETE_AUDIO_LIST_BY_ID_SUCCESS";
export const DELETE_AUDIO_LIST_BY_ID_ERROR = "DELETE_AUDIO_LIST_BY_ID_ERROR";

export const DELETE_VIDEO_LIST_BY_ID = "DELETE_VIDEO_LIST_BY_ID";
export const DELETE_VIDEO_LIST_BY_ID_SUCCESS =
  "DELETE_VIDEO_LIST_BY_ID_SUCCESS";
export const DELETE_VIDEO_LIST_BY_ID_ERROR = "DELETE_VIDEO_LIST_BY_ID_ERROR";

export class FetchUserMediaListPreview implements Action {
  readonly type = FETCH_USER_MEDIA_LIST_PREVIEW;
  constructor(public payload: MediaQueryParams) {}
}

export class FetchUserMediaListPreviewError implements Action {
  readonly type = FETCH_USER_MEDIA_LIST_PREVIEW_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}
export class SetUserMediaListPreview implements Action {
  readonly type = SET_USER_MEDIA_LIST_PREVIEW;
  constructor(public payload: MediaPreview[]) {}
}

export class SetUserAudioPreviews implements Action {
  readonly type = SET_USER_AUDIO_PREVIEWS;
  constructor(public payload: { audioPreviews: AudioPreview[] }) {}
}

export class SetUserVideoPreviews implements Action {
  readonly type = SET_USER_VIDEO_PREVIEWS;
  constructor(public payload: { videoPreviews: VideoPreview[] }) {}
}

export class DeleteImageListById implements Action {
  readonly type = DELETE_IMAGE_LIST_BY_ID;
  constructor(public payload: { imageId: string }) {}
}

export class DeleteImageListByIdSuccess implements Action {
  readonly type = DELETE_IMAGE_LIST_BY_ID_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteAudioListByIdSuccess implements Action {
  readonly type = DELETE_AUDIO_LIST_BY_ID_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteVideoListByIdSuccess implements Action {
  readonly type = DELETE_VIDEO_LIST_BY_ID_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteAudioListById implements Action {
  readonly type = DELETE_AUDIO_LIST_BY_ID;
  constructor(public payload: { audioId: string }) {}
}

export class DeleteVideoListById implements Action {
  readonly type = DELETE_VIDEO_LIST_BY_ID;
  constructor(public payload: { videoId: string }) {}
}
export class SetUserImagePreviews implements Action {
  readonly type = SET_USER_IMAGE_PREVIEWS;
  constructor(public payload: { imagePreviews: ImagePreview[] }) {}
}

export class DeleteImageListByIdError implements Action {
  readonly type = DELETE_IMAGE_LIST_BY_ID_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class DeleteAudioListByIdError implements Action {
  readonly type = DELETE_AUDIO_LIST_BY_ID_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class DeleteVideoListByIdError implements Action {
  readonly type = DELETE_VIDEO_LIST_BY_ID_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export type MediaPreviewActions =
  | FetchUserMediaListPreview
  | SetUserMediaListPreview
  | SetUserAudioPreviews
  | SetUserImagePreviews
  | SetUserVideoPreviews
  | FetchUserMediaListPreviewError
  | DeleteImageListById
  | DeleteAudioListById
  | DeleteVideoListById
  | DeleteImageListByIdSuccess
  | DeleteAudioListByIdSuccess
  | DeleteVideoListByIdSuccess
  | DeleteImageListByIdError
  | DeleteAudioListByIdError
  | DeleteVideoListByIdError;
