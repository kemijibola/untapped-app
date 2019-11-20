import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input
} from "@angular/core";
import { AbstractUploadComponent } from "src/app/shared/Classes/abstract/abstract-upload/abstract-upload.component";
import {
  IFileInputModel,
  UPLOADOPERATIONS,
  PortfolioUploadInputConfig,
  SignedUrl,
  CloudUploadParams,
  UploadedPortfolioItems,
  MediaType
} from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { selectPresignedUrls } from "../../../shared/store/upload/upload.selectors";
import * as UploadActions from "../../../shared/store/upload/upload.actions";

@Component({
  selector: "app-portfolio-browse",
  templateUrl: "./portfolio-browse.component.html",
  styleUrls: ["./portfolio-browse.component.css"]
})
export class PortfolioBrowseComponent extends AbstractUploadComponent
  implements OnChanges {
  fileConfig: IFileInputModel;
  @Input() multiple = false;
  @Input() accept = "";
  isMultiple: boolean;
  mediaAccept: string;
  uploadOperation = UPLOADOPERATIONS.Portfolio;
  uploadedItems: UploadedPortfolioItems;

  constructor(public store: Store<fromApp.AppState>) {
    super();
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
    this.store.pipe(select(selectPresignedUrls)).subscribe((val: SignedUrl) => {
      if (val.action === this.uploadOperation) {
        this.uploadedItems = {
          mediaType: MediaType.AUDIO,
          items: []
        };
        for (let i = 0; i < files.length; i++) {
          const uploadParams: CloudUploadParams = {
            file: files[i]["data"],
            url: val.presignedUrl[i].url
          };

          this.store.dispatch(new UploadActions.UploadFiles(uploadParams));

          this.uploadedItems.items = [
            ...this.uploadedItems.items,
            val.presignedUrl[i].key
          ];
        }
      }
    });
  }

  onClickBrowseBtn() {
    this.fileConfig = {
      state: true,
      process: this.uploadOperation,
      multiple: this.isMultiple,
      accept: this.mediaAccept
    };
  }
}
