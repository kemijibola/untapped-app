import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from "@angular/core";
import { AbstractUploadComponent } from "src/app/shared/Classes/abstract/abstract-upload/abstract-upload.component";
import {
  IFileInputModel,
  UPLOADOPERATIONS,
  PortfolioUploadInputConfig,
  SignedUrl,
  CloudUploadParams,
  UploadedItems,
  MediaType,
  IMedia,
  IMediaItem,
  IPresignRequest,
  IFileModel,
  IFileMetaData,
} from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromUpload from "../../../shared/store/upload/upload.reducers";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import {
  AcceptedMedias,
  ImageFit,
  ImageEditRequest,
} from "src/app/interfaces/media/image";

@Component({
  selector: "app-portfolio-browse",
  templateUrl: "./portfolio-browse.component.html",
  styleUrls: ["./portfolio-browse.component.css"],
})
export class PortfolioBrowseComponent implements OnInit, OnChanges {
  private filesToUpload: File[];
  private file: IPresignRequest;
  fileConfig: IFileInputModel;
  @Input() multiple = false;
  @Input() accept = "";
  isMultiple: boolean;
  mediaAccept: string;
  uploadOperation = UPLOADOPERATIONS.Portfolio;
  uploadedItems: UploadedItems;
  canSetUploadedImage: boolean;

  constructor(public store: Store<fromApp.AppState>) {
    this.canSetUploadedImage = false;
  }

  ngOnInit() {
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
  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges["multiple"]) {
      this.isMultiple = this.multiple;
    }
    if (simpleChanges["accept"]) {
      this.mediaAccept = this.accept;
    }
  }

  uploadFiles(files: File[]): void {
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        console.log(val);
        if (val !== null) {
          if (val.action === this.uploadOperation) {
            this.uploadedItems = {
              type: MediaType.AUDIO,
              items: [],
            };
            for (let i = 0; i < files.length; i++) {
              const item: CloudUploadParams = {
                file: files[i]["data"],
                url: val.presignedUrl[i].url,
              };
              uploadParams = [...uploadParams, item];

              const mediaItem: IMediaItem = {
                path: val.presignedUrl[i].key,
              };
              this.uploadedItems.items = [
                ...this.uploadedItems.items,
                mediaItem,
              ];
            }
            this.store.dispatch(new UploadActions.UploadFiles(uploadParams));

            const uploadExtension = this.uploadedItems.items[0].path
              .split(".")
              .pop();
            this.uploadedItems.type = AcceptedMedias[uploadExtension];

            this.store.dispatch(
              new UploadActions.SetUploadedItems({
                uploadedItems: this.uploadedItems,
              })
            );
          }
        }
      });
  }

  onClickBrowseBtn() {
    this.fileConfig = {
      state: true,
      process: this.uploadOperation,
      multiple: this.isMultiple,
      accept: this.mediaAccept,
      minHeight: 199,
      minWidth: 299,
    };
  }
}
