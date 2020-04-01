import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../../account/store/auth.actions";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData, UserTypes } from "src/app/interfaces";
import { Router } from "@angular/router";

@Component({
  selector: "app-complete-profile",
  templateUrl: "./complete-profile.component.html",
  styleUrls: ["./complete-profile.component.css"]
})
export class CompleteProfileComponent implements OnInit {
  userName: string;
  isProfssional = false;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.isProfssional =
            val.user_data.userType.name === UserTypes.Professional;
          this.userName = val.user_data.email.split("@")[0];
        }
      });
  }

  onBtnStartedClick() {
    this.router.navigate(["/user/", this.userName], {
      queryParams: { tab: "profile" }
    });
  }
}
