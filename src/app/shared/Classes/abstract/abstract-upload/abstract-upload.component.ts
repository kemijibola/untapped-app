import {
  IFileInputModel,
  IPresignRequest,
  IFileModel,
  UPLOADOPERATIONS,
  IFileMetaData,
  MediaType,
} from "src/app/interfaces";
import { OnInit } from "@angular/core";
import * as fromApp from "../../../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import * as fromUpload from "../../../../shared/store/upload/upload.reducers";
import * as UploadActions from "../../../../shared/store/upload/upload.actions";

export abstract class AbstractUploadComponent implements OnInit {
  private file: IPresignRequest;
  private filesToUpload: File[];
  abstract uploadOperation: UPLOADOPERATIONS;
  abstract store: Store<fromApp.AppState>;
  abstract fileConfig: IFileInputModel = {
    state: false,
    process: UPLOADOPERATIONS.Default,
    multiple: false,
    accept: "",
  };
  abstract setUploadedImage(): void;
  abstract uploadFiles(files: File[]): void;

  ngOnInit() {
    this.setUploadedImage();

    this.store
      .pipe(select(fromUpload.selectFilesToUpload))
      .subscribe((val: IFileModel) => {
        if (val !== null) {
          if (val.action === this.uploadOperation) {
            this.filesToUpload = val.files;
            const files: IFileMetaData[] = val.files.reduce(
              (arr: IFileMetaData[], file) => {
                const fileData = {
                  file: file["data"].name,
                  file_type: file["data"].type,
                };
                arr = [...arr, fileData];
                return arr;
              },
              []
            );

            var fileType = files[0].file_type.split("/");
            this.file = {
              mediaType: fileType[0],
              action: val.action,
              files: [...files],
            };
            if (this.fileConfig.state) {
              this.store.dispatch(
                new UploadActions.GetPresignedUrl({ preSignRequest: this.file })
              );
            }

            this.store.dispatch(new UploadActions.ResetFileInput());

            // perform actual upload to cloud
            if (this.filesToUpload.length > 0) {
              this.uploadFiles(this.filesToUpload);
            }
          }
        }
      });
  }
}
