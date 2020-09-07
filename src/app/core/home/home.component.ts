import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData, IUserType } from "src/app/interfaces";
import * as fromUserTypeReducer from "../../user-type/store/user-type.reducers";
import * as UserTypeActions from "../../user-type/store/user-type.actions";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, public router: Router) {}
  isAuthenticated: boolean;
  talentUserTypeId: string = environment.TALENT_USER_TYPE_ID;
  professionalUserTypeId: string = environment.PROFESSIONAL_USER_TYPE_ID;
  audienceUserTypeId: string = environment.AUDIENCE_USER_TYPE_ID;

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        this.isAuthenticated = val.authenticated;
      });
  }

  onSignUpProfessional() {
    console.log("clicked");
    this.store.dispatch(
      new UserTypeActions.FetchUserType({
        userTypeId: this.professionalUserTypeId,
      })
    );
    this.router.navigate(["/account/signup"]);
  }

  onSignUpTalent() {
    this.store.dispatch(
      new UserTypeActions.FetchUserType({
        userTypeId: this.talentUserTypeId,
      })
    );
    this.router.navigate(["/account/signup"]);
  }

  onSignUpAudience() {
    this.store.dispatch(
      new UserTypeActions.FetchUserType({
        userTypeId: this.audienceUserTypeId,
      })
    );
    this.router.navigate(["/account/signup"]);
  }
}
