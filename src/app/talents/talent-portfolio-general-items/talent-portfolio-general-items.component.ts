import { Component, OnInit } from "@angular/core";
import {
  MediaQueryParams,
  MediaType,
  MediaUploadType,
  GeneralPreview,
  ModalViewModel,
  ModalDisplay,
  AppModal,
  IModal,
  UserFilterCategory,
} from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../user/user.reducers";
import * as fromMediaPreview from "../../user/store/portfolio/media/media-preview.reducers";
import * as MediaPreviewActions from "../../user/store/portfolio/media/media-preview.actions";
import {
  fetchImageObjectFromCloudFormation,
  fetchNoMediaDefaultImage,
  fetchVideoArt,
  fetchAudioArt,
} from "src/app/lib/Helper";
import * as fromApp from "../../store/app.reducers";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as PortfolioActions from "../../user/store/portfolio/portfolio.actions";
import * as fromUserFilter from "../../shared/store/filtered-categories/user-filter/user-filter.reducer";

@Component({
  selector: "app-talent-portfolio-general-items",
  templateUrl: "./talent-portfolio-general-items.component.html",
  styleUrls: ["./talent-portfolio-general-items.component.css"],
})
export class TalentPortfolioGeneralItemsComponent implements OnInit {
  componentModal: AppModal;
  generalPreviews: GeneralPreview[] = [];
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 133,
        height: 208,
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
      .pipe(select(fromUserFilter.selectCurrentUser))
      .subscribe((val: UserFilterCategory) => {
        if (val) {
          this.triggerFetchUserGeneralList(val.user);
        }
      });

    // this.userStore
    //   .pipe(select(fromMediaPreview.selectUserGeneralPreviews))
    //   .subscribe((val: GeneralPreview[]) => {
    //     if (val.length > 0) {
    //       this.setMedia(val);
    //     }
    //   });
  }

  triggerFetchUserGeneralList(userId: string): void {
    const queryParams: MediaQueryParams = {
      type: MediaType.ALL,
      uploadType: MediaUploadType.single,
      user: userId,
    };
    this.userStore.dispatch(
      new MediaPreviewActions.FetchUserGeneralListPreview(queryParams)
    );
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
        viewMode: ModalViewModel.edit,
        contentType: modalToActivate.contentType,
        data: modalToActivate.data,
        modalCss: "modal aligned-modal album-modal",
        modalDialogCss: "modal-dialog-album-view",
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
