import { UserFilterCategory } from "./../../interfaces/user/filter-category";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  selectActiveModal,
  selectNavigationData
} from "src/app/shared/store/modals/modals.selectors";
import {
  IModal,
  TalentPortfolioPreview,
  MediaItem,
  NavigationData,
  UploadedItems,
  MediaType,
  AudioItem,
  VideoItem
} from "src/app/interfaces";
import { selectSelectedUser } from "src/app/shared/store/filtered-categories/user-category.selectors";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import {
  fetchImageObjectFromCloudFormation,
  fetchNoMediaDefaultImage,
  fetchAudioItemFullPath
} from "src/app/lib/Helper";
import { VgAPI, VgMedia } from "videogular2/compiled/core";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as CommentsActions from "../../shared/store/comments/comments.action";

@Component({
  selector: "app-talent-album-modal-content",
  templateUrl: "./talent-album-modal-content.component.html",
  styleUrls: ["./talent-album-modal-content.component.css"]
})
export class TalentAlbumModalContentComponent implements OnInit {
  api: VgAPI;
  selectedUser: UserFilterCategory;
  selectedMedia: TalentPortfolioPreview = {
    _id: "",
    mediaType: "",
    talent: "",
    uploadType: "",
    albumCover: "",
    defaultImageKey: "",
    mediaTitle: "",
    mediaDescription: "",
    items: [],
    itemsCount: 0,
    dateCreated: new Date()
  };
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 60,
        height: 60,
        fit: ImageFit.fill
      },
      grayscale: false
    }
  };
  currentAudioItem: AudioItem = {
    _id: "",
    key: "",
    path: "",
    type: "",
    fullAudioPath: ""
  };
  currentVideoItem: VideoItem = {
    _id: "",
    key: "",
    path: "",
    type: "",
    fullAudioPath: ""
  };
  currentIndex = 0;
  mediaItems: MediaItem[] = [];
  defaultImageParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 435.39,
        height: 289,
        fit: ImageFit.cover
      },
      grayscale: false
    }
  };
  defaultImagePath: string;
  isCurrentImageSet: boolean;
  isCurrentAudioSet: boolean;
  isCurrentVideoSet: boolean;
  currentAudioIndex = 0;
  audioItems: MediaItem[] = [];
  commentsFetched: boolean = false;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.activateModalContent();

    this.store
      .pipe(select(selectNavigationData))
      .subscribe((val: NavigationData) => {
        this.currentIndex = val.currentIndex;
        const currentMedia = this.selectedMedia.items[val.currentIndex];
        if (currentMedia !== undefined) {
          currentMedia.key = currentMedia.path;
        }
        this.setMedia(val.mediaType, currentMedia);
      });
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
  }

  activateModalContent(): void {
    this.store.pipe(select(selectActiveModal)).subscribe((val: IModal) => {
      this.isCurrentAudioSet = false;
      this.isCurrentImageSet = false;
      this.isCurrentVideoSet = false;
      if (val.name === "album-modal" && val.data !== null) {
        if (val.data !== null) {
          this.selectedMedia = { ...val.data };
          this.store.dispatch(
            new CommentsActions.FetchMediaComments({
              mediaId: this.selectedMedia._id
            })
          );
        }
      } else {
        if (this.api) {
          (<VgMedia>this.api.getDefaultMedia()).pause();
        }
      }
    });

    this.store
      .pipe(select(selectSelectedUser))
      .subscribe((val: UserFilterCategory) => {
        this.selectedUser = { ...val };
        this.selectedUser.displayPhotoFullPath = fetchImageObjectFromCloudFormation(
          val.displayPhoto,
          this.editParams
        );
      });
  }

  setCurrentImage(image: MediaItem) {
    this.isCurrentImageSet = true;
    this.isCurrentAudioSet = false;
    this.isCurrentVideoSet = false;
    this.defaultImagePath =
      image === undefined
        ? fetchNoMediaDefaultImage()
        : (this.defaultImagePath = fetchImageObjectFromCloudFormation(
            image.path,
            this.defaultImageParams
          ));
  }

  setMagnifiedImage() {
    this.store.dispatch(new ModalsActions.ToggleMagnifier(true));
    this.store.dispatch(
      new ModalsActions.SetMagnifierData({
        index: this.currentIndex,
        data: this.selectedMedia.items
      })
    );
  }

  setCurrentVideo(video: VideoItem) {
    this.isCurrentImageSet = false;
    this.isCurrentAudioSet = false;
    this.isCurrentVideoSet = true;

    video.type = `video/${video.path.split(".").pop()}`;
    video.fullAudioPath = fetchAudioItemFullPath(video.path);
    this.currentVideoItem = video;

    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
  }
  setCurrentAudio(audio: AudioItem) {
    this.isCurrentImageSet = false;
    this.isCurrentAudioSet = true;
    this.isCurrentVideoSet = false;

    audio.type = `audio/${audio.path.split(".").pop()}`;
    audio.fullAudioPath = fetchAudioItemFullPath(audio.path);
    this.currentAudioItem = audio;

    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
  }

  setMedia(type: string, media: MediaItem) {
    const mediaType = type.toUpperCase();
    this.isCurrentImageSet = false;
    this.isCurrentAudioSet = false;
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
}