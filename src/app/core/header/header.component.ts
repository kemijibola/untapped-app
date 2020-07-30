import { IToggle, ToggleList } from "./../../interfaces/shared/toggle";
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../../account/store/auth.actions";
import { IAuthData, AppUserType } from "src/app/interfaces";
import * as ProfileActions from "../../user/store/profile/profile.actions";
import * as fromAuth from "src/app/account/store/auth.reducers";
import {
  fetchNoMediaDefaultImage,
  fetchImageObjectFromCloudFormation,
} from "src/app/lib/Helper";
import { environment } from "src/environments/environment";
import { ImageEditRequest, ImageFit } from "src/app/interfaces/media/image";
import * as ToggleActions from "../../shared/store/slide-toggle/slide-toggle.actions";
import * as fromSlideToggle from "../../shared/store/slide-toggle/slide-toggle.reducers";
import * as _ from "underscore";
import { Router } from "@angular/router";
import * as fromUpload from "../../shared/store/upload/upload.reducers";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isAuthenticated: boolean;
  userPreEmailAdress = "";
  userFullName: string = "";
  typeOfUser: AppUserType;
  userImage: string = "";
  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 25,
        height: 25,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  updatedToggles: IToggle[] = [];
  tapNotificationStatus: boolean;
  emailNotificationStatus: boolean;
  profileVisibilityStatus: boolean;
  showDropDown: boolean;
  showSideToggle: boolean;
  defaultLoaded: boolean;
  @ViewChild("headerImage", { static: false }) headerImage: ElementRef;

  constructor(
    private store: Store<fromApp.AppState>,
    public router: Router,
    private renderer: Renderer2
  ) {
    this.store.dispatch(new AuthActions.FetchAuthData());
  }

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (_.has(val, "user_data")) {
          this.showDropDown = false;
          this.showSideToggle = false;
          this.isAuthenticated = val.authenticated;
          this.tapNotificationStatus = val.user_data.tap_notification;
          this.emailNotificationStatus = val.user_data.email_notification;
          this.profileVisibilityStatus = val.user_data.profile_visibility;
          // this.defaultLoaded
          //   ? this.fetchUserProfileImage(val.user_data.profile_image_path)
          //   : this.triggerTimer(val.user_data.profile_image_path);
          this.userPreEmailAdress = val.user_data.email.split("@")[0];
          this.userFullName = val.user_data.full_name;
          this.typeOfUser = AppUserType[val.user_data.userType.name];
        } else {
          this.isAuthenticated = false;
        }
      });

    this.store
      .pipe(select(fromSlideToggle.selectAllToggles))
      .subscribe((val: IToggle[]) => {
        if (val !== null) {
          this.updatedToggles = [...val];
        }
      });

    // this.store
    //   .pipe(select(fromUpload.selectUploadStatus))
    //   .subscribe((val: boolean) => {
    //     if (val) {
    //       this.triggerTimer(this.userImage);
    //     }
    //   });
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.LogOut());
  }

  redirectHome() {
    this.router.navigate(["/"]);
  }

  fetchUserProfileImage(userImageKey: string) {
    console.log(userImageKey);
    if (this.defaultLoaded) {
      this.userImage =
        userImageKey !== ""
          ? fetchImageObjectFromCloudFormation(userImageKey, this.editParams)
          : environment.TALENT_DEFAULT_IMG;
      this.defaultLoaded = true;
    } else {
      this.triggerTimer(userImageKey);
      this.defaultLoaded = false;
    }
  }

  setHeaderImage(key: string): void {
    const headerImage = this.headerImage.nativeElement;
    this.renderer.setProperty(headerImage, "src", key);
  }

  triggerTimer(image: string) {
    setTimeout(() => {
      const headerImage = this.headerImage.nativeElement;
      const userImage = fetchImageObjectFromCloudFormation(
        image,
        this.editParams
      );
      this.renderer.setProperty(headerImage, "src", userImage);
    }, 80000);
  }

  ngAfterViewInit() {
    console.log("called");
    this.defaultLoaded = true;
    this.updateUserEmailPreference();
  }

  updateUserEmailPreference() {
    const togglesToUpdate = this.updatedToggles.reduce(
      (theMap: IToggle[], theItem: IToggle) => {
        if (theItem.name === ToggleList.settingsemailnotification) {
          theItem = Object.assign({
            name: theItem.name,
            state: this.emailNotificationStatus,
            title: theItem.title,
          });
          theMap = [...theMap, theItem];
        }
        if (theItem.name === ToggleList.settingstapnotification) {
          theItem = Object.assign({
            name: theItem.name,
            state: this.tapNotificationStatus,
            title: theItem.title,
          });
          theMap = [...theMap, theItem];
        }
        if (theItem.name === ToggleList.settingsprofilevisibility) {
          theItem = Object.assign({
            name: theItem.name,
            state: this.profileVisibilityStatus,
            title: theItem.title,
          });
          theMap = [...theMap, theItem];
        }
        return theMap;
      },
      []
    );
    this.store.dispatch(new ToggleActions.UpsertManyToggle(togglesToUpdate));
  }

  onToggle() {
    console.log("this is called");
    this.showDropDown = !this.showDropDown;
  }

  onSideToggleClick() {
    this.showSideToggle = !this.showSideToggle;
  }

  closeSlideMenu() {
    this.showSideToggle = false;
    this.showDropDown = false;
  }
}
