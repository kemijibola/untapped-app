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
  ModalViewModel
} from "src/app/interfaces";
import {
  selectUserVideoList,
  selectUserVideoPreviewList,
  selectVideoDeleteSuccess
} from "../../store/portfolio/portfolio.selectors";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import { fetchVideoArt } from "src/app/lib/Helper";
import * as fromApp from "../../../store/app.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";

@Component({
  selector: "app-portfolio-videos",
  templateUrl: "./portfolio-videos.component.html",
  styleUrls: ["./portfolio-videos.component.css"]
})
export class PortfolioVideosComponent extends AbstractModalComponent {
  userVideos: IMedia[] = [];
  userVideoPreviews: VideoPreview[] = [];
  userVideosLength = 0;
  modal: AppModal;
  modalToActivate: IModal;
  mediaIdToDelete: string;
  constructor(
    public store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {
    super();
    this.modal = {
      component: "portfolio",
      modals: [
        {
          index: 0,
          name: "gigs-modal",
          display: ModalDisplay.none,
          modalCss: "modal",
          modalDialogCss: "",
          showMagnifier: false
        }
      ]
    };
  }

  ngOnInit() {
    this.userStore
      .pipe(select(selectUserVideoPreviewList))
      .subscribe((val: VideoPreview[]) => {
        this.userVideoPreviews = val;
        this.userVideosLength = val.length;
        if (val.length > 0) {
          this.setAlbumCover();
        }
      });

    this.userStore
      .pipe(select(selectVideoDeleteSuccess))
      .subscribe((deleted: boolean) => {
        if (deleted) {
          this.userVideoPreviews = this.userVideoPreviews.filter(
            item => item._id !== this.mediaIdToDelete
          );

          console.log(this.userVideoPreviews);

          this.userStore.dispatch(
            new PortfolioActions.ResetDeleteVideoByIdSucess()
          );
          // TODO:: show snackback for success delete
        }
      });
  }

  onDelete(id: string) {
    this.mediaIdToDelete = id;
    this.userStore.dispatch(new PortfolioActions.DeleteVideoById(id));
  }

  setAlbumCover() {
    this.userVideoPreviews.map(x => {
      x.albumCover = fetchVideoArt();
    });
  }

  fetchVideo(videoId: string): void {
    const queryParams: MediaQueryParams = {
      id: videoId
    };
    this.userStore.dispatch(new PortfolioActions.FetchMediaById(queryParams));
  }
  openModalDialog(modalId: string, itemId: string) {
    this.modalToActivate = this.modal.modals.filter(x => x.name === modalId)[0];
    this.modalToActivate.display = ModalDisplay.table;
    this.modalToActivate.viewMode = ModalViewModel.edit;
    this.modalToActivate.modalCss = "modal aligned-modal";
    this.modalToActivate.modalDialogCss = "modal-dialog";
    this.fetchVideo(itemId);
    this.store.dispatch(
      new ModalsActions.ToggleModal({
        component: this.modal.component,
        modal: this.modalToActivate
      })
    );
  }

  closeModalDialog(modalId: string) {
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
