import { Component, OnInit, ElementRef, Input } from "@angular/core";
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
  UserFilterCategory,
  GeneralPreview,
  MediaType,
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
import * as fromTalentFilter from "../../shared/store/filtered-categories/talent-category.reducers";
import * as fromUserFilter from "../../shared/store/filtered-categories/user-filter/user-filter.reducer";
import * as fromTalentGeneral from "src/app/shared/store/talents/general-preview/general-preview.reducer";
import { Observable } from "rxjs";

@Component({
  selector: "app-talent-portfolio-albums",
  templateUrl: "./talent-portfolio-albums.component.html",
  styleUrls: ["./talent-portfolio-albums.component.css"],
})
export class TalentPortfolioAlbumsComponent {
  selectedUser: Observable<UserFilterCategory>;
  appModal: AppModal;
  componentModal: AppModal;
  imageAlbums: ImagePortfolioPreview[] = [];
  audioAlbums: AudioPortfolioPreview[] = [];
  videoAlbums: VideoPortfolioPreview[] = [];
  generalPreviews: TalentPortfolioPreview[] = [];
  defaultEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 413,
        height: 225,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  generalParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 133,
        height: 208,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  generalEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 133,
        height: 208,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  generalDefaultEditParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 50,
        height: 50,
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
  showImage: boolean = false;
  constructor(
    public store: Store<fromApp.AppState>,
    public element: ElementRef
  ) {}

  ngOnInit() {
    console.log("where i want to work");
    this.fetchTalentImages();
    this.fetchTalentAudios();
    this.fetchTalentVideos();

    this.selectedUser = this.store.pipe(
      select(fromUserFilter.selectCurrentUser)
    );

    this.store
      .pipe(select(fromTalentGeneral.selectGeneralPreviews))
      .subscribe((val: TalentPortfolioPreview[]) => {
        this.setGeneralMediaAlbumCover(val);
      });

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
        modalContentCss: "modal-content contest-d",
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
        defaultAlbumCover:
          x.defaultImageKey !== ""
            ? fetchImageObjectFromCloudFormation(
                x.defaultImageKey,
                this.defaultEditParams
              )
            : fetchNoMediaDefaultImage(),
        defaultLoaded: false,
      });
    });
  }

  triggerTimer() {
    setTimeout(() => {
      this.triggerImageShow();
    }, 5000);
  }

  triggerImageShow() {
    this.showImage = true;
  }

  setAudioAlbumCover() {
    this.audioAlbums = this.audioAlbums.map((x) => {
      return Object.assign({}, x, { albumCover: fetchAudioArt() });
    });
  }

  setVideoAlbumCover() {
    this.videoAlbums = this.videoAlbums.map((x) => {
      return Object.assign({}, x, {
        albumCover:
          x.albumCoverKey !== ""
            ? fetchImageObjectFromCloudFormation(
                x.albumCoverKey,
                this.editParams
              )
            : fetchVideoArt(),
        defaultAlbumCover:
          x.albumCoverKey !== ""
            ? fetchImageObjectFromCloudFormation(
                x.albumCoverKey,
                this.defaultEditParams
              )
            : fetchVideoArt(),
        defaultLoaded: false,
      });
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
    this.currentIndex = -1;
  }

  setGeneralMediaAlbumCover(previews: TalentPortfolioPreview[]) {
    this.generalPreviews = previews.map((x) => {
      const mediaType = x.mediaType.toUpperCase();
      switch (mediaType) {
        case MediaType.AUDIO:
          x = this.setGeneralAudioAlbumCover(x);
          break;
        case MediaType.IMAGE:
          x = this.setGeneralImageAlbumCover(x);
          break;
        case MediaType.VIDEO:
          x = this.setGeneralVideoAlbumCover(x);
          break;
        default:
          break;
      }
      return x;
    });
  }

  setGeneralAudioAlbumCover(
    audio: TalentPortfolioPreview
  ): TalentPortfolioPreview {
    return Object.assign({}, audio, { albumCover: fetchAudioArt() });
  }

  setGeneralImageAlbumCover(
    image: TalentPortfolioPreview
  ): TalentPortfolioPreview {
    return Object.assign({}, image, {
      albumCover:
        image.defaultImageKey !== ""
          ? fetchImageObjectFromCloudFormation(
              image.defaultImageKey,
              this.editParams
            )
          : fetchNoMediaDefaultImage(),
      defaultAlbumCover:
        image.defaultImageKey !== ""
          ? fetchImageObjectFromCloudFormation(
              image.defaultImageKey,
              this.defaultEditParams
            )
          : fetchNoMediaDefaultImage(),
      defaultLoaded: false,
    });
  }

  setGeneralVideoAlbumCover(
    video: TalentPortfolioPreview
  ): TalentPortfolioPreview {
    return Object.assign({}, video, {
      albumCover:
        video.albumCoverKey !== ""
          ? fetchImageObjectFromCloudFormation(
              video.albumCoverKey,
              this.editParams
            )
          : fetchVideoArt(),
      defaultAlbumCover:
        video.albumCoverKey !== ""
          ? fetchImageObjectFromCloudFormation(
              video.albumCoverKey,
              this.defaultEditParams
            )
          : fetchVideoArt(),
      defaultLoaded: false,
    });
  }
}
