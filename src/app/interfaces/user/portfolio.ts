import { IUser } from '../account/user';

export interface PortfolioQueryParams {
  user?: string;
  type: MediaType;
  upload: MediaUploadType;
}

export enum MediaType {
  VIDEOS = 'VIDEOS',
  AUDIOS = 'AUDIOS',
  IMAGES = 'IMAGES'
}
export enum MediaUploadType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE'
}

export interface IMedia {
  title: string;
  shortDescription: string;
  user: IUser['_id'];
  items: IMediaItem[];
  uploadType: MediaUploadType;
}

export interface IGeneralMedia {
  title: string;
  shortDescription: string;
  user: IUser['_id'];
  item: IMediaItem;
  uploadType: MediaUploadType;
}

interface IMediaItem {
  path: string;
  likes: string[];
}

export interface IPortfolio {
  audios: IAudio[];
  videos: IVideo[];
  images: IImage[];
  general: IGeneralMedia[];
}

// tslint:disable-next-line:no-empty-interface
export interface IAudio extends IMedia {}
// tslint:disable-next-line:no-empty-interface
export interface IVideo extends IMedia {}
// tslint:disable-next-line:no-empty-interface
export interface IImage extends IMedia {}
