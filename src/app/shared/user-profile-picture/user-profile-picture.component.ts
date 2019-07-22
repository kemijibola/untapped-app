import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IFileInputModel } from 'src/app/interfaces';
import * as fromShared from '../shared.reducers';
import * as UserProfileImageActions from '../store/user-profile-image/user-profile-image.actions';
import * as fromUserProfileImage from '../store/user-profile-image/user-profile-image.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile-picture',
  templateUrl: './user-profile-picture.component.html',
  styleUrls: ['./user-profile-picture.component.css']
})
export class UserProfilePictureComponent implements OnInit {
  profileImageBtnClicked = false;
  userProfileImageState: Observable<fromUserProfileImage.State>;
  constructor(private sharedStore: Store<fromShared.SharedState>) {}

  ngOnInit() {
    this.userProfileImageState = this.sharedStore.select('userProfileImage');
  }

  onClickUploadImageBtn() {
    // dispatch user action triggered
    this.profileImageBtnClicked = true;
    this.sharedStore.dispatch(
      new UserProfileImageActions.SetUploadButton(this.profileImageBtnClicked)
    );
  }
}
