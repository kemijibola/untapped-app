import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromUser from "../../user.reducers";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import {
  IVideo,
  IMedia,
  VideoPreview,
  AppModal,
  IModal,
  ModalDisplay,
  MediaQueryParams,
  ModalViewModel,
} from "src/app/interfaces";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import {
  fetchVideoArt,
  fetchImageObjectFromCloudFormation,
} from "src/app/lib/Helper";
import * as fromApp from "../../../store/app.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import * as fromMediaPreview from "../../store/portfolio/media/media-preview.reducers";
import * as fromModal from "../../../shared/store/modals/modals.reducers";
import * as MediaPreviewActions from "../../store/portfolio/media/media-preview.actions";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";

@Component({
  selector: "app-portfolio-videos",
  templateUrl: "./portfolio-videos.component.html",
  styleUrls: ["./portfolio-videos.component.css"],
})
export class PortfolioVideosComponent {
  userVideos: IMedia[] = [];
  userVideoPreviews: VideoPreview[] = [];
  userVideosLength = 0;
  componentModal: AppModal;
  // modalToActivate: IModal;
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
  constructor(
    public store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {
    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = val;
        }
      });
  }

  ngOnInit() {
    this.userStore
      .pipe(select(fromMediaPreview.selectUserVideoPreviews))
      .subscribe((val: VideoPreview[]) => {
        val.map((x) => {
          x = this.setAlbumCover(x);
          this.userVideoPreviews.push(x);
        });
      });
  }

  onDelete(id: string) {
    if (this.userVideoPreviews.length !== 0) {
      this.userVideoPreviews.length - 1;
    }
    this.userStore.dispatch(
      new MediaPreviewActions.DeleteVideoListById({ videoId: id })
    );
  }

  trackByFn(index: number, item: VideoPreview) {
    return item._id;
  }

  setAlbumCover(data: VideoPreview): VideoPreview {
    return Object.assign({}, data, {
      defaultAlbumCover: fetchImageObjectFromCloudFormation(
        data.defaultMediaPath,
        this.defaultParams
      ),
      albumCover:
        data.defaultMediaPath !== ""
          ? fetchImageObjectFromCloudFormation(
              data.defaultMediaPath,
              this.editParams
            )
          : fetchVideoArt(),
    });
  }

  fetchVideo(videoId: string): void {
    this.userStore.dispatch(
      new PortfolioActions.FetchMediaById({ mediaId: videoId })
    );
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
        data: null,
        modalCss: "modal aligned-modal",
        modalDialogCss: "modal-dialog",
        modalContentCss: "modal-content contest-d",
        showMagnifier: false,
      };

      this.fetchVideo(itemId);

      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToOpen,
        })
      );
    }
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
