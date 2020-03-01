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
  UploadedItems
} from "src/app/interfaces";
import {
  selectUserImageList,
  selectUserVideoPreviewList,
  selectUserImagePreviewList,
  selectMedia
} from "../../store/portfolio/portfolio.selectors";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import {
  ModalDisplay,
  ModalViewModel,
  ModalContent,
  IModal,
  AppModal
} from "src/app/interfaces/shared/modal";
import { selectModals } from "src/app/shared/store/modals/modals.selectors";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";

@Component({
  selector: "app-portfolio-images",
  templateUrl: "./portfolio-images.component.html",
  styleUrls: ["./portfolio-images.component.css"]
})
export class PortfolioImagesComponent extends AbstractModalComponent
  implements OnInit {
  userImagePreviews: ImagePreview[] = [];
  userImagesLength = 0;
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 320,
        height: 168,
        fit: ImageFit.fill
      },
      grayscale: false
    }
  };
  modal: AppModal;
  modalToActivate: IModal;
  data: IMedia;
  uploadedItems: UploadedItems;
  viewMode: ModalViewModel = ModalViewModel.none;

  constructor(
    private userStore: Store<fromUser.UserState>,
    public store: Store<fromApp.AppState>
  ) {
    super();
    // current component modal by component name
    this.modal = {
      component: "portfolio",
      modals: [
        {
          index: 0,
          name: "gigs-modal",
          display: ModalDisplay.none
        }
      ]
    };
  }

  ngOnInit() {
    this.userStore
      .pipe(select(selectUserImagePreviewList))
      .subscribe((val: ImagePreview[]) => {
        console.log(val);
        this.userImagePreviews = val;
        this.userImagesLength = val.length;
        if (val.length > 0) {
          this.setAlbumCovers();
        }
      });
  }

  setAlbumCovers() {
    this.userImagePreviews.map(x => {
      x.albumCover = fetchImageObjectFromCloudFormation(
        x.defaultMediaPath,
        this.editParams
      );
    });
  }

  openModalDialog(modalId: string, itemId: string) {
    this.modalToActivate = this.modal.modals.filter(x => x.name === modalId)[0];
    this.modalToActivate.display = ModalDisplay.block;
    this.modalToActivate.viewMode = ModalViewModel.edit;
    // use id of clicked Item to fetch
    this.fetchImage(itemId);

    this.modalToActivate.data = this.uploadedItems;

    this.modalToActivate.data = this.store.dispatch(
      new ModalsActions.ToggleModal({
        component: this.modal.component,
        modal: this.modalToActivate
      })
    );
  }

  fetchImage(mediaId: string): void {
    const queryParams: MediaQueryParams = {
      id: mediaId
    };
    this.userStore.dispatch(new PortfolioActions.FetchMediaById(queryParams));
  }

  closeModalDialog(modalId: string) {
    // set activeModal to null
    // this.store.dispatch(new ModalsActions.ResetCurrentModal());

    this.modalToActivate = this.modal.modals.filter(x => x.name === modalId)[0];
    this.modalToActivate.display = ModalDisplay.none;
    this.modalToActivate.data = null;
    this.store.dispatch(
      new ModalsActions.ToggleModal({
        component: this.modal.component,
        modal: this.modalToActivate
      })
    );
  }
}
