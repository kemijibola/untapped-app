import { UPLOADACTION } from "./../../../interfaces/shared/file";
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
  UPLOADCOMPONENT,
  MediaUploadType,
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
  uploadComponent = UPLOADCOMPONENT.portfolio;
  uploadAction = UPLOADACTION.createportfolio;
  uploadedItems: UploadedItems;
  canSetUploadedImage: boolean;
  showUpload: boolean = true;

  constructor(public store: Store<fromApp.AppState>) {
    this.canSetUploadedImage = false;
    this.store
      .select(fromUpload.selectMediaThumbnailFile)
      .subscribe((val: IFileModel) => {
        if (val !== null) {
          const file: IPresignRequest = {
            mediaType: "image",
            component: UPLOADCOMPONENT.thumbnail,
            files: [
              ...[
                {
                  file: val.files[0].name,
                  file_type: val.files[0].type,
                },
              ],
            ],
          };
          this.store.dispatch(
            new UploadActions.GetThumbnailPresignedUrl({
              preSignRequest: file,
            })
          );

          this.store
            .pipe(select(fromUpload.selectThumbnailPresignedUrl))
            .subscribe((signedUrl: SignedUrl) => {
              if (signedUrl !== null) {
                const item: CloudUploadParams = {
                  file: val.files[0],
                  url: signedUrl.presignedUrl[0].url,
                  key: signedUrl.presignedUrl[0].key,
                };
                this.store.dispatch(new UploadActions.UploadThumbnail([item]));
              }
            });
        }
      });
  }

  ngOnInit() {
    this.store
      .pipe(select(fromUpload.selectCurrentUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.showUpload = false;
        }
      });

    this.store
      .pipe(select(fromUpload.selectFilesToUpload))
      .subscribe((val: IFileModel) => {
        if (val !== null) {
          if (val.action === this.uploadAction) {
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
              component: UPLOADCOMPONENT.portfolio,
              files: [...files],
            };

            this.store.dispatch(
              new UploadActions.GetPresignedUrl({ preSignRequest: this.file })
            );

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
    const uploadType: string = this.isMultiple ? "single" : "multiple";
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        if (val !== null) {
          if (val.component === this.uploadComponent) {
            this.uploadedItems = {
              type: MediaType.AUDIO,
              uploadType: MediaUploadType[uploadType],
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
    this.store.dispatch(new UploadActions.ResetFileInput());
    this.fileConfig = {
      state: true,
      component: this.uploadComponent,
      action: this.uploadAction,
      multiple: this.isMultiple,
      accept: this.mediaAccept,
      minHeight: 199,
      minWidth: 299,
    };
  }
}
