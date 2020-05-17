import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as fromSlideToggle from "../../../shared/store/slide-toggle/slide-toggle.reducers";
import * as fromModal from "../../../shared/store/modals/modals.reducers";
import * as ToggleActions from "../../../shared/store/slide-toggle/slide-toggle.actions";
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
  ModalDisplay,
  AppModal,
  AppToggle,
} from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as MediaPreviewActions from "../../store/portfolio/media/media-preview.actions";

import * as fromUpload from "src/app/shared/store/upload/upload.reducers";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import {
  fetchImageObjectFromCloudFormation,
  fetchAudioArt,
  fetchAudioItemFullPath,
  fetchVideoArt,
  fetchVideoItemFullPath,
  fetchNoMediaDefaultImage,
} from "src/app/lib/Helper";
import * as _ from "underscore";
import * as fromUser from "../../user.reducers";
import { Router, ActivatedRoute } from "@angular/router";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import { UUID } from "angular2-uuid";
import { VgMedia } from "videogular2/compiled/core";
import { VgAPI } from "ngx-videogular";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import * as UploadActions from "../../../shared/store/upload/upload.actions";

@Component({
  selector: "app-portfolio-modal-content",
  templateUrl: "./portfolio-modal-content.component.html",
  styleUrls: ["./portfolio-modal-content.component.css"],
})
export class PortfolioModalContentComponent implements OnInit, OnDestroy {
  api: VgAPI;
  modalContentTitle: string;
  portfolioForm: FormGroup;
  componentModal: AppModal;
  modal: IModal;
  showToggle = false;
  multiple: boolean;
  accept: string;
  modalUploadToggle: IToggle;
  selectedUploadType = MediaUploadType.single;
  portfolioUploadConfig: PortfolioUploadInputConfig = {
    isMultiple: false,
    mediaAccept: MediaAcceptType.IMAGE,
  };
  cloudItems: UploadedItems;
  mediaUploaded: boolean;
  isVideoUpload: boolean = false;
  isAudioUpload: boolean = false;
  isImageUpload: boolean = false;
  // pageSlideToggles: IToggle[];
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
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  defaultImageParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 698,
        height: 200,
        fit: ImageFit.cover,
      },
      grayscale: false,
    },
  };
  uploadedItems: UploadedItems = {
    _id: "",
    type: MediaType.AUDIO,
    uploadType: MediaUploadType.all,
    albumCover: "",
    items: [],
    title: "",
    shortDescription: "",
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
    key: "",
    path: "",
    type: "",
  };
  currentAudioItem: MediaItem = {
    _id: "",
    key: "",
    path: "",
    type: "",
  };
  isViewMode: boolean = false;
  itemToUpdate: UploadedItems;
  showUploading: boolean = false;
  showCompleted: boolean = false;
  showDiv: boolean = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  onPlayerReady(api: VgAPI) {
    this.api = api;
  }

  ngOnInit() {
    this.store
      .pipe(select(fromUpload.selectCurrentUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.showDiv = true;
          this.showUploading = true;
          this.showCompleted = false;
        }
      });

    // this.store
    //   .pipe(select(fromUpload.selectUploadCompleted))
    //   .subscribe((val: boolean) => {
    //     if (val) {
    //       this.showDiv = true;
    //       this.showCompleted = true;
    //       this.showUploading = false;
    //     }
    //   });
    // fetch component toggle here by Id
    this.store.dispatch(
      new ToggleActions.FetchToggle({ appToggleId: "portfolio" })
    );
    // use filter to get toggle
    this.store
      .pipe(select(fromSlideToggle.selectCurrentSlideToggle))
      .subscribe((val: AppToggle) => {
        if (val) {
          this.modalUploadToggle = val.toggles.filter(
            (x) => x.name === ToggleList.modaluploadtoggle
          )[0];
          this.multiple = this.modalUploadToggle.state;
          this.uploadType = this.multiple
            ? MediaUploadType.multiple
            : MediaUploadType.single;
        }
      });

    // select accept
    this.userStore
      .pipe(select(fromPortfolio.selectUserAccept))
      .subscribe((val: string) => {
        this.accept = val;
      });

    this.store
      .pipe(select(fromUpload.selectCurrentUploadedItem))
      .subscribe((val: UploadedItems) => {
        this.uploadedItems = { ...val };
        this.initForm();
      });

    this.store
      .pipe(select(fromUpload.selectUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.showDiv = true;
          this.showCompleted = true;
          this.showUploading = false;
          this.triggerTimer();
        }
      });

    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = { ...val };
        }
      });

    this.userStore
      .pipe(select(fromPortfolio.selectSelectedMedia))
      .subscribe((val: IMedia) => {
        if (val) {
          this.uploadedItems = {
            _id: val._id,
            type: val.mediaType,
            uploadType: val.uploadType,
            items: val.items,
            title: val.title,
            shortDescription: val.shortDescription,
          };
          this.portfolioForm.controls["title"].setValue(val.title);
          this.portfolioForm.controls["description"].setValue(
            val.shortDescription
          );
          this.setMedia(this.uploadedItems);
          this.itemToUpdate = { ...this.uploadedItems };
        }
      });

    this.activateModalContent();
  }

  triggerTimer() {
    setTimeout(() => {
      this.isViewMode = true;
      this.setMedia(this.uploadedItems);
    }, 1000);
  }

  onClickPlaylistVideo(item: MediaItem, index: number) {
    item.type = `video/${item.path.split(".").pop()}`;
    this.currentVideoIndex = index;
    this.currentVideoItem = item;
    console.log(this.api);
    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
  }

  onClickPlaylistItem(item: MediaItem, index: number) {
    item.type = `audio/${item.path.split(".").pop()}`;
    this.currentAudioIndex = index;
    this.currentAudioItem = item;
    (<VgMedia>this.api.getDefaultMedia()).loadMedia();
  }

  activateModalContent(): void {
    this.store
      .pipe(select(fromModal.selectCurrentActiveModal))
      .subscribe((val: IModal) => {
        if (val) {
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
            key: "",
            path: "",
            type: "",
          };
          this.currentVideoItem = {
            _id: "",
            key: "",
            path: "",
            type: "",
          };
          if (val.name === "gigs-modal") {
            this.pageViewMode = val.viewMode;
            if (val.viewMode === ModalViewModel.edit) {
              this.showToggle = false;
              this.isViewMode = true;
              this.modalContentTitle = "View Album";
              this.actionText = "UPDATE PORTFOLIO";
            } else {
              this.showToggle = true;
              this.isViewMode = false;
              this.portfolioForm.controls["title"].setValue("");
              this.portfolioForm.controls["description"].setValue("");
              this.modalContentTitle = "New Album Upload";
              this.actionText = "ADD TO PORTFOLIO";
            }
          }
          // this.clearModalContent();
        }
      });
  }

  setMedia(media: UploadedItems) {
    if (media.items) {
      this.canViewDetails = true;
      this.showCompleted = false;
      this.showUploading = false;
      this.showDiv = false;
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

  onDeleteMediaItem(mediaItem: MediaItem) {
    this.itemToUpdate.items = this.itemToUpdate.items.filter(
      (x) => x.path !== mediaItem.key
    );
    if (mediaItem._id) {
      this.userStore.dispatch(
        new PortfolioActions.DeleteMediaItemById({
          id: this.itemToUpdate._id,
          itemId: mediaItem._id,
        })
      );
    }
    if (this.itemToUpdate.items.length <= 0) {
      // close modal
      // this.closeGigsModal();
    } else {
      this.store.dispatch(
        new UploadActions.SetUploadedItems({
          uploadedItems: this.itemToUpdate,
        })
      );
      // this.setMedia(this.itemToUpdate);
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
          key: theItem.path,
          path: fetchImageObjectFromCloudFormation(
            theItem.path,
            this.editParams
          ),
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
      ),
    });
  }

  setVideo(media: UploadedItems) {
    this.isVideoUpload = true;
    if (media.uploadType === "multiple") {
      this.isMultipleVideo = true;
      this.defaultVideoSet = true;
      var currentVideo = media.items[this.currentVideoIndex];
      this.setDefaultVideo(currentVideo);
      this.setOtherVideo(media.items);
    }
    if (media.uploadType === "single") {
      this.defaultVideoSet = true;
      this.isMultipleVideo = false;
      this.setDefaultAudio(currentVideo);
      this.setOtherAudio(media.items);
    }
  }

  setAudio(media: UploadedItems) {
    var currentItem = media.items[this.currentAudioIndex];
    this.isAudioUpload = true;
    if (media.uploadType === "multiple") {
      this.defaultAudioSet = true;
      this.isMultipleAudio = true;
      this.setDefaultAudio(currentItem);
      this.setOtherAudio(media.items);
    }
    if (media.uploadType === "single") {
      this.defaultAudioSet = true;
      this.isMultipleAudio = false;
      this.setDefaultAudio(currentItem);
    }
  }

  setDefaultVideo(video: MediaItem) {
    this.currentVideoItem = {
      _id: video._id,
      key: video.path,
      path: fetchVideoItemFullPath(video.path),
      type: `video/${video.path.split(".").pop()}`,
    };

    //this.capture();
  }

  setDefaultAudio(audio: MediaItem) {
    this.currentAudioItem = {
      _id: audio._id,
      key: audio.key,
      path: fetchAudioItemFullPath(audio.path),
      type: `audio/${audio.path.split(".").pop()}`,
    };
  }

  setOtherVideo(media: MediaItem[]) {
    this.otherVideoPath = media.reduce(
      (theMap: MediaItem[], theItem: MediaItem) => {
        theMap.push({
          _id: theItem._id,
          key: theItem.path,
          path: fetchVideoItemFullPath(theItem.path),
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
          key: theItem.path,
          path: fetchAudioItemFullPath(theItem.path),
        });
        return theMap;
      },
      []
    );
  }

  setImage(media: UploadedItems) {
    console.log(media);
    this.isImageUpload = true;
    if (media.uploadType === "multiple") {
      this.isMultipleImage = true;
      this.defaultImageSet = true;
      this.setDefaultImage(media.items[0].path);
      this.setOtherImages(media.items);
    }
    if (media.uploadType === "single") {
      this.defaultImageSet = true;
      this.isMultipleImage = false;
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
      type: this.uploadedItems.type,
      uploadType: this.uploadedItems.uploadType,
    };
    if (this.pageViewMode === "edit") {
      // dispatch update
      this.userStore.dispatch(
        new PortfolioActions.UpdatePortfolioMedia({
          uploadType: this.uploadType,
          data: payload,
        })
      );
    } else {
      // dispatch create new media
      this.userStore.dispatch(
        new PortfolioActions.CreatePortfolioMedia({
          uploadType: this.uploadType,
          data: payload,
        })
      );
    }

    // TODO:: show success pop-up before toggling modal
    this.closeGigsModal();
  }

  closeGigsModal() {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === "gigs-modal"
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
  }

  // private closeGigsModal() {
  //   if (_.has(this.currentAppModal, "id")) {
  //     const modalToClose: IModal = {
  //       index: this.currentAppModal.,
  //       name: modalToDeActivate.name,
  //       display: ModalDisplay.none,
  //       viewMode: ModalViewModel.none,
  //       contentType: "",
  //       data: null,
  //       modalCss: "",
  //       modalDialogCss: "",
  //       showMagnifier: false,
  //     };
  //     this.store.dispatch(
  //       new ModalsActions.ToggleModal({
  //         appModal: this.componentModal,
  //         modal: modalToClose,
  //       })
  //     );
  //   }
  // }

  ngOnDestroy() {
    this.store.dispatch(new ModalsActions.ResetCurrentModal());
  }
}
