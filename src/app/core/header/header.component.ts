import { Component, OnInit, Input, AfterContentInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../../account/store/auth.actions";
import { IAuthData } from "src/app/interfaces";
import * as ProfileActions from "../../user/store/profile/profile.actions";
import * as fromAuth from "src/app/account/store/auth.reducers";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, AfterContentInit {
  isAuthenticated: boolean;
  userPreEmailAdress = "";
  constructor(private store: Store<fromApp.AppState>) {}

  // TODO:: properties needed, fullname, Split and use [0] for display name
  // email address also needed for username

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        console.log(val);
        this.isAuthenticated = val.authenticated;
        if (val.authenticated) {
          this.userPreEmailAdress = val.user_data.email.split("@")[0];
        }
      });
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.LogOut());
  }

  ngAfterContentInit() {}
}
