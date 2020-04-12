import { Component, OnInit } from "@angular/core";
import { AbstractUploadComponent } from "src/app/shared/Classes/abstract/abstract-upload/abstract-upload.component";
import {
  UPLOADOPERATIONS,
  IUserImage,
  IFileInputModel,
  IAuthData,
  SnackBarData,
} from "src/app/interfaces";
import {
  CloudUploadParams,
  SignedUrl,
  MediaAcceptType,
} from "../../../interfaces/shared/file";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromUpload from "../../../shared/store/upload/upload.reducers";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import * as UserImageActions from "../../../shared/store/user-image/user-image.action";
import { environment } from "src/environments/environment.prod";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { AuthService } from "src/app/services/auth.service";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as fromUserImage from "../../../shared/store/user-image/user-image.reducer";
import * as SnackBarActions from "../../../shared/notifications/snackbar/snackbar.action";
import * as _ from "underscore";

@Component({
  selector: "app-change-profile-picture",
  templateUrl: "./change-profile-picture.component.html",
  styleUrls: ["./change-profile-picture.component.css"],
})
export class ChangeProfilePictureComponent extends AbstractUploadComponent {
  imagePath: string;
  isDefault: boolean;
  fileConfig: IFileInputModel;
  uploadOperation = UPLOADOPERATIONS.ProfileImage;
  currentUserId: string;
  key: string;
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
  authData: IAuthData;
  constructor(
    public store: Store<fromApp.AppState>,
    public authService: AuthService
  ) {
    super();
  }

  setUploadedImage(): void {
    this.fetchUserProfile();
    this.store
      .pipe(select(fromUpload.selectUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.fetchUserProfile();
        }
      });
  }

  uploadFiles(files: File[]): void {
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        if (val) {
          if (val.action === this.uploadOperation) {
            this.key = val.presignedUrl[0].key;
            this.authData.user_data.profile_image_path =
              val.presignedUrl[0].key;
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

            // set uploaded
          }
        }
      });
  }

  onClickUploadImageBtn() {
    this.fileConfig = {
      state: true,
      process: this.uploadOperation,
      multiple: false,
      accept: MediaAcceptType.IMAGE,
    };

    // this.store.dispatch(new UploadActions.UploadFilesError({}));
  }

  fetchUserProfile() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.authData = { ...val };
          this.imagePath = val.user_data.profile_image_path
            ? fetchImageObjectFromCloudFormation(
                val.user_data.profile_image_path,
                this.editParams
              )
            : environment.TALENT_DEFAULT_IMG;
          this.isDefault = val.user_data.profile_image_path ? false : true;
        }
      });
  }
}
