import { MediaType } from "../user/portfolio";

export enum UPLOADCOMPONENT {
  profileimage = "profileimage",
  portfolio = "portfolio",
  contestentry = "contestentry",
  contestbanner = "contestbanner",
  bannerimage = "bannerimage",
  thumbnail = "thumbnail",
  default = "default",
}

export enum UPLOADACTION {
  updateimagealbum = "updateimagealbum",
  updateaudioalbum = "updateaudioalbum",
  updatevideoalbum = "updatevideoalbum",
  createportfolio = "createportfolio",
  updateprofilepicture = "updateprofilepicture",
  uploadcontestbanner = "addcontestbanner",
  uploadcontestentry = "uploadcontestentry",
  updatebannerimage = "updatebannerimage",
  uploadthumbnail = "uploadthumbnail",
  default = "default",
}

export enum MediaAcceptType {
  IMAGE = "image/*",
  VIDEO = "video/*",
  AUDIO = "audio/*",
}
export interface IFileUploadModel {
  inProgress?: boolean;
  progress?: number;
  canRetry?: boolean;
  canCancel?: boolean;
}

export interface IFileModel extends IFileUploadModel {
  files: File[];
  action: UPLOADACTION;
}

export interface IPresignRequest {
  mediaType: string;
  component: UPLOADCOMPONENT;
  files: IFileMetaData[];
}
export interface IFileInputModel {
  state: boolean;
  component: UPLOADCOMPONENT;
  action: UPLOADACTION;
  multiple: boolean;
  accept: string;
  minHeight?: number;
  minWidth?: number;
}
export interface IFileMetaData {
  file: string;
  file_type: string;
}
export interface SignedUrl {
  component: UPLOADCOMPONENT;
  presignedUrl: PresignedUrl[];
}

export interface PresignedUrl {
  file: string;
  url: string;
  key: string;
}

export interface IUploadedFiles {
  uploadUrls: PresignedUrl[];
}

export interface CloudUploadParams {
  file: File;
  url: string;
  key?: string;
}

export enum UploadStatus {
  Ready = "Ready",
  Requested = "Requested",
  Started = "Started",
  Failed = "Failed",
  Completed = "Completed",
  Cancelled = "Cancelled",
}
