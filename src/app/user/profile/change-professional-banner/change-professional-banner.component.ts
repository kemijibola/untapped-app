import { Component, OnInit } from "@angular/core";
import { AbstractUploadComponent } from "src/app/shared/Classes/abstract/abstract-upload/abstract-upload.component";
import {
  IFileInputModel,
  UPLOADOPERATIONS,
  IAuthData,
  MediaAcceptType,
  CloudUploadParams,
  SignedUrl,
  IFileMetaData,
  IFileModel,
  IPresignRequest,
} from "src/app/interfaces";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { fetchImageObjectFromCloudFormation } from "src/app/lib/Helper";
import { environment } from "src/environments/environment.prod";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as fromUpload from "../../../shared/store/upload/upload.reducers";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import * as UserImageActions from "../../../shared/store/user-image/user-image.action";

@Component({
  selector: "app-change-professional-banner",
  templateUrl: "./change-professional-banner.component.html",
  styleUrls: ["./change-professional-banner.component.css"],
})
export class ChangeProfessionalBannerComponent implements OnInit {
  private filesToUpload: File[];
  private file: IPresignRequest;
  imagePath: string;
  fileConfig: IFileInputModel;
  uploadOperation = UPLOADOPERATIONS.BannerImage;
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 1031,
        height: 222,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  constructor(public store: Store<fromApp.AppState>) {
    this.fetchUserBannerImage();
    this.store
      .pipe(select(fromUpload.selectUploadStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.fetchUserBannerImage();
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
    console.log(files);
    let uploadParams: CloudUploadParams[] = [];
    this.store
      .pipe(select(fromUpload.selectPresignedUrls))
      .subscribe((val: SignedUrl) => {
        console.log(val);
        if (val) {
          if (val.action === this.uploadOperation) {
            const item: CloudUploadParams = {
              file: files[0]["data"],
              url: val.presignedUrl[0].url,
            };
            uploadParams = [...uploadParams, item];
            this.store.dispatch(new UploadActions.UploadFiles(uploadParams));

            this.store.dispatch(
              new UserImageActions.UpdateUserBannerImage({
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
      minHeight: 100,
      minWidth: 100,
    };
  }

  fetchUserBannerImage() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.imagePath = val.user_data.banner_image_path
            ? fetchImageObjectFromCloudFormation(
                val.user_data.banner_image_path,
                this.editParams
              )
            : environment.PROFESSIONAL_BANNER_IMAGE_DEFAULT;
        }
      });
  }
}
