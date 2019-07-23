import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IFileInputModel, IUserImage } from 'src/app/interfaces';
import * as fromShared from '../shared.reducers';
import * as UserProfileImageActions from '../store/user-profile-image/user-profile-image.actions';
import * as UploadActions from '../store/upload/upload.actions';
import * as fromUserProfileImage from '../store/user-profile-image/user-profile-image.reducers';
import * as fromApp from '../../store/app.reducers';
import { Observable, Subject } from 'rxjs';
import { selectUserProfileImage } from '../../shared/store/user-profile-image/user-profile.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile-picture',
  templateUrl: './user-profile-picture.component.html',
  styleUrls: ['./user-profile-picture.component.css']
})
export class UserProfilePictureComponent implements OnInit, OnDestroy {
  imagePath: string;
  isDefault: boolean;
  userProfileImageState: Observable<fromUserProfileImage.State>;
  ngDestroyed = new Subject();
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(selectUserProfileImage),
        takeUntil(this.ngDestroyed)
      )
      .subscribe((val: IUserImage) => {
        this.imagePath = val.imagePath || 'assets/img/profile/profile-2.png';
        this.isDefault = val.isDefault;
      });
  }

  onClickUploadImageBtn() {
    // dispatch user action triggered
    this.store.dispatch(new UploadActions.SetAppUploadState(true));
  }

  ngOnDestroy() {
    this.store.dispatch(new UploadActions.SetAppUploadState(false));
  }
}
