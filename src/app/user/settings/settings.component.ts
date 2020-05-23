import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData, IToggle, ToggleList } from "src/app/interfaces";
import { Router } from "@angular/router";
import * as ToggleActions from "../../shared/store/slide-toggle/slide-toggle.actions";
import * as fromSlideToggle from "../../shared/store/slide-toggle/slide-toggle.reducers";

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
        if (val !== null) {
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
    
  }

  navigateToChangeEmail() {
    this.router.navigate(["/account/email/change"]);
  }
}
