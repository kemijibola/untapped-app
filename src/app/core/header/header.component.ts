import { Component, OnInit, Input, AfterContentInit } from "@angular/core";
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

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, AfterContentInit {
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

  constructor(private store: Store<fromApp.AppState>) {
    this.userImage = environment.TALENT_DEFAULT_IMG;
  }

  // TODO:: properties needed, fullname, Split and use [0] for display name
  // email address also needed for username

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        this.isAuthenticated = val.authenticated;
        if (val.authenticated) {
          this.fetchUserProfileImage(val.user_data.profile_image_path);
          this.userPreEmailAdress = val.user_data.email.split("@")[0];
          this.userFullName = val.user_data.full_name;
          this.typeOfUser = AppUserType[val.user_data.userType.name];
        }
      });
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.LogOut());
  }

  fetchUserProfileImage(userImageKey: string) {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.userImage =
            userImageKey !== ""
              ? fetchImageObjectFromCloudFormation(
                  val.user_data.profile_image_path,
                  this.editParams
                )
              : environment.TALENT_DEFAULT_IMG;
        }
      });
  }

  ngAfterContentInit() {}
}
