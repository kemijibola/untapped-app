import { IUser } from '../account/user';
import { MediaAcceptType } from '..';

export interface PortfolioUploadInputConfig {
  isMultiple: boolean;
  mediaAccept: string;
}

export interface PortfolioQueryParams {
  user: string;
  type: MediaType;
  upload: MediaUploadType;
}

export enum MediaType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  IMAGE = 'IMAGE'
}

export enum PortfolioOperationType {
  EDIT = 'EDIT',
  NEW = 'NEW',
  DEFAULT = 'DEFAULT'
}

export enum MediaUploadType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  ALL = 'ALL',
  NONE = 'NONE'
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

export interface UploadedPortfolioItems {
  mediaType: MediaType;
  items: string[];
}

// tslint:disable-next-line:no-empty-interface
export interface IAudio extends IMedia {}
// tslint:disable-next-line:no-empty-interface
export interface IVideo extends IMedia {}
// tslint:disable-next-line:no-empty-interface
export interface IImage extends IMedia {}
