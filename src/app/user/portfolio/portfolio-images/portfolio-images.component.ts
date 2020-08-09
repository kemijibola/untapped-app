import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../user.reducers";
import * as fromApp from "../../../store/app.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import { Observable } from "rxjs";
import {
  IImage,
  IMedia,
  MediaPreview,
  ImagePreview,
  MediaQueryParams,
  UploadedItems,
  SnackBarData,
} from "src/app/interfaces";
import {
  fetchImageObjectFromCloudFormation,
  fetchNoMediaDefaultImage,
} from "src/app/lib/Helper";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import {
  ModalDisplay,
  ModalViewModel,
  ModalContent,
  IModal,
  AppModal,
} from "src/app/interfaces/shared/modal";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import * as fromMediaPreview from "../../store/portfolio/media/media-preview.reducers";
import * as MediaPreviewActions from "../../store/portfolio/media/media-preview.actions";
import * as fromModal from "../../../shared/store/modals/modals.reducers";
import * as SnackBarActions from "../../../shared/notifications/snackbar/snackbar.action";

@Component({
  selector: "app-portfolio-images",
  templateUrl: "./portfolio-images.component.html",
  styleUrls: ["./portfolio-images.component.css"],
})
export class PortfolioImagesComponent implements OnInit {
  userImagePreviews: ImagePreview[] = [];
  userImagesLength = 0;
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 320,
        height: 168,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  defaultParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 30,
        height: 30,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  componentModal: AppModal;
  data: IMedia;
  uploadedItems: UploadedItems;
  viewMode: ModalViewModel = ModalViewModel.none;

  constructor(
    private userStore: Store<fromUser.UserState>,
    public store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = val;
        }
      });

    this.userStore
      .pipe(select(fromMediaPreview.selectUserImagePreviews))
      .subscribe((val: ImagePreview[]) => {
        this.userImagePreviews = val;
        this.userImagesLength = val.length;
        if (val.length > 0) {
          this.setAlbumCovers();
        }
      });

    // this.userStore
    //   .pipe(select(selectImageDeleteSuccess))
    //   .subscribe((deleted: boolean) => {
    //     if (deleted) {
    //       this.userImagePreviews = this.userImagePreviews.filter(
    //         (item) => item._id !== this.mediaIdToDelete
    //       );

    //       console.log(this.userImagePreviews);

    //       this.userStore.dispatch(
    //         new PortfolioActions.ResetDeleteImageByIdSucess()
    //       );
    //       // TODO:: show snackback for success delete
    //     }
    //   });
  }

  onDelete(id: string) {
    this.userStore.dispatch(
      new MediaPreviewActions.DeleteImageListById({ imageId: id })
    );
  }

  setAlbumCovers() {
    this.userImagePreviews = this.userImagePreviews.map((x) => {
      return Object.assign({}, x, {
        defaultAlbumCover: fetchImageObjectFromCloudFormation(
          x.defaultMediaPath,
          this.defaultParams
        ),
        albumCover:
          x.defaultMediaPath !== ""
            ? fetchImageObjectFromCloudFormation(
                x.defaultMediaPath,
                this.editParams
              )
            : fetchNoMediaDefaultImage(),
      });
    });
  }

  openModalDialog(modalId: string, itemId: string) {
    this.store.dispatch(
      new ModalsActions.FetchAppModal({ appModalId: "portfolio" })
    );

    if (this.componentModal) {
      const modalToActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      const modalToOpen: IModal = {
        index: modalToActivate.index,
        name: modalToActivate.name,
        display: ModalDisplay.table,
        viewMode: ModalViewModel.edit,
        contentType: modalToActivate.contentType,
        data: modalToActivate.data,
        modalCss: "modal aligned-modal",
        modalDialogCss: "modal-dialog",
        modalContentCss: "modal-content contest-d",
        showMagnifier: false,
      };
      this.fetchImage(itemId);

      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToOpen,
        })
      );
    }
  }

  fetchImage(imageId: string): void {
    this.userStore.dispatch(
      new PortfolioActions.FetchMediaById({ mediaId: imageId })
    );
  }

  closeModalDialog(modalId: string) {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
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
