import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData } from "src/app/interfaces";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  userEmail: string = "";
  constructor(private store: Store<fromApp.AppState>, public router: Router) {}

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.userEmail = val.user_data.email;
        }
      });
  }

  navigateToChangeEmail() {
    this.router.navigate(["/account/email/change"]);
  }
}
