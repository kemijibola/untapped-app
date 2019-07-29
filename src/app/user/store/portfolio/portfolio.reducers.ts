import { IAudio, IVideo, IImage, IGeneralMedia } from 'src/app/interfaces';
import * as PortfolioActions from './portfolio.actions';

export interface State {
  audios: IAudio[];
  vidoes: IVideo[];
  images: IImage[];
  items: IGeneralMedia[];
  audio: IAudio;
  video: IVideo;
  image: IImage;
  item: IGeneralMedia;
}

const initialState: State = {
  audios: [],
  vidoes: [],
  images: [],
  items: [],
  audio: null,
  video: null,
  image: null,
  item: null
};

export function portfolioReducer(
  state = initialState,
  action: PortfolioActions.PortfolioActions
) {
  switch (action.type) {
    case PortfolioActions.SET_PORTFOLIO_AUDIOS:
      return {
        ...state,
        audios: [...state.audios, ...action.payload]
      };
    case PortfolioActions.SET_PORTFOLIO_VIDEOS:
      return {
        ...state,
        vidoes: [...state.vidoes, ...action.payload]
      };
    case PortfolioActions.SET_PORTFOLIO_IMAGES:
      return {
        ...state,
        images: [...state.images, ...action.payload]
      };
    case PortfolioActions.SET_PORTFOLIO_GENERALS:
      return {
        ...state,
        items: [...state.items, ...action.payload]
      };
    case PortfolioActions.SET_PORTFOLIO_AUDIO:
      return {
        ...state,
        audio: Object.assign(state.audio, action.payload)
      };
    case PortfolioActions.SET_PORTFOLIO_VIDEO:
      return {
        ...state,
        video: Object.assign(state.video, action.payload)
      };
    case PortfolioActions.SET_PORTFOLIO_IMAGE:
      return {
        ...state,
        image: Object.assign(state.image, action.payload)
      };
    case PortfolioActions.SET_PORTFOLIO_GENERAL:
      return {
        ...state,
        item: Object.assign(state.image, action.payload)
      };
    default:
      return state;
  }
}
