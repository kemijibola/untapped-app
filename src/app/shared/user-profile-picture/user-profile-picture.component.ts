import { CloudUploadParams, SignedUrl } from './../../interfaces/shared/file';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  IFileInputModel,
  IUserImage,
  UPLOADOPERATIONS,
  IUploadedFiles,
  PresignedUrl
} from 'src/app/interfaces';
import * as fromUserProfileImage from '../store/user-profile-image/user-profile-image.reducers';
import * as fromApp from '../../store/app.reducers';
import { Observable, Subject } from 'rxjs';
import { selectUserProfileImage } from '../../shared/store/user-profile-image/user-profile.selectors';
import { selectPresignedUrls } from '../../shared/store/upload/upload.selectors';
import { AbstractUploadComponent } from '../Classes/abstract/abstract-upload/abstract-upload.component';
import * as UploadActions from '../../shared/store/upload/upload.actions';
import * as UserProfileImageActions from '../../shared/store/user-profile-image/user-profile-image.actions';

@Component({
  selector: 'app-user-profile-picture',
  templateUrl: './user-profile-picture.component.html',
  styleUrls: ['./user-profile-picture.component.css']
})
export class UserProfilePictureComponent extends AbstractUploadComponent {
  imagePath: string;
  isDefault: boolean;
  fileConfig: IFileInputModel;
  uploadOperation = UPLOADOPERATIONS.ProfileImage;
  constructor(public store: Store<fromApp.AppState>) {
    super();
  }

  setUploadedImage(): void {
    this.store
      .pipe(select(selectUserProfileImage))
      .subscribe((val: IUserImage) => {
        this.imagePath = this.imagePath
          ? `https://untapped-media-dev.s3.amazonaws.com/${val.imagePath}`
          : 'assets/img/profile/profile-2.png';
        this.isDefault = val.isDefault;
      });
  }

  uploadFiles(files: File[]): void {
    this.store.pipe(select(selectPresignedUrls)).subscribe((val: SignedUrl) => {
      if (val.action === UPLOADOPERATIONS.ProfileImage) {
        const uploadParams: CloudUploadParams = {
          file: files[0]['data'],
          url: val.presignedUrl[0].url
        };
        this.store.dispatch(
          new UploadActions.UploadFiles({ cloudParams: uploadParams })
        );

        this.store.dispatch(
          new UserProfileImageActions.UpdateUserProfileImage({
            id: '5d39c97b432a2e5fd0484375',
            profileImagePath: val.presignedUrl[0].key
          })
        );
      }
    });
  }

  onClickUploadImageBtn() {
    this.fileConfig = {
      state: true,
      process: UPLOADOPERATIONS.ProfileImage,
      multiple: false,
      accept: 'image/*'
    };
  }
}
