import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData, IToggle, ToggleList, IUser } from "src/app/interfaces";
import { Router } from "@angular/router";
import * as ToggleActions from "../../shared/store/slide-toggle/slide-toggle.actions";
import * as fromSlideToggle from "../../shared/store/slide-toggle/slide-toggle.reducers";
import * as ProfileActions from "../store/profile/profile.actions";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  userEmail: string = "";
  emailToggle: IToggle;
  tapToggle: IToggle;
  profileVisibilityToggle: IToggle;
  updatedToggles: IToggle[] = [];
  constructor(private store: Store<fromApp.AppState>, public router: Router) {}

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.userEmail = val.user_data.email;
        }
      });

    this.store
      .pipe(select(fromSlideToggle.selectAllToggles))
      .subscribe((val: IToggle[]) => {
        console.log(val);
        if (val !== null) {
          this.updatedToggles = [...val];

          this.tapToggle = val.filter(
            (x) => x.name === ToggleList.settingstapnotification
          )[0];
          this.emailToggle = val.filter(
            (x) => x.name === ToggleList.settingsemailnotification
          )[0];
          this.profileVisibilityToggle = val.filter(
            (x) => x.name === ToggleList.settingsprofilevisibility
          )[0];
        }
      });
  }

  saveChanges() {
    const userSettings: IUser = {
      tapNotification: this.updatedToggles.filter(
        (x) => x.name === ToggleList.settingstapnotification
      )[0].state,
      emailNotification: this.updatedToggles.filter(
        (x) => x.name === ToggleList.settingsemailnotification
      )[0].state,
      profileVisibility: this.updatedToggles.filter(
        (x) => x.name === ToggleList.settingsprofilevisibility
      )[0].state,
    };

    this.store.dispatch(
      new ProfileActions.UpdateUserSettingsPreference({ userSettings })
    );
  }

  navigateToChangeEmail() {
    this.router.navigate(["/account/email/change"]);
  }

  suspendAccount() {
    this.store.dispatch(new ProfileActions.SuspendUserAccount());
  }
}
