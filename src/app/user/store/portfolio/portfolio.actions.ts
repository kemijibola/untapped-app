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
  MediaPreview
} from "../../../interfaces";

export const FETCH_USER_MEDIA_LIST = "FETCH_USER_MEDIA_LIST";
export const SET_USER_MEDIA_LIST = "SET_USER_MEDIA_LIST";

export const FETCH_USER_MEDIA_LIST_PREVIEW = "FETCH_USER_MEDIA_LIST_PREVIEW";
export const SET_USER_MEDIA_LIST_PREVIEW = "SET_USER_MEDIA_LIST_PREVIEW";

// export const FETCH_IMAGE_ALBUM_BY_ID = "FETCH_IMAGE_ALBUM_BY_ID";
// export const SET_IMAGE_ALBUM_BY_ID = "SET_IMAGE_ALBUM_BY_ID";

// export const FETCH_AUDIO_ALBUM_BY_ID = "FETCH_AUDIO_ALBUM_BY_ID";
// export const SET_AUDIO_ALBUM_BY_ID = "SET_AUDIO_ALBUM_BY_ID";

// export const FETCH_VIDEO_ALBUM_BY_ID = "FETCH_VIDEO_ALBUM_BY_ID";
// export const SET_AUDIO_ALBUM_BY_ID = "SET_AUDIO_ALBUM_BY_ID";

export const FETCH_MEDIA_BY_ID = "FETCH_MEDIA_BY_ID";
export const SET_MEDIA_BY_ID = "SET_MEDIA_BY_ID";

export const FETCH_ALL_MEDIA = "FETCH_ALL_MEDIA";
export const SET_ALL_MEDIA = "SET_ALL_MEDIA";

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

export const UPDATE_PORTFOLIO_MEDIA = "UPDATE_PORTFOLIO_MEDIA";
export const UPDATE_PORTFOLIO_MEDIA_SUCCESS = "UPDATE_PORTFOLIO_MEDIA_SUCCESS";

export class SetPortfolioSelectedAcceptType implements Action {
  readonly type = SET_PORTFOLIO_SELECTED_ACCEPT_TYPE;
  constructor(public payload: string) {}
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
  constructor(public payload: PortfolioOperationType) {}
}

export class FetchPortfolioOperationType implements Action {
  readonly type = FETCH_PORTFOLIO_OPERATION_TYPE;
}

export class SetMediaUploadType implements Action {
  readonly type = SET_MEDIA_UPLOAD_TYPE;
  constructor(public payload: MediaUploadType) {}
}

export class ResetMediaUploadType implements Action {
  readonly type = RESET_MEDIA_UPLOAD_TYPE;
}

export class SetPortfolioUpdateInputConfig implements Action {
  readonly type = SET_PORTFOLIO_UPDATE_INPUT_CONFIG;
  constructor(public paylod: PortfolioUploadInputConfig) {}
}

export class SetSelectedMediaType implements Action {
  readonly type = SET_SELECTED_MEDIA_TYPE;
  constructor(public payload: MediaType) {}
}

export class FetchUserMediaList implements Action {
  readonly type = FETCH_USER_MEDIA_LIST;
  constructor(public payload: MediaQueryParams) {}
}

export class SetUserMediaList implements Action {
  readonly type = SET_USER_MEDIA_LIST;
  constructor(public payload: IMedia[]) {}
}

export class FetchUserMediaListPreview implements Action {
  readonly type = FETCH_USER_MEDIA_LIST_PREVIEW;
  constructor(public payload: MediaQueryParams) {}
}

export class SetUserMediaListPreview implements Action {
  readonly type = SET_USER_MEDIA_LIST_PREVIEW;
  constructor(public payload: MediaPreview[]) {}
}

export class FetchMediaById implements Action {
  readonly type = FETCH_MEDIA_BY_ID;
  constructor(public payload: MediaQueryParams) {}
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
  | SetUserMediaList
  | FetchUserMediaListPreview
  | SetUserMediaListPreview
  | FetchMediaById
  | SetMediaById
  | FetchAllMedia
  | SetAllMedia;
