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
export class PortfolioBrowseComponent extends AbstractUploadComponent
  implements OnChanges {
  fileConfig: IFileInputModel;
  @Input() multiple = false;
  @Input() accept = "";
  isMultiple: boolean;
  mediaAccept: string;
  uploadOperation = UPLOADOPERATIONS.Portfolio;
  uploadedItems: UploadedItems;
  canSetUploadedImage: boolean;

  constructor(public store: Store<fromApp.AppState>) {
    super();
    this.canSetUploadedImage = false;
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges["multiple"]) {
      this.isMultiple = this.multiple;
    }
    if (simpleChanges["accept"]) {
      this.mediaAccept = this.accept;
    }
  }
  setUploadedImage(): void {}

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
    };
    console.log(this.fileConfig);
  }
}
