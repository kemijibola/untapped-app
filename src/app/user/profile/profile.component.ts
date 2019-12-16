import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import * as fromProfile from "../store/profile/profile.reducers";
import * as ProfileActions from "../store/profile/profile.actions";
import * as fromUser from "../user.reducers";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { selectUploadAction } from "../../shared/store/upload/upload.selectors";
import { takeUntil, take } from "rxjs/operators";
import {
  UPLOADOPERATIONS,
  IFileInputModel,
  IAuthData,
  IProfile,
  IUserSocialMedia,
  ICategory,
  SocialMedia
} from "src/app/interfaces";
import * as UploadActions from "../../shared/store/upload/upload.actions";
import * as fromUpload from "../../shared/store/upload/upload.reducers";
import { selectUserData } from "src/app/account/store/auth.selectors";
import { selectUserProfile } from "../store/profile/profile.selectors";
import * as CategoryTypeActions from "../../shared/store/category-type/category-type.actions";
import { selectSelectedCategoryTypes } from "src/app/shared/store/category-type/category-type.selectors";
import * as _ from "underscore";

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

  private _id: string;
  name: string = "";
  rcNumber: string = "";
  location: string = "";
  phoneNumber: string = "";
  shortBio: string = "";
  categories: string[] = [];
  instagram: string = "";
  facebook: string = "";
  twitter: string = "";
  youtube: string = "";
  otherSocialMedias: FormArray = new FormArray([]);
  isNewProfile: boolean;
  // physicalStats?: IPhysicalStatistics;
  bannerImagePath?: string;
  typeOfUser: string;

  selectedCategories: string[] = [];

  constructor(
    private userState: Store<fromUser.UserState>,
    private store: Store<fromApp.AppState>
  ) {
    this.isNewProfile = false;
  }

  ngOnInit() {
    this.store.pipe(select(selectUserData)).subscribe((val: IAuthData) => {
      if (val.authenticated) {
        this.typeOfUser = val.user_data.userType.name;
        this.isTalent = val.user_data.userType.name === "Talent" ? true : false;
        this.userEmail = val.user_data.email;
        this.userFullName = val.user_data.full_name;
      }
    });

    this.userState.dispatch(new ProfileActions.FetchUserProfile());

    this.userState
      .pipe(select(selectUserProfile), take(2))
      .subscribe((val: IProfile) => {
        if (_.has(val, "_id")) {
          console.log("setting user profile...", val);
          this.store.dispatch(
            new CategoryTypeActions.SetSelectedCategories(val.categories)
          );
          this._id = val._id;
          this.name = val.name;
          this.rcNumber = val.rcNumber;
          this.location = val.location;
          this.phoneNumber = val.phoneNumbers[0];
          this.shortBio = val.shortBio;
          this.twitter = val.twitter;
          this.facebook = val.facebook;
          this.instagram = val.instagram;
          this.youtube = val.youtube;
          if (val.additionalSocial) {
            for (let socialMedia of val.additionalSocial) {
              this.otherSocialMedias.push(
                new FormGroup({ social: new FormControl(socialMedia) })
              );
            }
          }
        } else {
          this.isNewProfile = true;
        }
        this.initForm();
      });

    this.store
      .pipe(select(selectSelectedCategoryTypes))
      .subscribe((val: string[]) => {
        this.selectedCategories = [...val];
      });
  }

  private initForm() {
    this.profileForm = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      rcNumber: new FormControl(this.rcNumber),
      location: new FormControl(this.location, Validators.required),
      fullName: new FormControl(this.userFullName, Validators.required),
      emailAddress: new FormControl(this.userEmail, Validators.required),
      phoneNumber: new FormControl(this.phoneNumber, Validators.required),
      shortBio: new FormControl(this.shortBio),
      facebook: new FormControl(this.facebook),
      instagram: new FormControl(this.instagram),
      twitter: new FormControl(this.twitter),
      youtube: new FormControl(this.youtube),
      additionalSocial: this.otherSocialMedias
    });
    this.profileForm.controls["emailAddress"].disable();
  }

  onAddAdditionalSocial() {
    (<FormArray>this.profileForm.get("additionalSocial")).push(
      new FormGroup({
        social: new FormControl()
      })
    );
  }
  onUpdateProfile() {
    const name: string = this.profileForm.controls["name"].value;
    const rcNumber: string = this.profileForm.controls["rcNumber"].value;
    const location: string = this.profileForm.controls["location"].value;
    const fullName: string = this.profileForm.controls["fullName"].value;
    const phoneNumber: string = this.profileForm.controls["phoneNumber"].value;
    const shortBio: string = this.profileForm.controls["shortBio"].value;
    const facebook: string = this.profileForm.controls["facebook"].value;
    const instagram: string = this.profileForm.controls["instagram"].value;
    const twitter: string = this.profileForm.controls["twitter"].value;
    const youtube: string = this.profileForm.controls["youtube"].value;
    const additionalSocials: string[] = this.profileForm.controls[
      "additionalSocial"
    ].value;
    const profileObj: IProfile = {
      name,
      rcNumber,
      location,
      fullName,
      phoneNumbers: [phoneNumber],
      categories: [...this.selectedCategories],
      additionalSocial: [...additionalSocials],
      shortBio,
      facebook,
      twitter,
      instagram,
      youtube
    };

    if (!this.isNewProfile) {
      profileObj._id = this._id;
      this.userState.dispatch(new ProfileActions.UpdateUserProfile(profileObj));
      this.isNewProfile = false;
    } else {
      this.userState.dispatch(new ProfileActions.CreateUserProfile(profileObj));
      this.isNewProfile = false;
    }
  }
}
