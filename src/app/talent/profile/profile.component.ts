import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
// import * as fromTalent from '../talent-feature.reducers';
import * as ProfileActions from './store/profile.actions';
import { IProfile } from 'src/app/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      'stageName': new FormControl(null, Validators.required),
      'location': new FormControl(null, Validators.required),
      'fullName': new FormControl(null, Validators.required),
      'emailAddress': new FormControl(null, Validators.required),
      // 'phoneNumber': new FormControl(null, Validators.required),
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
    console.log('clicked');
    // const stageName: string = this.profileForm.controls['stageName'].value;
    // const location: string = this.profileForm.controls['location'].value;
    // const fullName: string = this.profileForm.controls['fullName'].value;
    // const shortBio: string = this.profileForm.controls['shortBio'].value || '';
    // const phoneNumber: string = this.profileForm.controls['phoneNumber'].value || '08080737373';
    // const facebook: string = this.profileForm.controls['facebook'].value || '';
    // const instagram: string = this.profileForm.controls['instagram'].value || '';
    // const twitter: string = this.profileForm.controls['twitter'].value || '';
    // const youtube: string = this.profileForm.controls['youtube'].value || '';
    // const additionalSocial: string[] = this.profileForm.controls['additionalSocial'].value || [];
    // const payload: IProfile = {
    //   stage_name: stageName,
    //   location: location,
    //   full
    // }
    //this.store.dispatch(new ProfileActions.UpdateProfile())
  }
}
