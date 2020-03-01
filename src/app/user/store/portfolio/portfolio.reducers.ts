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
  audioPreviews: AudioPreview[];
  vidoes: IVideo[];
  videoPreviews: VideoPreview[];
  images: IImage[];
  imagePreviews: ImagePreview[];
  items: IGeneralMedia[];
  media: IMedia;
  allMedia: IMedia[];
  item: IGeneralMedia;
  selectedMediaUploadType: string;
  selectedMediaType: MediaType;
  uploadConfig: PortfolioUploadInputConfig;
  operationType: PortfolioOperationType;
  accept: string;
}

const initialState: State = {
  audios: [],
  audioPreviews: [],
  imagePreviews: [],
  videoPreviews: [],
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
  accept: ""
};

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions.PortfolioActions
) {
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
    case PortfolioActions.SET_USER_MEDIA_LIST_PREVIEW:
      const userAudioPreviews = action.payload.filter(
        x => x.mediaType === MediaType.AUDIO.toLowerCase()
      );
      const userImagePreviews = action.payload.filter(
        x => x.mediaType === MediaType.IMAGE.toLowerCase()
      );
      const userVideoPreviews = action.payload.filter(
        x => x.mediaType === MediaType.VIDEO.toLowerCase()
      );
      return {
        ...state,
        audioPreviews: [...userAudioPreviews],
        imagePreviews: [...userImagePreviews],
        vidoePreviews: [...userVideoPreviews]
      };
    case PortfolioActions.SET_MEDIA_BY_ID:
      return {
        ...state,
        media: { ...state.media, ...action.payload }
      };
    default:
      return state;
  }
}
