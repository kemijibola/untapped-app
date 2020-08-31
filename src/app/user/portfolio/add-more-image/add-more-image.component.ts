import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  IFileInputModel,
  UPLOADCOMPONENT,
  UPLOADACTION,
  IFileMetaData,
  IPresignRequest,
  UploadedItems,
  MediaType,
  CloudUploadParams,
  IMediaItem,
  IFileModel,
  SignedUrl,
  IMedia,
  ModalDisplay,
  ModalViewModel,
  IModal,
  AppModal,
  MediaUploadType,
} from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromUpload from "../../../shared/store/upload/upload.reducers";
import { AcceptedMedias } from "src/app/interfaces/media/image";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import * as fromUser from "../../user.reducers";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as fromModal from "../../../shared/store/modals/modals.reducers";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";

@Component({
  selector: "app-add-more-image",
  templateUrl: "./add-more-image.component.html",
  styleUrls: ["./add-more-image.component.css"],
})
export class AddMoreImageComponent implements OnInit {
  @Input() imageAlbumId: string = "";
  uploadComponent = UPLOADCOMPONENT.portfolio;
  uploadAction = UPLOADACTION.updateimagealbum;
  private filesToUpload: File[];
  private file: IPresignRequest;
  uploadedItems: UploadedItems;
  existingItem: IMedia;
  id = "";
  fileConfig: IFileInputModel;
  componentModal: AppModal;
  readyToUpload: boolean;

  constructor(
    public store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {}
  ngOnInit(): void {
    this.store
      .pipe(select(fromUpload.selectFilesToUpload))
      .take(2)
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

    this.userStore
      .pipe(select(fromPortfolio.selectSelectedMedia))
      .subscribe((val: IMedia) => {
        if (val) {
          this.existingItem = val;
        }
      });

    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = val;
        }
      });
  }

  onAddImageItem() {
    this.fileConfig = {
      state: true,
      type: "Image",
      component: this.uploadComponent,
      action: this.uploadAction,
      multiple: true,
      accept: "image/*",
      minHeight: 199,
      minWidth: 299,
    };
  }

  uploadFiles(files: File[]): void {
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        if (val !== null) {
          if (val.component === this.uploadComponent) {
            this.uploadedItems = {
              type: MediaType.ALL,
              uploadType: MediaUploadType.single,
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
          }

          if (this.uploadedItems.items.length > 0) {
            this.userStore.dispatch(
              new PortfolioActions.PatchMediaById({
                mediaId: this.imageAlbumId,
                updateItem: this.uploadedItems,
              })
            );

            // this.closeModalDialog();
          }
        }
      });
  }

  closeModalDialog() {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === "gigs-modal"
      )[0];
      const modalToClose: IModal = {
        index: modalToDeActivate.index,
        name: modalToDeActivate.name,
        display: ModalDisplay.none,
        viewMode: ModalViewModel.none,
        contentType: "",
        data: null,
        modalCss: "",
        modalDialogCss: "",
        modalContentCss: "",
        showMagnifier: false,
      };
      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToClose,
        })
      );
    }
  }
}
