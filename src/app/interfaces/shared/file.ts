export enum UploadOperatons {
  PROFILEIMAGE = 'PROFILEIMAGE',
  GIGUPLOAD = 'GIGUPLOAD',
  CONTESTSUBMISSION = 'CONTESTSUBMISSION'
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
  action: UploadOperatons;
}
