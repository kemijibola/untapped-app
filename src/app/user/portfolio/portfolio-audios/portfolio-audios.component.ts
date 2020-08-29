import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  IAudio,
  AppModal,
  IMedia,
  ModalDisplay,
  AudioPreview,
  IModal,
  MediaQueryParams,
  ModalViewModel,
} from "src/app/interfaces";
import * as fromApp from "../../../store/app.reducers";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import * as fromModal from "../../../shared/store/modals/modals.reducers";
import * as fromUser from "../../user.reducers";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import { fetchAudioArt } from "src/app/lib/Helper";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as fromMediaPreview from "../../store/portfolio/media/media-preview.reducers";
import * as MediaPreviewActions from "../../store/portfolio/media/media-preview.actions";

@Component({
  selector: "app-portfolio-audios",
  templateUrl: "./portfolio-audios.component.html",
  styleUrls: ["./portfolio-audios.component.css"],
})
export class PortfolioAudiosComponent {
  userAudioPreviews: AudioPreview[] = [];
  userAudiosLength = 0;
  componentModal: AppModal;
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
      .pipe(select(fromMediaPreview.selectUserAudioPreviews))
      .subscribe((val: AudioPreview[]) => {
        val.map((x) => {
          x = this.setAlbumCover(x);
          this.userAudioPreviews.push(x);
        });
      });
  }

  onDelete(id: string) {
    if (this.userAudioPreviews.length !== 0) {
      this.userAudioPreviews.length - 1;
    }
    this.userStore.dispatch(
      new MediaPreviewActions.DeleteAudioListById({ audioId: id })
    );
  }

  trackByFn(index: number, item: AudioPreview) {
    return item._id;
  }

  setAlbumCover(data: AudioPreview): AudioPreview {
    return Object.assign({}, data, { artCover: fetchAudioArt() });
  }

  fetchAudio(audioId: string): void {
    this.userStore.dispatch(
      new PortfolioActions.FetchMediaById({ mediaId: audioId })
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
        modalCss: "modal aligned-modal-small",
        modalDialogCss: "modal-dialog",
        modalContentCss: "modal-content contest-d",
        showMagnifier: false,
      };
      this.fetchAudio(itemId);

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
