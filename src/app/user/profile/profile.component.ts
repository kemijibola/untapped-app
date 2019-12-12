import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import * as fromProfile from "../store/profile/profile.reducers";
import * as fromUser from "../user.reducers";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { selectUploadAction } from "../../shared/store/upload/upload.selectors";
import { takeUntil } from "rxjs/operators";
import {
  UPLOADOPERATIONS,
  IFileInputModel,
  IAuthData,
  IProfile
} from "src/app/interfaces";
import * as UploadActions from "../../shared/store/upload/upload.actions";
import * as fromUpload from "../../shared/store/upload/upload.reducers";
import { selectUserData } from "src/app/account/store/auth.selectors";
import { selectUserProfile } from "../store/profile/profile.selectors";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfileState: Observable<fromProfile.State>;
  isTalent: boolean;
  isProfessional: boolean;
  ngDestroyed = new Subject();
  fileConfig: IFileInputModel;
  fileUploadOperation: UPLOADOPERATIONS;
  userEmail: string;
  userFullName: string;
  profileData: IProfile;

  constructor(
    private userState: Store<fromUser.UserState>,
    private store: Store<fromApp.AppState>
  ) {
    // get type of user from localStorage
    this.store.pipe(select(selectUserData)).subscribe((val: IAuthData) => {
      if (val.authenticated) {
        this.isTalent = val.user_data.userType.name !== "Talent" ? true : false;
        this.userEmail = val.user_data.email;
        this.userFullName = val.user_data.full_name;
      }
    });

    // fetch user profile
    this.userState
      .pipe(select(selectUserProfile))
      .subscribe((val: IProfile) => {
        console.log(val);
        this.profileData = { ...val };
      });
  }

  ngOnInit() {
    this.userProfileState = this.userState.select("profile");
    this.profileForm = new FormGroup({
      professionalName: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      fullName: new FormControl(this.userFullName, Validators.required),
      emailAddress: new FormControl(Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      shortBio: new FormControl(null),
      facebook: new FormControl(null),
      instagram: new FormControl(null),
      twitter: new FormControl(null),
      youtube: new FormControl(null),
      additionalSocial: new FormArray([])
    });
    this.profileForm.controls["emailAddress"].disable();

    this.setDefaultValue();
  }

  setDefaultValue() {
    this.profileForm.get("emailAddress").setValue(this.userEmail);
  }
  onAddAdditionalSocial() {
    const control = new FormControl(null);
    (<FormArray>this.profileForm.get("additionalSocial")).push(control);
  }
  onUpdateProfile() {}
}
