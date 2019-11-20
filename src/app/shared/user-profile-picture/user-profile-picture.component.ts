import {
  CloudUploadParams,
  SignedUrl,
  MediaAcceptType
} from "./../../interfaces/shared/file";
import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  IFileInputModel,
  IUserImage,
  UPLOADOPERATIONS,
  IUploadedFiles,
  PresignedUrl,
  IAuthData
} from "src/app/interfaces";
import * as fromUserProfileImage from "../store/user-profile-image/user-profile-image.reducers";
import * as fromApp from "../../store/app.reducers";
import { Observable, Subject } from "rxjs";
import { selectUserProfileImage } from "../../shared/store/user-profile-image/user-profile.selectors";
import { selectPresignedUrls } from "../../shared/store/upload/upload.selectors";
import { AbstractUploadComponent } from "../Classes/abstract/abstract-upload/abstract-upload.component";
import * as UploadActions from "../../shared/store/upload/upload.actions";
import * as UserProfileImageActions from "../../shared/store/user-profile-image/user-profile-image.actions";
import { environment } from "src/environments/environment.prod";
import { selectUserData } from "src/app/account/store/auth.selectors";

@Component({
  selector: "app-user-profile-picture",
  templateUrl: "./user-profile-picture.component.html",
  styleUrls: ["./user-profile-picture.component.css"]
})
export class UserProfilePictureComponent extends AbstractUploadComponent {
  imagePath: string;
  isDefault: boolean;
  fileConfig: IFileInputModel;
  uploadOperation = UPLOADOPERATIONS.ProfileImage;
  currentUserId: string;

  constructor(public store: Store<fromApp.AppState>) {
    super();
  }

  setUploadedImage(): void {
    this.store
      .pipe(select(selectUserProfileImage))
      .subscribe((val: IUserImage) => {
        this.imagePath = this.imagePath
          ? `https://untapped-pool-s3-bucket.s3.eu-west-2.amazonaws.com/${val.imagePath}`
          : environment.TALENT_DEFAULT_IMG;
        this.isDefault = val.isDefault;
      });
  }

  uploadFiles(files: File[]): void {
    this.store.pipe(select(selectPresignedUrls)).subscribe((val: SignedUrl) => {
      if (val) {
        if (val.action === this.uploadOperation) {
          const uploadParams: CloudUploadParams = {
            file: files[0]["data"],
            url: val.presignedUrl[0].url
          };
          console.log("params from controller", uploadParams);
          this.store.dispatch(new UploadActions.UploadFiles(uploadParams));

          this.store.dispatch(
            new UserProfileImageActions.UpdateUserProfileImage({
              profileImagePath: val.presignedUrl[0].key
            })
          );
        }
      }
    });
  }

  onClickUploadImageBtn() {
    this.fileConfig = {
      state: true,
      process: this.uploadOperation,
      multiple: false,
      accept: MediaAcceptType.IMAGE
    };
  }
}
