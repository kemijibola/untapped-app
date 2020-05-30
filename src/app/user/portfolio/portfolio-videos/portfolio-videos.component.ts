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
import { fetchVideoArt } from "src/app/lib/Helper";
import * as fromApp from "../../../store/app.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import * as fromMediaPreview from "../../store/portfolio/media/media-preview.reducers";
import * as fromModal from "../../../shared/store/modals/modals.reducers";
import * as MediaPreviewActions from "../../store/portfolio/media/media-preview.actions";

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
  constructor(
    public store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {
    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = { ...val };
        }
      });
  }

  ngOnInit() {
    this.userStore
      .pipe(select(fromMediaPreview.selectUserVideoPreviews))
      .subscribe((val: VideoPreview[]) => {
        this.userVideoPreviews = val;
        this.userVideosLength = val.length;
        if (val.length > 0) {
          this.setAlbumCover();
        }
      });

    // this.userStore
    //   .pipe(select(selectVidthis[ieoDeleteSuccess))
    //   .subscribe((deleted: boolean) => {
    //     if (deleted) {
    //       this.userVideoPreviews = this.userVideoPreviews.filter(
    //         (item) => item._id !== this.mediaIdToDelete
    //       );

    //       console.log(this.userVideoPreviews);

    //       this.userStore.dispatch(
    //         new PortfolioActions.ResetDeleteVideoByIdSucess()
    //       );
    //       // TODO:: show snackback for success delete
    //     }
    //   });
  }

  onDelete(id: string) {
    if (this.userVideoPreviews.length !== 0) {
      this.userVideoPreviews.length - 1;
    }
    this.userStore.dispatch(
      new MediaPreviewActions.DeleteVideoListById({ videoId: id })
    );
  }

  setAlbumCover() {
    this.userVideoPreviews = this.userVideoPreviews.map((x) => {
      return Object.assign({}, x, { albumCover: fetchVideoArt() });
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
