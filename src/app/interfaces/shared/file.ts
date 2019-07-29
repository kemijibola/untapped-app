export enum UPLOADOPERATIONS {
  UploadProfileImage = 'UploadProfileImage',
  UploadPortfolio = 'UploadPortfolio',
  UploadEntry = 'UploadEntry',
  Default = 'Default'
}

export interface IFileUploadModel {
  inProgress?: boolean;
  progress?: number;
  canRetry?: boolean;
  canCancel?: boolean;
}

export interface IFileModel extends IFileUploadModel {
  files: File[];
  action: string;
}

export interface IPresignFileModel {
  action: string;
  files: IFileMetaData[];
}

export interface IFileInputModel {
  state: boolean;
  process: string;
  multiple: boolean;
  accept: string;
}
export interface IFileMetaData {
  file: string;
  file_type: string;
}

export interface IUploadedFiles {
  uploadUrls: string[];
  action: UPLOADOPERATIONS;
}
