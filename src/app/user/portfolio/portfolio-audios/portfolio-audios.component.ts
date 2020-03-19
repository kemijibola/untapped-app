import {
  selectUserAudioPreviewList,
  selectAudioDeleteSuccess
} from "./../../store/portfolio/portfolio.selectors";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import {
  IAudio,
  AppModal,
  IMedia,
  ModalDisplay,
  AudioPreview,
  IModal,
  MediaQueryParams,
  ModalViewModel
} from "src/app/interfaces";
import { selectUserAudioList } from "../../store/portfolio/portfolio.selectors";
import * as fromApp from "../../../store/app.reducers";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import * as fromUser from "../../user.reducers";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import { fetchAudioArt } from "src/app/lib/Helper";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";

@Component({
  selector: "app-portfolio-audios",
  templateUrl: "./portfolio-audios.component.html",
  styleUrls: ["./portfolio-audios.component.css"]
})
export class PortfolioAudiosComponent extends AbstractModalComponent {
  userId = "";
  userAudios: IAudio[] = [];
  userAudioPreviews: AudioPreview[] = [];
  userAudiosLength = 0;
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
          modalDialogCss: ""
        }
      ]
    };
  }

  ngOnInit() {
    this.userStore
      .pipe(select(selectUserAudioPreviewList))
      .subscribe((val: AudioPreview[]) => {
        this.userAudioPreviews = val;
        this.userAudiosLength = val.length;
        if (val.length > 0) {
          this.setAlbumCovers();
        }
      });

    this.userStore
      .pipe(select(selectAudioDeleteSuccess))
      .subscribe((deleted: boolean) => {
        if (deleted) {
          this.userAudioPreviews = this.userAudioPreviews.filter(
            item => item._id !== this.mediaIdToDelete
          );

          console.log(this.userAudioPreviews);

          this.userStore.dispatch(
            new PortfolioActions.ResetDeleteAudioByIdSucess()
          );
          // TODO:: show snackback for success delete
        }
      });
  }

  onDelete(id: string) {
    this.mediaIdToDelete = id;
    this.userStore.dispatch(new PortfolioActions.DeleteAudioById(id));
  }

  setAlbumCovers() {
    this.userAudioPreviews.map(x => {
      x.artCover = fetchAudioArt();
    });
  }

  fetchAudio(audioId: string): void {
    const queryParams: MediaQueryParams = {
      id: audioId
    };
    this.userStore.dispatch(new PortfolioActions.FetchMediaById(queryParams));
  }

  openModalDialog(modalId: string, itemId: string) {
    this.modalToActivate = this.modal.modals.filter(x => x.name === modalId)[0];
    this.modalToActivate.display = ModalDisplay.table;
    this.modalToActivate.viewMode = ModalViewModel.edit;
    this.modalToActivate.modalDialogCss = "modal-dialog";
    // use id of clicked Item to fetch
    this.fetchAudio(itemId);

    this.modalToActivate.data = this.store.dispatch(
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
