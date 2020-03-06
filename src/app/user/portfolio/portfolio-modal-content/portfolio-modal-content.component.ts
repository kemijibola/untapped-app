import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as fromSlideToggle from "../../../shared/store/slide-toggle/slide-toggle.reducers";
import * as ToggleStateActions from "../../../shared/store/slide-toggle/slide-toggle.actions";
import * as fromApp from "../../../store/app.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import {
  MediaAcceptType,
  PortfolioUploadInputConfig,
  MediaUploadType,
  MediaType,
  IMedia,
  IToggle,
  ToggleList,
  UploadedItems,
  ModalViewModel,
  IModal,
  MediaQueryParams,
  MediaItem,
  OtherMedia,
  ModalDisplay
} from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import { selectToggleList } from "src/app/shared/store/slide-toggle/slide.toggle.selectors";
import {
  selectMediaAccept,
  selectMedia
} from "../../store/portfolio/portfolio.selectors";
import { map } from "rxjs/operators";
import {
  selectUploadedItems,
  selectUploadSuccess
} from "src/app/shared/store/upload/upload.selectors";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import {
  fetchImageObjectFromCloudFormation,
  fetchAudioArt,
  fetchAudioItemFullPath,
  fetchVideoArt,
  fetchVideoItemFullPath
} from "src/app/lib/Helper";
import * as _ from "underscore";
import * as fromUser from "../../user.reducers";
import { Router, ActivatedRoute } from "@angular/router";
import { selectActiveModal } from "src/app/shared/store/modals/modals.selectors";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import { UUID } from "angular2-uuid";
import { BitrateOption, VgAPI, VgMedia } from "videogular2/compiled/core";
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: "app-portfolio-modal-content",
  templateUrl: "./portfolio-modal-content.component.html",
  styleUrls: ["./portfolio-modal-content.component.css"]
})
export class PortfolioModalContentComponent implements OnInit, OnDestroy {
  api: VgAPI;
  modalContentTitle: string;
  portfolioForm: FormGroup;
  modal: IModal;
  showToggle = false;
  multiple: boolean;
  accept: string;
  toggleState: IToggle;
  toggleName = ToggleList.UploadTypeToggle;
  selectedUploadType = MediaUploadType.SINGLE;
  portfolioUploadConfig: PortfolioUploadInputConfig = {
    isMultiple: false,
    mediaAccept: MediaAcceptType.IMAGE
  };
  cloudItems: UploadedItems;
  mediaUploaded: boolean;
  isVideoUpload: boolean = false;
  isAudioUpload: boolean = false;
  isImageUpload: boolean = false;
  pageSlideToggles: IToggle[];
  defaultImageSet: boolean;
  defaultAudioSet: boolean;
  defaultVideoSet: boolean;
  canViewDetails: boolean;
  pageViewMode: ModalViewModel;
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 80,
        height: 63,
        fit: ImageFit.fill
      },
      grayscale: false
    }
  };
  defaultImageParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 698,
        height: 200,
        fit: ImageFit.cover
      },
      grayscale: false
    }
  };
  uploadedItems: UploadedItems = {
    _id: "",
    type: MediaType.AUDIO,
    items: [],
    title: "",
    shortDescription: ""
  };

  defaultImagePath: string = "";
  otherImagesPath: MediaItem[] = [];
  otherAudioPath: MediaItem[] = [];
  otherVideoPath: MediaItem[] = [];
  isMultipleImage: boolean;
  isMultipleAudio: boolean;
  isMultipleVideo: boolean;
  actionText: string = "";
  uploadType: MediaUploadType;
  currentAudioIndex = 0;
  currentVideoIndex = 0;
  currentVideoItem: MediaItem = {
    _id: "",
    path: "",
    type: ""
  };
  currentAudioItem: MediaItem = {
    _id: "",
    path: "",
    type: ""
  };

  constructor(
    private store: Store<fromApp.AppState>,
    private toggleStore: Store<fromSlideToggle.State>,
    private userStore: Store<fromUser.UserState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pageSlideToggles = [
      { index: 0, name: ToggleList.UploadTypeToggle, state: false }
    ];
    this.toggleStore.dispatch(
      new ToggleStateActions.AddPageToggles({ toggles: this.pageSlideToggles })
    );
  }
  onPlayerReady(api: VgAPI) {
    this.api = api;
  }

  ngOnInit() {
    this.store.pipe(select(selectToggleList)).subscribe((val: IToggle[]) => {
      this.toggleState = val.filter(
        x => x.name === ToggleList.UploadTypeToggle
      )[0];
      this.multiple = this.toggleState.state;
      this.uploadType = this.multiple
        ? MediaUploadType.MULTIPLE
        : MediaUploadType.SINGLE;
    });

    // select accept
    this.userStore.pipe(select(selectMediaAccept)).subscribe((val: string) => {
      this.accept = val;
    });

    this.store
      .pipe(select(selectUploadedItems))
      .subscribe((val: UploadedItems) => {
        this.uploadedItems = val;
        this.initForm();
      });

    this.store.pipe(select(selectUploadSuccess)).subscribe((val: boolean) => {
      if (val) {
        this.setMedia(this.uploadedItems);
      }
    });

    this.userStore.pipe(select(selectMedia)).subscribe((val: IMedia) => {
      if (val) {
        this.uploadedItems = {
          _id: val._id,
          type: val.mediaType,
          items: val.items,
          title: val.title,
          shortDescription: val.shortDescription
        };
        this.portfolioForm.controls["title"].setValue(val.title);
        this.portfolioForm.controls["description"].setValue(
          val.shortDescription
        );
        this.setMedia(this.uploadedItems);
      }
    });

    this.activateModalContent();
  }

  onClickPlaylistVideo(item: MediaItem, index: number) {
    item.type = `video/${item.path.split(".").pop()}`;
    this.currentVideoIndex = index;
    this.currentVideoItem = item;
    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
  }

  onClickPlaylistItem(item: MediaItem, index: number) {
    item.type = `audio/${item.path.split(".").pop()}`;
    this.currentAudioIndex = index;
    this.currentAudioItem = item;
    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
  }

  activateModalContent(): void {
    this.store.pipe(select(selectActiveModal)).subscribe((val: IModal) => {
      // this.clearModalContent();
      this.defaultImagePath = "";
      this.otherImagesPath = [];
      this.canViewDetails = false;
      this.defaultImageSet = false;
      this.defaultAudioSet = false;
      this.defaultVideoSet = false;
      this.isMultipleAudio = false;
      this.isMultipleImage = false;
      this.isMultipleVideo = false;
      this.otherAudioPath = [];
      this.otherVideoPath = [];
      this.currentVideoIndex = 0;
      this.currentAudioIndex = 0;
      this.currentAudioItem = {
        _id: "",
        path: "",
        type: ""
      };
      this.currentVideoItem = {
        _id: "",
        path: "",
        type: ""
      };
      if (val.name === "gigs-modal") {
        this.pageViewMode = val.viewMode;
        if (val.viewMode === ModalViewModel.edit) {
          this.showToggle = false;
          this.actionText = "UPDATE PORTFOLIO";
          this.modalContentTitle = "Update Porfolio";
        } else {
          this.showToggle = true;
          this.portfolioForm.controls["title"].setValue("");
          this.portfolioForm.controls["description"].setValue("");
          this.modalContentTitle = "New Upload";
          this.actionText = "ADD TO PORTFOLIO";
        }
      }
    });
  }
  setMedia(media: UploadedItems) {
    if (media.items) {
      this.canViewDetails = true;
      const mediaType = media.type.toUpperCase();
      switch (mediaType) {
        case MediaType.AUDIO:
          this.setAudio(media);
          break;
        case MediaType.IMAGE:
          this.setImage(media);
          break;
        case MediaType.VIDEO:
          this.setVideo(media);
          break;
        default:
          break;
      }
    }
  }

  setDefaultAudioCover() {
    this.defaultImagePath = fetchAudioArt();
  }

  setDefaultImage(key: string) {
    this.defaultImagePath = fetchImageObjectFromCloudFormation(
      key,
      this.defaultImageParams
    );
  }

  setOtherImages(media: MediaItem[]) {
    this.otherImagesPath = media.reduce(
      (theMap: MediaItem[], theItem: MediaItem) => {
        theMap.push({
          _id: theItem._id,
          path: fetchImageObjectFromCloudFormation(
            theItem.path,
            this.editParams
          )
        });
        return theMap;
      },
      []
    );
  }

  private initForm() {
    this.portfolioForm = new FormGroup({
      title: new FormControl(this.uploadedItems.title, Validators.required),
      description: new FormControl(
        this.uploadedItems.shortDescription,
        Validators.maxLength(250)
      )
    });
  }

  setVideo(media: UploadedItems) {
    this.isVideoUpload = true;
    if (media.items.length > 1) {
      // multiple upload
      this.isMultipleVideo = true;
      this.defaultVideoSet = true;
      var currentVideo = media.items[this.currentVideoIndex];
      this.setDefaultVideo(currentVideo);
      this.setOtherVideo(media.items);
    } else {
      // single video
      this.isMultipleVideo = false;
      this.defaultVideoSet = true;
      this.setDefaultAudio(currentVideo);
      this.setOtherAudio(media.items);
    }
  }

  setAudio(media: UploadedItems) {
    this.isAudioUpload = true;
    if (media.items.length > 1) {
      // multiple upload
      this.isMultipleAudio = true;
      this.defaultAudioSet = true;

      var currentItem = media.items[this.currentAudioIndex];
      this.setDefaultAudio(currentItem);
      this.setOtherAudio(media.items);
    } else {
      // single upload
      this.isMultipleAudio = false;
      this.defaultAudioSet = true;
      this.setDefaultAudio(currentItem);
      this.setOtherAudio(media.items);
    }
  }

  setDefaultVideo(video: MediaItem) {
    this.currentVideoItem = {
      _id: video._id,
      path: fetchVideoItemFullPath(video.path),
      type: `video/${video.path.split(".").pop()}`
    };
  }
  setDefaultAudio(audio: MediaItem) {
    this.currentAudioItem = {
      _id: audio._id,
      path: fetchAudioItemFullPath(audio.path),
      type: `audio/${audio.path.split(".").pop()}`
    };
  }

  setOtherVideo(media: MediaItem[]) {
    this.otherVideoPath = media.reduce(
      (theMap: MediaItem[], theItem: MediaItem) => {
        theMap.push({
          _id: theItem._id,
          path: fetchVideoItemFullPath(theItem.path)
        });
        return theMap;
      },
      []
    );
  }

  setOtherAudio(media: MediaItem[]) {
    this.otherAudioPath = media.reduce(
      (theMap: MediaItem[], theItem: MediaItem) => {
        theMap.push({
          _id: theItem._id,
          path: fetchAudioItemFullPath(theItem.path)
        });
        return theMap;
      },
      []
    );
  }

  setImage(media: UploadedItems) {
    this.isImageUpload = true;
    if (media.items.length > 1) {
      // items is greater than 1 means it is multiple upload
      this.isMultipleImage = true;
      this.defaultImageSet = true;
      this.setDefaultImage(media.items[0].path);
      this.setOtherImages(media.items);
    } else {
      // single upload
      this.isMultipleImage = false;
      this.defaultImageSet = true;
      this.setDefaultImage(media.items[0].path);
      this.setOtherImages(media.items);
    }
  }

  onClickOnActionButton() {
    const title: string = this.portfolioForm.controls["title"].value;
    const desc: string = this.portfolioForm.controls["description"].value;
    const payload: UploadedItems = {
      _id: this.uploadedItems._id,
      title,
      shortDescription: desc,
      items: this.uploadedItems.items,
      type: this.uploadedItems.type
    };
    if (this.pageViewMode === "edit") {
      // dispatch update
      this.userStore.dispatch(
        new PortfolioActions.UpdatePortfolioMedia({
          uploadType: this.uploadType,
          data: payload
        })
      );
    } else {
      // dispatch create new media
      this.userStore.dispatch(
        new PortfolioActions.CreatePortfolioMedia({
          uploadType: this.uploadType,
          data: payload
        })
      );
    }

    // TODO:: show success pop-up before toggling modal
    const modalToClose: IModal = {
      index: 0,
      name: "gigs-modal",
      display: ModalDisplay.none
    };

    this.store.dispatch(
      new ModalsActions.ToggleModal({
        component: "portfolio",
        modal: modalToClose
      })
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new ModalsActions.ResetCurrentModal());
  }
}
