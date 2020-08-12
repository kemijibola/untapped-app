import {
  INSTAGRAM_REGEX,
  TWITTER_REGEX,
  YOUTUBE_REGEX,
} from "./../../lib/constants";
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import * as fromProfileReducer from "../store/profile/profile.reducers";
import * as ProfileActions from "../store/profile/profile.actions";
import * as fromUser from "../user.reducers";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { takeUntil, take } from "rxjs/operators";
import {
  IFileInputModel,
  IAuthData,
  IProfile,
  IUserSocialMedia,
  ICategory,
  SnackBarData,
  AppUserType,
  ILocation,
} from "src/app/interfaces";
import * as UploadActions from "../../shared/store/upload/upload.actions";
import * as fromUpload from "../../shared/store/upload/upload.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as CategoryTypeActions from "../../shared/store/category-type/category-type.actions";
import * as fromCategoryType from "src/app/shared/store/category-type/category-type.reducers";
import * as _ from "underscore";
import * as SnackBarActions from "../../shared/notifications/snackbar/snackbar.action";
import { PHONE_REGEX, FACEBOOK_REGEX } from "src/app/lib/constants";
import * as fromUserLocation from "../../shared/store/user-location/user-location.reducer";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfileState: Observable<fromProfileReducer.ProfileState>;
  ngDestroyed = new Subject();
  fileConfig: IFileInputModel;
  userEmail: string;
  userFullName: string;
  profileData: IProfile;

  private _id: string = "";
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
  isNewProfile: boolean = false;
  // physicalStats?: IPhysicalStatistics;
  bannerImagePath?: string;
  typeOfUser: AppUserType;
  selectedCategories: string[] = [];
  userLocation: ILocation = {
    location: "",
    formattedAddres: "",
  };
  newUserLocation: string = "";
  userType: string = "";
  shortbioCount: number = 250;
  phonePattern = PHONE_REGEX;
  facebookPattern = FACEBOOK_REGEX;
  instagramPattern = INSTAGRAM_REGEX;
  twitterPattern = TWITTER_REGEX;
  youtubePattern = YOUTUBE_REGEX;

  isInitiated$ = this.userStore.pipe(
    select(fromProfileReducer.selectSaveProfileInitiatedStatus)
  );

  inProgress$ = this.userStore.pipe(
    select(fromProfileReducer.selectSaveProfileInProgressStatus)
  );

  isCompleted$ = this.userStore.pipe(
    select(fromProfileReducer.selectSaveProfileCompletedStatus)
  );

  failed$ = this.userStore.pipe(
    select(fromProfileReducer.selectSaveProfileFailedStatus)
  );

  constructor(
    private userStore: Store<fromUser.UserState>,
    private store: Store<fromApp.AppState>
  ) {
    this.isNewProfile = false;
  }

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.typeOfUser = AppUserType[val.user_data.userType.name];
          this.userType = val.user_data.userType.name;
          this.userEmail = val.user_data.email;
          this.userFullName = val.user_data.full_name;
        }
      });

    this.userStore.dispatch(new ProfileActions.FetchUserProfile());

    this.userStore
      .pipe(select(fromProfileReducer.selectCurrentUserProfile))
      .subscribe((val: IProfile) => {
        if (_.has(val, "_id")) {
          this.store.dispatch(
            new CategoryTypeActions.SetSelectedCategoryType({
              selectedCategoryType: val.categoryTypes,
            })
          );
          this._id = val._id;
          this.name = val.name;
          this.location = val.formattedAddres;
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
        }
        this.initForm();
      });

    this.store
      .pipe(select(fromCategoryType.selectSelectedCategoryTypes))
      .subscribe((val: string[]) => {
        this.selectedCategories = [...val];
      });

    this.userStore
      .pipe(select(fromUserLocation.selectCurrentUserLocation))
      .subscribe((val: ILocation) => {
        if (_.has(val, "address")) {
          this.userLocation = val;
          this.location = val["address"].formattedAddres;
        }
      });
  }

  private initForm() {
    this.profileForm = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      // rcNumber: new FormControl(this.rcNumber),
      fullName: new FormControl(this.userFullName, Validators.required),
      emailAddress: new FormControl(this.userEmail, Validators.required),
      phoneNumber: new FormControl(
        this.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern(PHONE_REGEX),
          Validators.minLength(11),
          Validators.maxLength(11),
        ])
      ),
      shortBio: new FormControl(this.shortBio, [
        Validators.minLength(80),
        Validators.maxLength(1500),
      ]),
      facebook: new FormControl(this.facebook),
      instagram: new FormControl(this.instagram),
      twitter: new FormControl(this.twitter),
      youtube: new FormControl(this.youtube),
      additionalSocial: this.otherSocialMedias,
    });
    this.profileForm.controls["emailAddress"].disable();
  }

  get additionalSocial(): FormArray {
    return this.profileForm.get("additionalSocial") as FormArray;
  }

  onAddAdditionalSocial() {
    (<FormArray>this.profileForm.get("additionalSocial")).push(
      new FormGroup({
        social: new FormControl(),
      })
    );
  }
  onUpdateProfile() {
    const name: string = this.profileForm.controls["name"].value;
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

    if (shortBio.trim().length < 80) {
      this.store.dispatch(
        new SnackBarActions.SnackBarOpen({
          message: "Short bio length must be greater than 80",
          action: "X",
          config: {
            panelClass: ["info-snackbar"],
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 70000,
          },
        })
      );
      return;
    }
    if (
      !this.userLocation["address"].formattedAddres ||
      !this.userLocation["address"].location
    ) {
      this.store.dispatch(
        new SnackBarActions.SnackBarOpen({
          message: "Please provide a valid address",
          action: "X",
          config: {
            panelClass: ["info-snackbar"],
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 70000,
          },
        })
      );
      return;
    }

    const profileObj: IProfile = {
      name,
      fullName,
      userAddress: this.userLocation,
      phoneNumbers: [phoneNumber],
      categoryTypes: [...this.selectedCategories],
      additionalSocial: [...additionalSocials],
      shortBio,
      facebook,
      twitter,
      instagram,
      youtube,
    };

    this.isNewProfile = this._id === "" ? true : false;
    if (!this.isNewProfile) {
      profileObj._id = this._id;
      this.userStore.dispatch(new ProfileActions.UpdateUserProfile(profileObj));
      this.isNewProfile = false;
    } else {
      this.userStore.dispatch(new ProfileActions.CreateUserProfile(profileObj));
      this.isNewProfile = false;
    }

    this.name = name;
    // this.rcNumber = rcNumber;
    this.phoneNumber = phoneNumber;
    this.shortBio = shortBio;
    this.twitter = twitter;
    this.facebook = facebook;
    this.instagram = instagram;
    this.youtube = youtube;
    // this.location = this.userLocation.formattedAddres;
    if (additionalSocials) {
      for (let socialMedia of additionalSocials) {
        this.otherSocialMedias.push(
          new FormGroup({ social: new FormControl(socialMedia) })
        );
      }
    }
  }
}
