import {
  IAudio,
  IVideo,
  IImage,
  IGeneralMedia,
  MediaUploadType,
  PortfolioUploadInputConfig,
  MediaAcceptType,
  MediaType,
  PortfolioOperationType
} from 'src/app/interfaces';
import * as PortfolioActions from './portfolio.actions';


export interface PortfolioFeatureState {
  portfolios: State;
}

export interface State {
  audios: IAudio[];
  vidoes: IVideo[];
  images: IImage[];
  items: IGeneralMedia[];
  audio: IAudio;
  video: IVideo;
  image: IImage;
  item: IGeneralMedia;
  selectedMediaUploadType: string;
  selectedMediaType: MediaType;
  uploadConfig: PortfolioUploadInputConfig;
  operationType: PortfolioOperationType;
  accept: string;
}

const initialState: State = {
  audios: [],
  vidoes: [],
  images: [],
  items: [],
  audio: null,
  video: null,
  image: null,
  item: null,
  selectedMediaUploadType: MediaUploadType.NONE,
  selectedMediaType: MediaType.AUDIO,
  uploadConfig: {
    isMultiple: false,
    mediaAccept: MediaAcceptType.IMAGE
  },
  operationType: PortfolioOperationType.DEFAULT,
  accept: ''
};

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions.PortfolioActions
) {
  switch (action.type) {
    case PortfolioActions.SET_PORTFOLIO_AUDIOS:
      return {
        ...state,
        audios: [...action.payload]
      };
    case PortfolioActions.SET_PORTFOLIO_VIDEOS:
      return {
        ...state,
        vidoes: [...action.payload]
      };
    case PortfolioActions.SET_PORTFOLIO_IMAGES:
      return {
        ...state,
        images: [...action.payload]
      };
    case PortfolioActions.SET_PORTFOLIO_GENERALS:
      return {
        ...state,
        items: [...action.payload]
      };
    case PortfolioActions.SET_PORTFOLIO_AUDIO:
      return {
        ...state,
        audio: Object.assign(state.audio, action.payload.audio)
      };
    case PortfolioActions.SET_PORTFOLIO_VIDEO:
      return {
        ...state,
        video: Object.assign(state.video, action.payload.video)
      };
    case PortfolioActions.SET_PORTFOLIO_IMAGE:
      return {
        ...state,
        image: Object.assign(state.image, action.payload.image)
      };
    case PortfolioActions.SET_PORTFOLIO_GENERAL:
      return {
        ...state,
        item: Object.assign(state.image, action.payload.generalUpload)
      };
    case PortfolioActions.SET_MEDIA_UPLOAD_TYPE:
      return {
        ...state,
        selectedMediaUploadType: action.payload
      };
    case PortfolioActions.RESET_MEDIA_UPLOAD_TYPE:
      return {
        ...state,
        selectedMediaUploadType: MediaUploadType.NONE
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
    default:
      return state;
  }
}
