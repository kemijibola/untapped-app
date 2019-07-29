import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import * as fromProfile from '../store/profile/profile.reducers';
import * as fromUser from '../user.reducers';
import * as fromApp from '../../store/app.reducers';
import { Store, select } from '@ngrx/store';
import { selectUploadAction } from '../../shared/store/upload/upload.selectors';
import { takeUntil } from 'rxjs/operators';
import { UPLOADOPERATIONS, IFileInputModel } from 'src/app/interfaces';
import * as UploadActions from '../../shared/store/upload/upload.actions';
import * as fromUpload from '../../shared/store/upload/upload.reducers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfileState: Observable<fromProfile.State>;
  isTalent: boolean;
  isProfessional: boolean;
  ngDestroyed = new Subject();
  fileConfig: IFileInputModel;
  fileUploadOperation: UPLOADOPERATIONS;

  constructor(
    private userState: Store<fromUser.UserState>,
    private store: Store<fromApp.AppState>
  ) {
    // TODO:: In backend, add each user type's gobal permission
    // i.e global permissions are isTalent, isProfessional, isAudience
    // TODO:: get current user's permissions to check type of user
    // and set isTalent | isProfessional properties
  }

  ngOnInit() {
    this.userProfileState = this.userState.select('profile');
    this.profileForm = new FormGroup({
      professionalName: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      fullName: new FormControl(null, Validators.required),
      emailAddress: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      shortBio: new FormControl(null),
      facebook: new FormControl(null),
      instagram: new FormControl(null),
      twitter: new FormControl(null),
      youtube: new FormControl(null),
      additionalSocial: new FormArray([])
    });
    this.profileForm.controls['emailAddress'].disable();
  }

  onAddAdditionalSocial() {
    const control = new FormControl(null);
    (<FormArray>this.profileForm.get('additionalSocial')).push(control);
  }
  onUpdateProfile() {}
}
