import { UserFilterCategory } from "./../../interfaces/user/filter-category";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  IModal,
  TalentPortfolioPreview,
  MediaItem,
  NavigationData,
  UploadedItems,
  MediaType,
  AudioItem,
  VideoItem,
  AppModal,
  ModalDisplay,
  ModalViewModel,
} from "src/app/interfaces";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import {
  fetchImageObjectFromCloudFormation,
  fetchNoMediaDefaultImage,
  fetchAudioItemFullPath,
  fetchVideoItemFullPath,
} from "src/app/lib/Helper";

import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as fromModal from "../../shared/store/modals/modals.reducers";
import * as CommentsActions from "../../shared/store/comments/comments.action";
import * as fromComments from "../../shared/store/comments/comments.reducers";
import * as fromTalentFilter from "src/app/shared/store/filtered-categories/talent-category.reducers";
import * as _ from "underscore";
import * as fromUserFilter from "../../shared/store/filtered-categories/user-filter/user-filter.reducer";

@Component({
  selector: "app-talent-album-modal-content",
  templateUrl: "./talent-album-modal-content.component.html",
  styleUrls: ["./talent-album-modal-content.component.css"],
})
export class TalentAlbumModalContentComponent implements OnInit, OnDestroy {
  selectedUser: UserFilterCategory;
  selectedMedia: TalentPortfolioPreview = {
    _id: "",
    mediaType: "",
    talent: "",
    aliasName: "",
    uploadType: "",
    albumCover: "",
    defaultImageKey: "",
    defaultAlbumCover: "",
    mediaTitle: "",
    mediaDescription: "",
    items: [],
    itemsCount: 0,
    dateCreated: new Date(),
  };
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 60,
        height: 60,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  currentAudioItem: AudioItem = {
    _id: "",
    key: "",
    path: "",
    type: "",
    fullAudioPath: "",
  };
  currentVideoItem: VideoItem = {
    _id: "",
    key: "",
    path: "",
    type: "",
    fullVideoPath: "",
  };
  showMgnifier: boolean = false;
  currentIndex = 0;
  mediaItems: MediaItem[] = [];
  defaultImageParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 436,
        height: 289,
        fit: ImageFit.cover,
      },
      grayscale: false,
    },
  };
  defaultImgParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.cover,
      },
      grayscale: false,
    },
  };

  defaultImagePath: string;
  imagePath: string;
  isCurrentImageSet: boolean;
  isCurrentAudioSet: boolean;
  isCurrentVideoSet: boolean;
  currentAudioIndex = 0;
  audioItems: MediaItem[] = [];
  currentImage: string = "";
  componentModal: AppModal;

  initiated$ = this.store.pipe(
    select(fromComments.selectCommentsInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromComments.selectCommentsInProgressStatus)
  );

  completed$ = this.store.pipe(
    select(fromComments.selectCommentsCompletedStatus)
  );

  failed$ = this.store.pipe(select(fromComments.selectCommentsFailedStatus));

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.activateModalContent();

    this.store
      .pipe(select(fromModal.selectCurrentNavigationData))
      .subscribe((val: NavigationData) => {
        if (val !== null) {
          this.currentIndex = val.currentIndex;
          const currentMedia = this.selectedMedia.items[val.currentIndex];
          if (currentMedia !== undefined) {
            Object.assign({}, currentMedia, { key: currentMedia.path });

            this.setMedia(val.mediaType, currentMedia);
          }
        }
      });

    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = val;
        }
      });
  }

  activateModalContent(): void {
    this.store
      .pipe(select(fromModal.selectCurrentActiveModal))
      .subscribe((val: IModal) => {
        if (val) {
          this.isCurrentAudioSet = false;
          this.isCurrentImageSet = false;
          this.isCurrentVideoSet = false;
          if (val.name === "album-modal" && val.data !== null) {
            if (val.data) {
              this.selectedMedia = val.data;
              this.fetchComments(this.selectedMedia._id);
            }
          }
        }
      });

    this.store
      .pipe(select(fromUserFilter.selectCurrentUser))
      .subscribe((val: UserFilterCategory) => {
        if (_.has(val, "_id")) {
          this.selectedUser = val;
          this.selectedUser.displayPhotoFullPath = _.has(val, "displayPhoto")
            ? fetchImageObjectFromCloudFormation(
                val.displayPhoto,
                this.editParams
              )
            : null;
        }
      });
  }

  fetchComments(mediaId: string): void {
    this.store.dispatch(
      new CommentsActions.FetchMediaComments({
        entityId: mediaId,
      })
    );
  }

  setCurrentImage(image: MediaItem) {
    this.isCurrentImageSet = true;
    this.isCurrentAudioSet = false;
    this.isCurrentVideoSet = false;
    this.defaultImagePath = fetchImageObjectFromCloudFormation(
      image.path,
      this.defaultImgParams
    );
    this.imagePath =
      image !== undefined
        ? fetchImageObjectFromCloudFormation(
            image.path,
            this.defaultImageParams
          )
        : fetchNoMediaDefaultImage();
  }

  setMagnifiedImage() {
    this.store.dispatch(new ModalsActions.ToggleMagnifier(true));
    this.store.dispatch(
      new ModalsActions.SetMagnifierData({
        index: this.currentIndex,
        data: this.selectedMedia.items,
      })
    );
  }

  onMagnifyImage(): void {
    this.showMgnifier = !this.showMgnifier;
  }

  setCurrentVideo(video: VideoItem) {
    this.isCurrentImageSet = false;
    this.isCurrentAudioSet = false;
    this.isCurrentVideoSet = true;
    this.currentVideoItem = video;
  }

  setCurrentAudio(audio: AudioItem) {
    this.isCurrentImageSet = false;
    this.isCurrentVideoSet = false;
    this.isCurrentAudioSet = true;
    this.currentAudioItem = audio;
  }

  setMedia(type: string, media: MediaItem) {
    const mediaType = type.toUpperCase();
    this.isCurrentImageSet = false;
    this.isCurrentAudioSet = false;
    this.isCurrentVideoSet = false;
    switch (mediaType) {
      case MediaType.AUDIO:
        this.setCurrentAudio(media);
        break;
      case MediaType.IMAGE:
        this.setCurrentImage(media);
        break;
      case MediaType.VIDEO:
        this.setCurrentVideo(media);
        break;
      default:
        break;
    }
  }

  ngOnDestroy() {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === "album-modal"
      )[0];
      if (modalToDeActivate) {
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
}
