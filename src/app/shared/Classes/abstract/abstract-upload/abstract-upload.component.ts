import {
  IFileInputModel,
  IPresignRequest,
  IFileModel,
  UPLOADOPERATIONS,
  IFileMetaData
} from 'src/app/interfaces';
import { OnInit } from '@angular/core';
import * as fromApp from '../../../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { selectFilesToUpload } from '../../../../shared/store/upload/upload.selectors';
import * as UploadActions from '../../../../shared/store/upload/upload.actions';
import * as fromUploads from '../../../../shared/store/upload/upload.reducers';

export abstract class AbstractUploadComponent implements OnInit {
  private file: IPresignRequest;
  private filesToUpload: File[];
  abstract uploadOperation: UPLOADOPERATIONS;
  abstract store: Store<fromApp.AppState>;
  abstract fileConfig: IFileInputModel;
  abstract setUploadedImage(): void;
  abstract uploadFiles(files: File[]): void;

  ngOnInit() {
    this.setUploadedImage();

    this.store
      .pipe(select(selectFilesToUpload))
      .subscribe((val: IFileModel) => {
        if (val.files) {
          if (val.action === this.uploadOperation) {
            this.filesToUpload = val.files;
            const files: IFileMetaData[] = val.files.reduce(
              (arr: IFileMetaData[], file) => {
                const fileData = {
                  file: file['data'].name,
                  file_type: file['data'].type
                };
                arr = [...arr, fileData];
                return arr;
              },
              []
            );

            this.file = {
              action: val.action,
              files: [...files]
            };
            this.store.dispatch(new UploadActions.GetPresignedUrl(this.file));
            this.store.dispatch(new UploadActions.ResetFileInput());

            // perform actual upload to cloud
            if (this.filesToUpload.length > 0) {
              this.uploadFiles(this.filesToUpload);
            }
          }
        }
      });

    // this.store.select('upload').subscribe((val: fromUploads.State) => {
    //   if (val.file.files.length > 0) {
    //     for (let index = 0; index < val.file.files.length; index++) {
    //       const fileToUpload = val.file.files[index];
    //       console.log(fileToUpload['data']['name']);
    //     }
    //   }
    // });
  }
}
