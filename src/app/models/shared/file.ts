export class FileUploadModel {
    inProgress?: boolean;
    progress?: number;
    canRetry?: boolean;
    canCancel?: boolean;
}

export class FileModel extends FileUploadModel {
    files: File[];
    action: string;
}

export class PresignFileModel {
    action: string;
    files: FileMetaData[];
}

export class FileInputModel {
    state: boolean;
    process: string;
    multiple: boolean;
    accept: string;
}
export class FileMetaData {
    file: string;
    file_type: string;
}
