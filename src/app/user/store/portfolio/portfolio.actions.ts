import { Action } from "@ngrx/store";
import {
  PortfolioQueryParams,
  IAudio,
  IVideo,
  IImage,
  IGeneralMedia,
  MediaUploadType,
  PortfolioUploadInputConfig,
  MediaAcceptType,
  MediaType,
  PortfolioOperationType,
  IMedia,
  UploadedItems,
  MediaQueryParams,
  MediaPreview,
} from "../../../interfaces";

export const FETCH_USER_MEDIA_LIST = "FETCH_USER_MEDIA_LIST";
export const SET_USER_MEDIA_LIST = "SET_USER_MEDIA_LIST";
export const SET_USER_AUDIO_LIST = "SET_USER_AUDIO_LIST";
export const SET_USER_IMAGE_LIST = "SET_USER_IMAGE_LIST";
export const SET_USER_VIDEO_LIST = "SET_USER_VIDEO_LIST";
export const FETCH_USER_MEDIA_LIST_ERROR = "FETCH_USER_MEDIA_LIST_ERROR";

export const FETCH_MEDIA_BY_ID = "FETCH_MEDIA_BY_ID";
export const SET_MEDIA_BY_ID = "SET_MEDIA_BY_ID";
export const FETCH_MEDIA_BY_ID_ERROR = "FETCH_MEDIA_BY_ID_ERROR";

export const DELETE_IMAGE_BY_ID = "DELETE_IMAGE_BY_ID";
export const DELETE_IMAGE_BY_ID_SUCCESS = "DELETE_IMAGE_BY_ID_SUCCESS";
export const RESET_DELETE_IMAGE_BY_ID_SUCCESS =
  "RESET_DELETE_IMAGE_BY_ID_SUCCESS";
export const DELETE_IMAGE_BY_ID_ERROR = "DELETE_IMAGE_BY_ID_ERROR";

export const DELETE_MEDIA_ITEM_BY_ID = "DELETE_MEDIA_ITEM_BY_ID";
export const DELETE_MEDIA_ITEM_BY_ID_SUCCESS =
  "DELETE_MEDIA_ITEM_BY_ID_SUCCESS";
export const DELETE_MEDIA_ITEM_BY_ID_ERROR = "DELETE_MEDIA_ITEM_BY_ID_ERROR";

export const DELETE_AUDIO_BY_ID = "DELETE_AUDIO_BY_ID";
export const DELETE_AUDIO_BY_ID_SUCCESS = "DELETE_AUDIO_BY_ID_SUCCESS";
export const DELETE_AUDIO_BY_ID_ERROR = "DELETE_AUDIO_BY_ID_ERROR";

export const DELETE_VIDEO_BY_ID = "DELETE_VIDEO_BY_ID";
export const DELETE_VIDEO_BY_ID_ERROR = "DELETE_VIDEO_BY_ID_ERROR";
export const DELETE_VIDEO_BY_ID_SUCCESS = "DELETE_VIDEO_BY_ID_SUCCESS";

export const FETCH_ALL_MEDIA = "FETCH_ALL_MEDIA";
export const SET_ALL_MEDIA = "SET_ALL_MEDIA";
export const FETCH_ALL_MEDIA_ERROR = "FETCH_ALL_MEDIA_ERROR";

export const SET_MEDIA_UPLOAD_TYPE = "SET_MEDIA_UPLOAD_TYPE";
export const RESET_MEDIA_UPLOAD_TYPE = "RESET_MEDIA_UPLOAD_TYPE";
export const SET_PORTFOLIO_UPDATE_INPUT_CONFIG =
  "SET_PORTFOLIO_UPDATE_INPUT_CONFIG";
export const SET_SELECTED_MEDIA_TYPE = "SET_SELECTED_MEDIA_TYPE";

export const SET_PORTFOLIO_OPERATION_TYPE = "SET_PORTFOLIO_OPERATION_TYPE";
export const FETCH_PORTFOLIO_OPERATION_TYPE = "FETCH_PORTFOLIO_OPERATION_TYPE";

export const SET_PORTFOLIO_SELECTED_ACCEPT_TYPE =
  "SET_PORTFOLIO_SELECTED_ACCEPT_TYPE";
export const FETCH_PORTFOLIO_SELECTED_ACCEPT_TYPE =
  "FETCH_PORTFOLIO_SELECTED_ACCEPT_TYPE";

export const CREATE_PORTFOLIO_MEDIA = "CREATE_PORTFOLIO_MEDIA";
export const CREATE_PORTFOLIO_MEDIA_SUCCESS = "CREATE_PORTFOLIO_MEDIA_SUCCESS";
export const CREATE_PORTFOLIO_MEDIA_ERROR = "CREATE_PORTFOLIO_MEDIA_ERROR";

export const UPDATE_PORTFOLIO_MEDIA = "UPDATE_PORTFOLIO_MEDIA";
export const UPDATE_PORTFOLIO_MEDIA_SUCCESS = "UPDATE_PORTFOLIO_MEDIA_SUCCESS";
export const UPDATE_PORTFOLIO_MEDIA_ERROR = "UPDATE_PORTFOLIO_MEDIA_ERROR";

export class DeleteMediaItemById implements Action {
  readonly type = DELETE_MEDIA_ITEM_BY_ID;
  constructor(public payload: { id: string; itemId: string }) {}
}
export class DeleteMediaItemByIdSuccess implements Action {
  readonly type = DELETE_MEDIA_ITEM_BY_ID_SUCCESS;
  constructor(public payload: { itemId: string }) {}
}

