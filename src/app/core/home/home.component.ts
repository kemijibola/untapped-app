import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData, IUserType } from "src/app/interfaces";
import * as fromUserTypeReducer from "../../user-type/store/user-type.reducers";
import * as UserTypeActions from "../../user-type/store/user-type.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, public router: Router) {}
  isAuthenticated: boolean;
  talentUserTypeId: string = "";
  professionalUserTypeId: string = "";
  audienceUserTypeId: string = "";

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        this.isAuthenticated = val.authenticated;
      });

    this.store
      .select(fromUserTypeReducer.selectAllUserTypes)
      .subscribe((val: IUserType[]) => {
        if (val.length > 0) {
          this.talentUserTypeId = val.filter((x) => x.name === "Talent")[0]._id;
          this.professionalUserTypeId = val.filter(
            (x) => x.name === "Professional"
          )[0]._id;
          this.audienceUserTypeId = val.filter(
            (x) => x.name === "Audience"
          )[0]._id;
        }
      });
  }

  onSignUpProfessional() {
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
