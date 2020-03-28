import { ImagePreview } from "./../../../interfaces/user/portfolio";
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
  VideoPreview
} from "src/app/interfaces";
import * as PortfolioActions from "./portfolio.actions";

export interface State {
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
}

const initialState: State = {
  audios: [],
  vidoes: [],
  images: [],
  items: [],
  allMedia: [],
  media: null,
  item: null,
  selectedMediaUploadType: MediaUploadType.SINGLE,
  selectedMediaType: MediaType.AUDIO,
  uploadConfig: {
    isMultiple: false,
    mediaAccept: MediaAcceptType.IMAGE
  },
  operationType: PortfolioOperationType.DEFAULT,
  accept: "",
  imageDeleted: false,
  audioDeleted: false,
  videoDeleted: false,
  mediaItemDeleted: false
};

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions.PortfolioActions
): State {
  switch (action.type) {
    case PortfolioActions.SET_MEDIA_UPLOAD_TYPE:
      return {
        ...state,
        selectedMediaUploadType: action.payload
      };
    case PortfolioActions.RESET_MEDIA_UPLOAD_TYPE:
      return {
        ...state,
        selectedMediaUploadType: MediaUploadType.SINGLE
      };
    case PortfolioActions.SET_PORTFOLIO_UPDATE_INPUT_CONFIG:
      return {
        ...state,
        uploadConfig: Object.assign(state.uploadConfig, action.paylod)
      };
    case PortfolioActions.SET_SELECTED_MEDIA_TYPE:
      return {
        ...state,
        selectedMediaType: action.payload
      };
    case PortfolioActions.SET_PORTFOLIO_OPERATION_TYPE:
      return {
        ...state,
        operationType: action.payload
      };
    case PortfolioActions.SET_PORTFOLIO_SELECTED_ACCEPT_TYPE:
      return {
        ...state,
        accept: action.payload
      };
    case PortfolioActions.SET_USER_MEDIA_LIST:
      const userAudios = action.payload.filter(
        x => x.mediaType === MediaType.AUDIO.toLowerCase()
      );
      const userImages = action.payload.filter(
        x => x.mediaType === MediaType.IMAGE.toLowerCase()
      );
      const userVideos = action.payload.filter(
        x => x.mediaType === MediaType.VIDEO.toLowerCase()
      );
      return {
        ...state,
        audios: [...userAudios],
        images: [...userImages],
        vidoes: [...userVideos]
      };
    case PortfolioActions.SET_MEDIA_BY_ID:
      return {
        ...state,
        media: { ...state.media, ...action.payload }
      };
    case PortfolioActions.DELETE_IMAGE_BY_ID_SUCCESS:
      return {
        ...state,
        imageDeleted: !state.imageDeleted
      };
    case PortfolioActions.RESET_DELETE_IMAGE_BY_ID_SUCCESS:
      return {
        ...state,
        imageDeleted: !state.imageDeleted
      };
    case PortfolioActions.DELETE_AUDIO_BY_ID_SUCCESS:
      return {
        ...state,
        audioDeleted: !state.audioDeleted
      };
    case PortfolioActions.RESET_DELETE_AUDIO_BY_ID_SUCCESS:
      return {
        ...state,
        audioDeleted: !state.audioDeleted
      };
    case PortfolioActions.DELETE_VIDEO_BY_ID_SUCCESS:
      return {
        ...state,
        videoDeleted: !state.videoDeleted
      };
    case PortfolioActions.RESET_DELETE_IMAGE_BY_ID_SUCCESS:
      return {
        ...state,
        videoDeleted: !state.videoDeleted
      };
    case PortfolioActions.DELETE_MEDIA_ITEM_BY_ID_SUCCESS:
      return {
        ...state,
        mediaItemDeleted: !state.mediaItemDeleted
      };
    case PortfolioActions.RESET_DELETE_MEDIA_ITEM_BY_ID_SUCCESS:
      return {
        ...state,
        mediaItemDeleted: !state.mediaItemDeleted
      };
    default:
      return state;
  }
}
