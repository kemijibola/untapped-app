import { UserFilterCategory } from "./../../interfaces/user/filter-category";
import { Component, OnInit } from "@angular/core";
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
  MediaType
} from "src/app/interfaces";
import { selectSelectedUser } from "src/app/shared/store/filtered-categories/user-category.selectors";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { VgAPI } from "videogular2/compiled/core";

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
  currentAudioItem: MediaItem = {
    _id: "",
    key: "",
    path: "",
    type: ""
  };
  defaultAudioSet: boolean;
  defaultImageSet: boolean;
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
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.activateModalContent();
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
  }

  activateModalContent(): void {
    this.store.pipe(select(selectActiveModal)).subscribe((val: IModal) => {
      this.defaultImageSet = false;
      this.defaultAudioSet = false;
      if (val.name === "album-modal" && val.data !== null) {
        if (val.data !== null) {
          this.selectedMedia = { ...val.data };
        }
      }
    });

    // get
    this.store
      .pipe(select(selectSelectedUser))
      .subscribe((val: UserFilterCategory) => {
        this.selectedUser = { ...val };
        this.selectedUser.displayPhotoFullPath = fetchImageObjectFromCloudFormation(
          val.displayPhoto,
          this.editParams
        );
      });

    this.store
      .pipe(select(selectNavigationData))
      .subscribe((val: NavigationData) => {
        const currentMedia = this.selectedMedia.items[val.currentIndex];
        console.log(currentMedia);
        this.setMedia(val.mediaType, currentMedia);
      });
  }

  setCurrentImage(image: MediaItem) {
    this.defaultImagePath = fetchImageObjectFromCloudFormation(
      image.path,
      this.defaultImageParams
    );
  }

  setMedia(type: string, media: MediaItem) {
    const mediaType = type.toUpperCase();
    switch (mediaType) {
      case MediaType.AUDIO:
        // this.setAudio(media);
        break;
      case MediaType.IMAGE:
        this.setCurrentImage(media);
        break;
      case MediaType.VIDEO:
        // this.setVideo(media);
        break;
      default:
        break;
    }
  }
}
