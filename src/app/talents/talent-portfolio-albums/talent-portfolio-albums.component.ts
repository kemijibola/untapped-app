import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as fromModals from "../../shared/store/modals/modals.reducers";
import * as fromApp from "../../store/app.reducers";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import {
  AppModal,
  IModal,
  ImagePortfolioPreview,
  ModalDisplay,
  ModalViewModel,
  AudioPortfolioPreview,
  VideoPortfolioPreview,
  TalentPortfolioPreview,
} from "src/app/interfaces";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import {
  fetchImageObjectFromCloudFormation,
  fetchAudioArt,
  fetchVideoArt,
  fetchNoMediaDefaultImage,
} from "src/app/lib/Helper";
import * as fromModal from "../../shared/store/modals/modals.reducers";
import * as fromTalentAudioPortfolio from "src/app/shared/store/talents/audio-preview/audio-preview.reducer";
import * as fromTalentImagePortfolio from "src/app/shared/store/talents/image-preview/image-preview.reducer";
import * as fromTalentVideoPortfolio from "src/app/shared/store/talents/video-preview/video-preview.reducer";

@Component({
  selector: "app-talent-portfolio-albums",
  templateUrl: "./talent-portfolio-albums.component.html",
  styleUrls: ["./talent-portfolio-albums.component.css"],
})
export class TalentPortfolioAlbumsComponent {
  appModal: AppModal;
  componentModal: AppModal;
  imageAlbumCount = 0;
  audioAlbumCount = 0;
  videoAlbumCount = 0;
  imageAlbums: ImagePortfolioPreview[] = [];
  audioAlbums: AudioPortfolioPreview[] = [];
  videoAlbums: VideoPortfolioPreview[] = [];
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 418.66,
        height: 225.13,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  currentIndex = -1;
  selectedMedia: TalentPortfolioPreview;
  leftDisabled = false;
  rightDisabled = false;
  showModal: boolean = true;
  constructor(public store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.fetchTalentImages();
    this.fetchTalentAudios();
    this.fetchTalentVideos();

    // dispatch modal navigateData with currentIndex at 0

    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = { ...val };
        }
      });

    this.store
      .pipe(select(fromModals.selectCurrentShowMagnifier))
      .subscribe((val: boolean) => {
        if (val !== null && val) {
          this.showModal = false;
        }
      });
  }

  onPrevious() {
    console.log("prev clicked");
    this.currentIndex--;
    if (this.currentIndex < this.selectedMedia.items.length - 1) {
      this.rightDisabled = false;
    }
    if (this.currentIndex === 0) {
      this.leftDisabled = true;
      this.rightDisabled = false;
    }
    this.store.dispatch(
      new ModalsActions.SetModalNavigationProperties({
        currentIndex: this.currentIndex,
        mediaType: this.selectedMedia.mediaType,
      })
    );
  }

  onNext() {
    console.log("next clicked");
    this.currentIndex++;
    if (this.currentIndex > 0 && this.selectedMedia.items.length > 1) {
      this.leftDisabled = false;
    }

    if (this.currentIndex === this.selectedMedia.items.length - 1) {
      this.rightDisabled = true;
      this.leftDisabled = false;
    }
    this.store.dispatch(
      new ModalsActions.SetModalNavigationProperties({
        currentIndex: this.currentIndex,
        mediaType: this.selectedMedia.mediaType,
      })
    );
  }

  openModalDialog(modalId: string, selectedMedia: TalentPortfolioPreview) {
    console.log(selectedMedia);

    this.store.dispatch(
      new ModalsActions.FetchAppModal({ appModalId: "talent-portfolio" })
    );

    if (this.componentModal) {
      const modalToActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];

      const modalToOpen: IModal = {
        index: modalToActivate.index,
        name: modalToActivate.name,
        display: ModalDisplay.table,
        viewMode: ModalViewModel.new,
        contentType: modalToActivate.contentType,
        data: { ...selectedMedia },
        modalCss: "modal aligned-modal album-modal",
        modalDialogCss: "modal-dialog-album-view",
        showMagnifier: false,
      };

      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToOpen,
        })
      );
      this.selectedMedia = { ...selectedMedia };
    }
    if (this.selectedMedia.items.length <= 1) {
      this.leftDisabled = true;
      this.rightDisabled = true;
      this.store.dispatch(
        new ModalsActions.SetModalNavigationProperties({
          currentIndex: 0,
          mediaType: this.selectedMedia.mediaType,
        })
      );
    } else {
      this.leftDisabled = true;
      this.rightDisabled = false;
      this.onNext();
    }
  }

  fetchTalentImages() {
    this.store
      .pipe(select(fromTalentImagePortfolio.selectImagePortfolioPreviews))
      .subscribe((val: ImagePortfolioPreview[]) => {
        if (val) {
          this.imageAlbumCount = val.length;
          this.imageAlbums = [...val];
          this.setImageAlbumCover();
        }
      });
  }

  fetchTalentAudios() {
    this.store
      .pipe(select(fromTalentAudioPortfolio.selectAudioPortfolioPreviews))
      .subscribe((val: AudioPortfolioPreview[]) => {
        if (val) {
          this.audioAlbumCount = val.length;
          this.audioAlbums = [...val];
          this.setAudioAlbumCover();
        }
      });
  }

  fetchTalentVideos() {
    this.store
      .pipe(select(fromTalentVideoPortfolio.selectVideoPortfolioPreviews))
      .subscribe((val: VideoPortfolioPreview[]) => {
        if (val) {
          this.videoAlbumCount = val.length;
          this.videoAlbums = [...val];
          this.setVideoAlbumCover();
        }
      });
  }
  setImageAlbumCover() {
    this.imageAlbums = this.imageAlbums.map((x) => {
      return Object.assign({}, x, {
        albumCover:
          x.defaultImageKey !== ""
            ? fetchImageObjectFromCloudFormation(
                x.defaultImageKey,
                this.editParams
              )
            : fetchNoMediaDefaultImage(),
      });
    });
  }

  setAudioAlbumCover() {
    this.audioAlbums = this.audioAlbums.map((x) => {
      return Object.assign({}, x, { albumCover: fetchAudioArt() });
    });
  }

  setVideoAlbumCover() {
    this.videoAlbums = this.videoAlbums.map((x) => {
      return Object.assign({}, x, { albumCover: fetchVideoArt() });
    });
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
    this.currentIndex = -1;
  }
}
