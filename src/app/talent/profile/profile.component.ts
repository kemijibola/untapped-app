import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      'stageName': new FormControl(null, Validators.required),
      'location': new FormControl(null, Validators.required),
      'fullName': new FormControl(null, Validators.required),
      'emailAddress': new FormControl(null, Validators.required),
      'shortBio': new FormControl(null, Validators.required),
      'facebook': new FormControl(null),
      'instagram': new FormControl(null),
      'twitter': new FormControl(null),
      'youtube': new FormControl(null),
      'additionalSocial': new FormArray([])
    });
  }

  onAddAdditionalSocial() {
    const control = new FormControl(null);
    (<FormArray>this.profileForm.get('additionalSocial')).push(control);
  }

  onUpdateProfile() {
    console.log('clicked');
  }
}
