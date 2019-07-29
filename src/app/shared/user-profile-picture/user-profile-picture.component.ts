import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  IFileInputModel,
  IUserImage,
  UPLOADOPERATIONS
} from 'src/app/interfaces';
import * as fromUserProfileImage from '../store/user-profile-image/user-profile-image.reducers';
import * as fromApp from '../../store/app.reducers';
import { Observable, Subject } from 'rxjs';
import { selectUserProfileImage } from '../../shared/store/user-profile-image/user-profile.selectors';

@Component({
  selector: 'app-user-profile-picture',
  templateUrl: './user-profile-picture.component.html',
  styleUrls: ['./user-profile-picture.component.css']
})
export class UserProfilePictureComponent implements OnInit {
  imagePath: string;
  isDefault: boolean;
  userProfileImageState: Observable<fromUserProfileImage.State>;
  ngDestroyed = new Subject();
  fileConfig: IFileInputModel;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(selectUserProfileImage))
      .subscribe((val: IUserImage) => {
        this.imagePath = val.imagePath || 'assets/img/profile/profile-2.png';
        this.isDefault = val.isDefault;
      });
  }

  onClickUploadImageBtn() {
    this.fileConfig = {
      state: true,
      process: UPLOADOPERATIONS.UploadProfileImage,
      multiple: false,
      accept: 'image/*'
    };
  }
}
