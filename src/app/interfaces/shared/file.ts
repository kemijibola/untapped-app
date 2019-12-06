import { MediaType } from "../user/portfolio";

export enum UPLOADOPERATIONS {
  ProfileImage = "ProfileImage",
  Portfolio = "Portfolio",
  Entries = "Entries",
  ContestBanner = "ContestBanner",
  Default = "Default"
}

export enum MediaAcceptType {
  IMAGE = "image/*",
  VIDEO = "video/*",
  AUDIO = "audio/*"
}
export interface IFileUploadModel {
  inProgress?: boolean;
  progress?: number;
  canRetry?: boolean;
  canCancel?: boolean;
}

export interface IFileModel extends IFileUploadModel {
  files: File[];
  action: UPLOADOPERATIONS;
}

export interface IPresignRequest {
  typeOfFile: string;
  action: UPLOADOPERATIONS;
  files: IFileMetaData[];
}
export interface IFileInputModel {
  state: boolean;
  process: UPLOADOPERATIONS;
  multiple: boolean;
  accept: string;
}
export interface IFileMetaData {
  file: string;
  file_type: string;
}
export interface SignedUrl {
  action: UPLOADOPERATIONS;
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
}
