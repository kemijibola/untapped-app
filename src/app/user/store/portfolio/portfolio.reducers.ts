import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./portfolio.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
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
  AudioPreview,
  VideoPreview,
  IMediaItem,
} from "src/app/interfaces";
import * as PortfolioActions from "./portfolio.actions";

export interface PortfolioState extends EntityState<IMedia> {
  audios: IAudio[];
  vidoes: IVideo[];
  images: IImage[];
  items: IGeneralMedia[];
  media: IMedia;
  allMedia: IMedia[];
  item: IGeneralMedia;
  selectedMediaUploadType: string;
  selectedMediaType: MediaType;
  uploadConfig: PortfolioUploadInputConfig;
  operationType: PortfolioOperationType;
  accept: string;
  imageDeleted: boolean;
  audioDeleted: boolean;
  videoDeleted: boolean;
  mediaItemDeleted: boolean;
  selectedMediaId: string | number | null;
}

const initialState: PortfolioState = fromAdapter.adapter.getInitialState({
  audios: [],
  vidoes: [],
  images: [],
  items: [],
  allMedia: [],
  media: null,
  item: null,
  selectedMediaUploadType: MediaUploadType.single,
  selectedMediaType: MediaType.AUDIO,
  uploadConfig: {
    isMultiple: false,
    mediaAccept: MediaAcceptType.IMAGE,
  },
  operationType: PortfolioOperationType.DEFAULT,
  accept: "",
  imageDeleted: false,
  audioDeleted: false,
  videoDeleted: false,
  mediaItemDeleted: false,
  selectedMediaId: null,
});

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions.PortfolioActions
): PortfolioState {
  switch (action.type) {
    case PortfolioActions.SET_USER_MEDIA_LIST:
      return fromAdapter.adapter.setAll(action.payload.userMedia, state);
    case PortfolioActions.SET_USER_AUDIO_LIST:
      return Object.assign({
        ...state,
        audios: action.payload,
      });
    case PortfolioActions.SET_MEDIA_BY_ID:
      return Object.assign({
        ...state,
        media: action.payload,
      });
    case PortfolioActions.SET_USER_IMAGE_LIST:
      return Object.assign({
        ...state,
        images: action.payload,
      });
    case PortfolioActions.SET_USER_VIDEO_LIST:
      return Object.assign({
        ...state,
        vidoes: action.payload,
      });
    case PortfolioActions.FETCH_MEDIA_BY_ID:
      return Object.assign({
        ...state,
        selectedMediaId: action.payload.mediaId,
      });
    case PortfolioActions.SET_MEDIA_UPLOAD_TYPE:
      return Object.assign({
        ...state,
        selectedMediaUploadType: action.payload.mediaUpload,
      });
    case PortfolioActions.SET_PORTFOLIO_UPDATE_INPUT_CONFIG:
      return Object.assign({
        ...state,
        uploadConfig: Object.assign({
          isMultiple: action.payload.isMultiple,
          mediaAccept: action.payload.mediaAccept,
        }),
      });
    case PortfolioActions.SET_SELECTED_MEDIA_TYPE:
      return Object.assign({
        ...state,
        selectedMediaType: action.payload.mediaType,
      });
    case PortfolioActions.SET_PORTFOLIO_OPERATION_TYPE:
      return Object.assign({
        ...state,
        operationType: action.payload.operationType,
      });
    case PortfolioActions.SET_PORTFOLIO_SELECTED_ACCEPT_TYPE:
      return Object.assign({
        ...state,
        accept: action.payload.acceptType,
      });
    case PortfolioActions.DELETE_MEDIA_ITEM_BY_ID_SUCCESS:
      let newMedia: IMedia = state.media;
      newMedia.items = state.media.items.reduce(
        (x: IMediaItem[], y: IMediaItem) => {
          if (y._id !== action.payload.itemId) {
            x.push(y);
          }
          return x;
        },
        []
      );
      return Object.assign({
        ...state,
        media: newMedia,
      });

    case PortfolioActions.UPDATE_PORTFOLIO_MEDIA_SUCCESS:
      return Object.assign({
        ...state,
        media: action.payload,
      });
    default: {
      return state;
    }
  }
}

export const getSelectedMediaId = (state: PortfolioState) =>
  state.selectedMediaId;

const getAudios = (state: PortfolioState) => state.audios;

const getImages = (state: PortfolioState) => state.images;

const getVideos = (state: PortfolioState) => state.vidoes;

const getMediaType = (state: PortfolioState) => state.selectedMediaType;

const getOperationType = (state: PortfolioState) => state.operationType;

const getAccept = (state: PortfolioState) => state.accept;

const getUserSelectedMedia = (state: PortfolioState) => state.media;

export const getPortfolioState = createFeatureSelector<PortfolioState>(
  "portfolioState"
);

export const selectMediaIds = createSelector(
  getPortfolioState,
  fromAdapter.selectMediaIds
);

export const selectMediaEntities = createSelector(
  getPortfolioState,
  fromAdapter.selectMediaEntities
);

export const selectAllMedias = createSelector(
  getPortfolioState,
  fromAdapter.selectAllMedias
);
export const mediaCount = createSelector(
  getPortfolioState,
  fromAdapter.mediaCount
);

export const selectUserAudios = createSelector(getPortfolioState, getAudios);

export const selectUserImages = createSelector(getPortfolioState, getImages);

export const selectUserVideos = createSelector(getPortfolioState, getVideos);

export const selectSelectedMedia = createSelector(
  getPortfolioState,
  getUserSelectedMedia
);

export const selectCurrentMediaId = createSelector(
  getPortfolioState,
  getSelectedMediaId
);

export const selectUserMediaType = createSelector(
  getPortfolioState,
  getMediaType
);

export const selectUserOperationType = createSelector(
  getPortfolioState,
  getOperationType
);

export const selectUserAccept = createSelector(getPortfolioState, getAccept);

export const selectCurrentMedia = createSelector(
  selectMediaEntities,
  selectCurrentMediaId,
  (mediaEntities, mediaId) => mediaEntities[mediaId]
);
