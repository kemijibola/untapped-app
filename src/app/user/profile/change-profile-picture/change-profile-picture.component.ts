import { IFileMetaData } from "./../../../interfaces/shared/file";
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
  IPresignRequest,
  IFileModel,
} from "../../../interfaces/shared/file";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromUpload from "../../../shared/store/upload/upload.reducers";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import * as UserImageActions from "../../../shared/store/user-image/user-image.action";
import { environment } from "src/environments/environment.prod";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
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
  imagePath: string;
  isDefault: boolean;
  private filesToUpload: File[];
  private file: IPresignRequest;
  fileConfig: IFileInputModel;
  uploadOperation = UPLOADOPERATIONS.ProfileImage;
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
  constructor(public store: Store<fromApp.AppState>) {
    this.fetchUserProfileImage();
    this.store
      .pipe(select(fromUpload.selectUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.fetchUserProfileImage();
        }
      });
  }

  ngOnInit() {
    this.store
      .pipe(select(fromUpload.selectFilesToUpload))
      .subscribe((val: IFileModel) => {
        if (val !== null) {
          if (val.action === this.uploadOperation) {
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
              action: val.action,
              files: [...files],
            };
            if (this.fileConfig.state) {
              this.store.dispatch(
                new UploadActions.GetPresignedUrl({ preSignRequest: this.file })
              );
            }

            this.store.dispatch(new UploadActions.ResetFileInput());

            // perform actual upload to cloud
            if (this.filesToUpload.length > 0) {
              this.uploadFiles(this.filesToUpload);
            }
          }
        }
      });
  }

  setUploadedImage(): void {
    this.fetchUserProfileImage();
    this.store
      .pipe(select(fromUpload.selectUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.fetchUserProfileImage();
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
      minHeight: 300,
      minWidth: 400,
    };
  }

  fetchUserProfileImage() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
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
