import { Action } from '@ngrx/store';
import {
  PortfolioQueryParams,
  IAudio,
  IVideo,
  IImage,
  IGeneralMedia
} from '../../../interfaces';

export const FETCH_PORTFOLIO_AUDIOS = 'FETCH_PORTFOLIO_AUDIOS';
export const FETCH_PORTFOLIO_VIDEOS = 'FETCH_PORTFOLIO_VIDEOS';
export const FETCH_PORTFOLIO_IMAGES = 'FETCH_PORTFOLIO_IMAGES';
export const FETCH_PORTFOLIO_GENERALS = 'FETCH_PORTFOLIO_GENERALS';
export const SET_PORTFOLIO_AUDIOS = 'SET_PORTFOLIO_AUDIOS';
export const SET_PORTFOLIO_VIDEOS = 'SET_PORTFOLIO_VIDEOS';
export const SET_PORTFOLIO_IMAGES = 'SET_PORTFOLIO_IMAGES';
export const SET_PORTFOLIO_GENERALS = 'SET_PORTFOLIO_GENERALS';

export const FETCH_PORTFOLIO_AUDIO = 'FETCH_PORTFOLIO_AUDIO';
export const FETCH_PORTFOLIO_VIDEO = 'FETCH_PORTFOLIO_VIDEO';
export const FETCH_PORTFOLIO_IMAGE = 'FETCH_PORTFOLIO_IMAGE';
export const FETCH_PORTFOLIO_GENERAL = 'FETCH_PORTFOLIO_GENERAL';
export const SET_PORTFOLIO_AUDIO = 'SET_PORTFOLIO_AUDIO';
export const SET_PORTFOLIO_VIDEO = 'SET_PORTFOLIO_VIDEO';
export const SET_PORTFOLIO_IMAGE = 'SET_PORTFOLIO_IMAGE';
export const SET_PORTFOLIO_GENERAL = 'SET_PORTFOLIO_GENERAL';

export class FetchPortfolioAudios implements Action {
  readonly type = FETCH_PORTFOLIO_AUDIOS;
  constructor(public payload: PortfolioQueryParams) {}
}

export class FetchPortfolioVideos implements Action {
  readonly type = FETCH_PORTFOLIO_VIDEOS;
  constructor(public payload: PortfolioQueryParams) {}
}

export class FetchPortfolioImages implements Action {
  readonly type = FETCH_PORTFOLIO_IMAGES;
  constructor(public payload: PortfolioQueryParams) {}
}

export class FetchPortfolioGenerals implements Action {
  readonly type = FETCH_PORTFOLIO_GENERALS;
  constructor(public payload: PortfolioQueryParams) {}
}

export class SetPortfolioAudios implements Action {
  readonly type = SET_PORTFOLIO_AUDIOS;
  constructor(public payload: IAudio[]) {}
}

export class SetPortfolioVideos implements Action {
  readonly type = SET_PORTFOLIO_VIDEOS;
  constructor(public payload: IVideo[]) {}
}

export class SetPortfolioImages implements Action {
  readonly type = SET_PORTFOLIO_IMAGES;
  constructor(public payload: IImage[]) {}
}

export class SetPortfolioGenerals implements Action {
  readonly type = SET_PORTFOLIO_GENERALS;
  constructor(public payload: IGeneralMedia[]) {}
}

export class FetchPortfolioAudio implements Action {
  readonly type = FETCH_PORTFOLIO_AUDIO;
  // fetch portfolio audio by audio item id
  constructor(public payload: string) {}
}

export class FetchPortfolioVideo implements Action {
  readonly type = FETCH_PORTFOLIO_VIDEO;
  constructor(public payload: string) {}
}

export class FetchPortfolioImage implements Action {
  readonly type = FETCH_PORTFOLIO_IMAGE;
  constructor(public payload: string) {}
}

export class FetchPortfolioGeneral implements Action {
  readonly type = FETCH_PORTFOLIO_GENERAL;
  constructor(public payload: string) {}
}

export class SetPortfolioAudio implements Action {
  readonly type = SET_PORTFOLIO_AUDIO;
  constructor(public payload: IAudio) {}
}

export class SetPortfolioVideo implements Action {
  readonly type = SET_PORTFOLIO_VIDEO;
  constructor(public payload: IVideo) {}
}

export class SetPortfolioImage implements Action {
  readonly type = SET_PORTFOLIO_IMAGE;
  constructor(public payload: IImage) {}
}

export class SetPortfolioGeneral implements Action {
  readonly type = SET_PORTFOLIO_GENERAL;
  constructor(public payload: IGeneralMedia) {}
}

export type PortfolioActions =
  | FetchPortfolioAudios
  | FetchPortfolioVideos
  | FetchPortfolioImages
  | FetchPortfolioGenerals
  | SetPortfolioAudios
  | SetPortfolioVideos
  | SetPortfolioImages
  | SetPortfolioGenerals
  | FetchPortfolioAudio
  | FetchPortfolioVideo
  | FetchPortfolioImage
  | FetchPortfolioGeneral
  | SetPortfolioAudio
  | SetPortfolioVideo
  | SetPortfolioImage
  | SetPortfolioGeneral;
