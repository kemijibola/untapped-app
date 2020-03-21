import { IUser } from "../account/user";
import { MediaAcceptType } from "..";

export interface AppPageState {
  componentName: string;
  mode: PageViewMode;
  mediaType: MediaType;
}

export enum PageViewMode {
  New = "New",
  Edit = "Edit",
  Null = "Null"
}
export interface PortfolioUploadInputConfig {
  isMultiple: boolean;
  mediaAccept: string;
}

export interface PortfolioQueryParams {
  id: string;
  type: MediaType;
  upload: MediaUploadType;
}

export interface MediaQueryParams {
  id?: string;
  type?: MediaType;
  uploadType?: MediaUploadType;
  user?: string;
}

export enum MediaType {
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  ALL = "ALL"
}

export enum PortfolioOperationType {
  EDIT = "EDIT",
  NEW = "NEW",
  DEFAULT = "DEFAULT"
}

export enum MediaUploadType {
  SINGLE = "SINGLE",
  MULTIPLE = "MULTIPLE",
  ALL = "ALL"
}

export interface IMediaItem {
  id?: string;
  key?: string;
  path: string;
  likedBy?: string[];
  uploadDate?: Date;
}

export interface IMedia {
  _id?: string;
  title: string;
  shortDescription: string;
  user: string;
  items: IMediaItem[];
  albumCover?: string;
  uploadType: MediaUploadType;
  mediaType: MediaType;
  isApproved: boolean;
  activityCount: number;
  isDeleted: boolean;
}
export interface IGeneralMedia {
  title: string;
  shortDescription: string;
  user: string;
  item: IMediaItem;
  uploadType: MediaUploadType;
}

export interface IPortfolio {
  audios: IAudio[];
  videos: IVideo[];
  images: IImage[];
  general: IGeneralMedia[];
}

export interface UploadedItems {
  _id?: string;
  type: MediaType;
  items: MediaItem[];
  title?: string;
  shortDescription?: string;
}

export interface MediaItem {
  _id?: string;
  key?: string;
  path: string;
  type?: string;
  likedBy?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface OtherMedia {
  _id: string;
  path: string;
  type: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IAudio extends IMedia {}
// tslint:disable-next-line:no-empty-interface
export interface IVideo extends IMedia {}
// tslint:disable-next-line:no-empty-interface
export interface IImage extends IMedia {}

export interface AudioPreview extends MediaPreview {
  artCover?: string;
}
export interface VideoPreview extends MediaPreview {
  albumCover?: string;
}
export interface ImagePreview extends MediaPreview {
  albumCover?: string;
}

export interface MediaPreview {
  _id: string;
  title: string;
  mediaType: string;
  uploadType: string;
  defaultMediaPath: string;
  shortDescription: string;
  activityCount: number;
}

export interface AudioPortfolioPreview extends TalentPortfolioPreview {}
export interface VideoPortfolioPreview extends TalentPortfolioPreview {}
export interface ImagePortfolioPreview extends TalentPortfolioPreview {}

export interface TalentPortfolioPreview {
  _id: string;
  mediaType: string;
  talent: string;
  uploadType: string;
  albumCover: string;
  defaultImageKey: string;
  mediaTitle: string;
  mediaDescription: string;
  items: IMediaItem[];
  itemsCount: number;
  dateCreated: Date;
}
