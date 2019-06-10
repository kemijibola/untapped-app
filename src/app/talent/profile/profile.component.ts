import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
// import * as fromTalent from '../talent-feature.reducers';
import * as ProfileActions from './store/profile.actions';
import { IProfile } from 'src/app/models';
import { SOCIAL_MEDIAS } from './../../lib/constants';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    //console.log(this.authService.getUserData.;
    this.profileForm = new FormGroup({
      'stageName': new FormControl(null, Validators.required),
      'location': new FormControl(null, Validators.required),
      'fullName': new FormControl(null, Validators.required),
      'emailAddress': new FormControl(null, Validators.required),
      'phoneNumber': new FormControl(null, Validators.required),
      'shortBio': new FormControl(null),
      'facebook': new FormControl(null),
      'instagram': new FormControl(null),
      'twitter': new FormControl(null),
      'youtube': new FormControl(null),
      'additionalSocial': new FormArray([])
    });
    this.profileForm.controls['emailAddress'].disable();
  }

  onAddAdditionalSocial() {
    const control = new FormControl(null);
    (<FormArray>this.profileForm.get('additionalSocial')).push(control);
  }

  onUpdateProfile() {
    // const social_media = {};
    // const stageName: string = this.profileForm.controls['stageName'].value;
    // const location: string = this.profileForm.controls['location'].value;
    // const shortBio: string = this.profileForm.controls['shortBio'].value || '';
    // const phoneNumber: string = this.profileForm.controls['phoneNumber'].value || '08080737373';
    // const facebook: string = this.profileForm.controls['facebook'].value || '';
    // const instagram: string = this.profileForm.controls['instagram'].value || '';
    // const twitter: string = this.profileForm.controls['twitter'].value || '';
    // const youtube: string = this.profileForm.controls['youtube'].value || '';
    // const additionalSocial: string[] = this.profileForm.controls['additionalSocial'].value || [];

    // if (facebook)
    //     social_media['facebook'] = this.profileForm.controls['facebook'].value || '';
    // if (instagram)
    //     social_media['instagram']
    // // const socialMedias =
    // // social_media = [...social_media, ...additionalSocial]
    // const payload: IProfile = {
    //   stage_name: stageName,
    //   location: location,
    //   phone_number: phoneNumber,
    //   short_bio: shortBio,
    //   social_media: [
    //     facebook,
    //     instagram,
    //     twitter,
    //     youtube,
    //     additionalSocial
    //   ]
    }
    // this.store.dispatch(new ProfileActions.UpdateProfile())
  //}
}
