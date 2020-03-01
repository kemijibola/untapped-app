import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from "@angular/core";
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
  AppPageState,
  PageViewMode,
  UploadedItems,
  ModalViewModel,
  IModal,
  MediaQueryParams
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
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import * as _ from "underscore";
import * as fromUser from "../../user.reducers";
import { Router, ActivatedRoute } from "@angular/router";
import { selectActiveModal } from "src/app/shared/store/modals/modals.selectors";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";

@Component({
  selector: "app-portfolio-modal-content",
  templateUrl: "./portfolio-modal-content.component.html",
  styleUrls: ["./portfolio-modal-content.component.css"]
})
export class PortfolioModalContentComponent implements OnInit, OnDestroy {
  portfolioForm: FormGroup;
  modal: IModal;
  multiple: boolean;
  accept: string;
  toggleState: IToggle;
  toggleName = ToggleList.UploadTypeToggle;
  selectedUploadType = MediaUploadType.SINGLE;
  portfolioUploadConfig: PortfolioUploadInputConfig = {
    isMultiple: false,
    mediaAccept: MediaAcceptType.IMAGE
  };
  mediaUploaded: boolean;
  isVideoUpload: boolean = false;
  isAudioUpload: boolean = false;
  isImageUpload: boolean = false;
  pageSlideToggles: IToggle[];
  defaultImageSet: boolean;
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
  otherImagesPath: string[] = [];
  isMultipleImage: boolean;
  actionText: string = "";
  uploadType: MediaUploadType;
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
        // this.uploadedItems = val;
        if (val) {
          this.setMedia(val);
          this.initForm();
        }
      });

    // this.store.pipe(select(selectUploadSuccess)).subscribe((val: boolean) => {
    //   if (val) {
    //     this.setMedia();
    //   }
    // });

    this.userStore.pipe(select(selectMedia)).subscribe((val: IMedia) => {
      if (val) {
        this.uploadedItems = {
          _id: val._id,
          type: val.mediaType,
          items: val.items,
          title: val.title,
          shortDescription: val.shortDescription
        };
        this.setMedia(this.uploadedItems);
      }
    });

    this.activateModalContent();
  }

  activateModalContent(): void {
    this.store.pipe(select(selectActiveModal)).subscribe((val: IModal) => {
      this.defaultImagePath = "";
      this.otherImagesPath = [];
      this.canViewDetails = false;
      this.defaultImageSet = false;
      if (val.name === "gigs-modal") {
        if (val.viewMode === ModalViewModel.edit) {
          this.actionText = "UPDATE PORTFOLIO";
        } else {
          this.actionText = "ADD TO PORTFOLIO";
        }
      }
    });
  }
  // ngOnChanges(simpleChanges: SimpleChanges) {
  //   console.log(this.viewMode);
  //   if (simpleChanges["viewMode"]) {
  //     this.pageViewMode = this.viewMode;
  //     if (this.pageViewMode === ModalViewModel.edit) {
  //       this.actionText = "UPDATE PORTFOLIO";
  //       this.fetchUploadedMedia();
  //     } else {
  //       this.actionText = "ADD TO PORTFOLIO";
  //     }
  //   }
  // }

  setMedia(media: UploadedItems) {
    if (media.items) {
      this.canViewDetails = true;
      const mediaType = this.uploadedItems.type.toUpperCase();
      switch (mediaType) {
        case MediaType.AUDIO:
          break;
        case MediaType.IMAGE:
          this.setImage(media);
          break;
        case MediaType.VIDEO:
          break;
        default:
          return "Invalid selection";
      }
    }
  }

  setDefaultImage(key: string) {
    this.defaultImagePath = fetchImageObjectFromCloudFormation(
      key,
      this.defaultImageParams
    );
  }

  setOtherImages(media: UploadedItems) {
    media.items.map(x => {
      const modifiedImage = fetchImageObjectFromCloudFormation(
        x.path,
        this.editParams
      );
      this.otherImagesPath.push(modifiedImage);
    });
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
  setImage(media: UploadedItems) {
    this.isImageUpload = true;
    if (media.items.length > 1) {
      // items is greater than 1 means it is multiple upload
      this.isMultipleImage = true;
      this.defaultImageSet = true;
      this.setDefaultImage(media.items[0].path);
      this.setOtherImages(media);
    } else {
      // single upload
      this.isMultipleImage = false;
      this.defaultImageSet = true;
      this.setDefaultImage(media.items[0].path);
      this.setOtherImages(media);
    }
  }

  // http://localhost:4200/user/kemijibola?tab=portfolio
  navigate(): void {
    this.router.navigate(["/user/", this.route.snapshot.params["username"]], {
      queryParams: { tab: "portfolio" }
    });
  }

  setAudio() {}

  setVideo() {}

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
    if (this.pageViewMode === ModalViewModel.edit) {
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
      this.navigate();
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ModalsActions.ResetCurrentModal());
  }
}
