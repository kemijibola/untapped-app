import {
  IFileMetaData,
  UPLOADCOMPONENT,
  UPLOADACTION,
} from "./../../../interfaces/shared/file";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import {
  IUserImage,
  IFileInputModel,
  IAuthData,
  SnackBarData,
} from "src/app/interfaces";
import {
  CloudUploadParams,
  SignedUrl,
  MediaAcceptType,
  IPresignRequest,
  IFileModel,
} from "../../../interfaces/shared/file";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromUpload from "../../../shared/store/upload/upload.reducers";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import * as UserImageActions from "../../../shared/store/user-image/user-image.action";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import {
  fetchImageObjectFromCloudFormation,
  fetchOriginalImage,
} from "src/app/lib/Helper";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as fromUserImage from "../../../shared/store/user-image/user-image.reducer";
import * as SnackBarActions from "../../../shared/notifications/snackbar/snackbar.action";
import * as _ from "underscore";

@Component({
  selector: "app-change-profile-picture",
  templateUrl: "./change-profile-picture.component.html",
  styleUrls: ["./change-profile-picture.component.css"],
})
export class ChangeProfilePictureComponent implements OnInit {
  imagePath: string = "";
  defaultImagePath: string;
  isDefault: boolean;
  private filesToUpload: File[];
  private file: IPresignRequest;
  fileConfig: IFileInputModel;
  uploadComponent = UPLOADCOMPONENT.profileimage;
  uploadAction = UPLOADACTION.updateprofilepicture;
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 120,
        height: 120,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  defaultParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 20,
        height: 20,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  uploading: boolean = false;
  showCompleted: boolean = false;
  showDiv: boolean = false;
  defaultLoaded: boolean;
  @ViewChild("profileImage", { static: false }) profileImage: ElementRef;

  initiated$ = this.store.pipe(select(fromUpload.selectUploadInitiatedStatus));

  inProgress$ = this.store.pipe(
    select(fromUpload.selectUploadInProgressStatus)
  );

  completed$ = this.store.pipe(select(fromUpload.selectUploadCompletedStatus));

  failed$ = this.store.pipe(select(fromUpload.selectUploadFailedStatus));

  ready$ = this.store.pipe(select(fromUpload.selectUploadReadyStatus));

  constructor(
    public store: Store<fromApp.AppState>,
    private renderer: Renderer2
  ) {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.fetchUserProfileImage(val.user_data.profile_image_path);
        }
      });
  }

  ngOnInit() {
    this.store
      .pipe(select(fromUpload.selectFilesToUpload))
      .subscribe((val: IFileModel) => {
        if (val !== null) {
          this.uploading = true;
          if (val.action === this.uploadAction) {
            this.filesToUpload = val.files;
            const files: IFileMetaData[] = val.files.reduce(
              (arr: IFileMetaData[], file) => {
                const fileData = {
                  file: file["data"].name,
                  file_type: file["data"].type,
                };
                arr = [...arr, fileData];
                return arr;
              },
              []
            );

            var fileType = files[0].file_type.split("/");
            this.file = {
              mediaType: fileType[0],
              component: UPLOADCOMPONENT.profileimage,
              files: [...files],
            };

            this.store.dispatch(
              new UploadActions.GetPresignedUrl({ preSignRequest: this.file })
            );
            this.store.dispatch(new UploadActions.ResetFileInput());

            // perform actual upload to cloud
            if (this.filesToUpload.length > 0) {
              this.uploadFiles(this.filesToUpload);
            }
          }
        }
      });
  }

  uploadFiles(files: File[]): void {
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        if (val) {
          if (val.component === this.uploadComponent) {
            const item: CloudUploadParams = {
              file: files[0]["data"],
              url: val.presignedUrl[0].url,
            };
            uploadParams = [...uploadParams, item];
            this.store.dispatch(new UploadActions.UploadFiles(uploadParams));

            this.store.dispatch(
              new UserImageActions.UpdateUserProfileImage({
                imageKey: val.presignedUrl[0].key,
              })
            );
            this.uploading = false;
          }
        }
      });
  }

  onClickUploadImageBtn() {
    this.fileConfig = {
      state: true,
      type: "Image",
      component: this.uploadComponent,
      action: this.uploadAction,
      multiple: false,
      accept: MediaAcceptType.IMAGE,
      minHeight: 450,
      minWidth: 295,
    };
  }

  fetchUserProfileImage(userImageKey: string) {
    if (!this.defaultLoaded) {
      this.imagePath = userImageKey
        ? fetchImageObjectFromCloudFormation(userImageKey, this.editParams)
        : "";
      this.isDefault = userImageKey ? false : true;
      this.defaultLoaded = true;
    } else {
      this.triggerImageTimer(userImageKey);
    }
  }

  triggerImageTimer(image: string) {
    setTimeout(() => {
      const profileImage = this.profileImage.nativeElement;
      const userImage = fetchImageObjectFromCloudFormation(
        image,
        this.editParams
      );
      this.renderer.setAttribute(profileImage, "src", userImage);
      this.store.dispatch(new UploadActions.UploadCompleted());
    }, 80000);
    this.uploading = false;
  }
}