export class CreatePortfolioMediaError implements Action {
  readonly type = CREATE_PORTFOLIO_MEDIA_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class DeleteAudioByIdError implements Action {
  readonly type = DELETE_AUDIO_BY_ID_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class DeleteVideoByIdError implements Action {
  readonly type = DELETE_VIDEO_BY_ID_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class FetchAllMediaError implements Action {
  readonly type = FETCH_ALL_MEDIA_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class FetchUserMediaListError implements Action {
  readonly type = FETCH_USER_MEDIA_LIST_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class DeleteMediaItemByIdError implements Action {
  readonly type = DELETE_MEDIA_ITEM_BY_ID_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class FetchMediaByIdError implements Action {
  readonly type = FETCH_MEDIA_BY_ID_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class UpdatePorfolioMediaError implements Action {
  readonly type = UPDATE_PORTFOLIO_MEDIA_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class DeleteImageById implements Action {
  readonly type = DELETE_IMAGE_BY_ID;
  constructor(public payload: { imageId: string }) {}
}

export class SetPortfolioSelectedAcceptType implements Action {
  readonly type = SET_PORTFOLIO_SELECTED_ACCEPT_TYPE;
  constructor(public payload: { acceptType: string }) {}
}

export class UpdatePortfolioMedia implements Action {
  readonly type = "UPDATE_PORTFOLIO_MEDIA";
  constructor(
    public payload: { uploadType: MediaUploadType; data: UploadedItems }
  ) {}
}

export class CreatePortfolioMedia implements Action {
  readonly type = "CREATE_PORTFOLIO_MEDIA";
  constructor(
    public payload: { uploadType: MediaUploadType; data: UploadedItems }
  ) {}
}

export class UpdatePortfolioMediaSuccess implements Action {
  readonly type = "UPDATE_PORTFOLIO_MEDIA_SUCCESS";
  constructor(public payload: IMedia) {}
}

export class CreatePortfolioMediaSuccess implements Action {
  readonly type = "CREATE_PORTFOLIO_MEDIA_SUCCESS";
  constructor(public payload: IMedia) {}
}

export class FetchPorfolioSelectedAcceptType implements Action {
  readonly type = FETCH_PORTFOLIO_SELECTED_ACCEPT_TYPE;
}

export class SetPortfolioOperationType implements Action {
  readonly type = SET_PORTFOLIO_OPERATION_TYPE;
  constructor(public payload: { operationType: PortfolioOperationType }) {}
}

export class FetchPortfolioOperationType implements Action {
  readonly type = FETCH_PORTFOLIO_OPERATION_TYPE;
}
export class SetMediaUploadType implements Action {
  readonly type = SET_MEDIA_UPLOAD_TYPE;
  constructor(public payload: { mediaUpload: MediaUploadType }) {}
}
export class ResetMediaUploadType implements Action {
  readonly type = RESET_MEDIA_UPLOAD_TYPE;
}

export class SetPortfolioUpdateInputConfig implements Action {
  readonly type = SET_PORTFOLIO_UPDATE_INPUT_CONFIG;
  constructor(public payload: PortfolioUploadInputConfig) {}
}

export class SetSelectedMediaType implements Action {
  readonly type = SET_SELECTED_MEDIA_TYPE;
  constructor(public payload: { mediaType: MediaType }) {}
}

export class FetchUserMediaList implements Action {
  readonly type = FETCH_USER_MEDIA_LIST;
  constructor(public payload: MediaQueryParams) {}
}

export class SetUserMediaList implements Action {
  readonly type = SET_USER_MEDIA_LIST;
  constructor(public payload: { userMedia: IMedia[] }) {}
}
export class SetUserAudioList implements Action {
  readonly type = SET_USER_AUDIO_LIST;
  constructor(public payload: IMedia[]) {}
}

export class SetUserVideoList implements Action {
  readonly type = SET_USER_VIDEO_LIST;
  constructor(public payload: IMedia[]) {}
}

export class SetUserImageList implements Action {
  readonly type = SET_USER_IMAGE_LIST;
  constructor(public payload: IMedia[]) {}
}

export class FetchMediaById implements Action {
  readonly type = FETCH_MEDIA_BY_ID;
  constructor(public payload: { mediaId: string }) {}
}

export class SetMediaById implements Action {
  readonly type = SET_MEDIA_BY_ID;
  constructor(public payload: IMedia) {}
}

export class FetchAllMedia implements Action {
  readonly type = FETCH_ALL_MEDIA;
  constructor(public payload: MediaQueryParams) {}
}

export class SetAllMedia implements Action {
  readonly type = SET_ALL_MEDIA;
  constructor(public payload: IMedia[]) {}
}

export type PortfolioActions =
  | SetMediaUploadType
  | ResetMediaUploadType
  | SetPortfolioUpdateInputConfig
  | SetSelectedMediaType
  | SetPortfolioOperationType
  | FetchPortfolioOperationType
  | SetPortfolioSelectedAcceptType
  | FetchPorfolioSelectedAcceptType
  | UpdatePortfolioMedia
  | UpdatePortfolioMediaSuccess
  | CreatePortfolioMedia
  | CreatePortfolioMediaSuccess
  | FetchUserMediaList
  | FetchMediaById
  | SetMediaById
  | FetchMediaByIdError
  | FetchAllMedia
  | SetAllMedia
  | DeleteImageById
  | DeleteMediaItemById
  | DeleteMediaItemByIdSuccess
  | SetUserAudioList
  | SetUserImageList
  | SetUserVideoList
  | CreatePortfolioMediaError
  | UpdatePorfolioMediaError
  | FetchUserMediaListError
  | DeleteMediaItemByIdError
  | DeleteAudioByIdError
  | DeleteVideoByIdError
  | FetchAllMediaError
  | SetUserMediaList;
