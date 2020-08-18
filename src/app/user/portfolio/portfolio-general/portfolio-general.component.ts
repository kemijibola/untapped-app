import { Store, select } from "@ngrx/store";
import * as fromUser from "../../user.reducers";
import { Component, OnInit } from "@angular/core";
import * as fromMediaPreview from "../../store/portfolio/media/media-preview.reducers";
import {
  GeneralPreview,
  MediaType,
  AppModal,
  ModalDisplay,
  ModalViewModel,
  IModal,
} from "src/app/interfaces";
import {
  fetchAudioArt,
  fetchImageObjectFromCloudFormation,
  fetchNoMediaDefaultImage,
  fetchVideoArt,
} from "src/app/lib/Helper";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import * as fromApp from "../../../store/app.reducers";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as fromModal from "../../../shared/store/modals/modals.reducers";

@Component({
  selector: "app-portfolio-general",
  templateUrl: "./portfolio-general.component.html",
  styleUrls: ["./portfolio-general.component.css"],
})
export class PortfolioGeneralComponent implements OnInit {
  componentModal: AppModal;
  generalPreviews: GeneralPreview[] = [];
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 94,
        height: 65,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  constructor(
    public store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
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
      .pipe(select(fromMediaPreview.selectUserGeneralPreviews))
      .subscribe((val: GeneralPreview[]) => {
        if (val.length > 0) {
          this.setMedia(val);
        }
      });
  }

  setMedia(previews: GeneralPreview[]) {
    this.generalPreviews = previews.map((x) => {
      const mediaType = x.mediaType.toUpperCase();
      switch (mediaType) {
        case MediaType.AUDIO:
          x = this.setAudioAlbumCover(x);
          break;
        case MediaType.IMAGE:
          x = this.setImageAlbumCover(x);
          break;
        case MediaType.VIDEO:
          x = this.setVideoAlbumCover(x);
          break;
        default:
          break;
      }
      return x;
    });
  }

  setAudioAlbumCover(audio: GeneralPreview): GeneralPreview {
    return Object.assign({}, audio, { albumCover: fetchAudioArt() });
  }

  setImageAlbumCover(image: GeneralPreview): GeneralPreview {
    return Object.assign({}, image, {
      albumCover:
        image.defaultMediaPath !== ""
          ? fetchImageObjectFromCloudFormation(
              image.defaultMediaPath,
              this.editParams
            )
          : fetchNoMediaDefaultImage(),
    });
  }

  setVideoAlbumCover(video: GeneralPreview): GeneralPreview {
    return Object.assign({}, video, {
      albumCover:
        video.defaultMediaPath !== ""
          ? fetchImageObjectFromCloudFormation(
              video.defaultMediaPath,
              this.editParams
            )
          : fetchVideoArt(),
    });
  }

  openModalDialog(modalId: string, itemId: string) {
    console.log("clicked");
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
      this.fetchMedia(itemId);

      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToOpen,
        })
      );
    }
  }

  fetchMedia(mediaId: string): void {
    this.userStore.dispatch(new PortfolioActions.FetchMediaById({ mediaId }));
  }
}
