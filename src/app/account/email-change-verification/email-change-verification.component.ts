import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { IConfirmEmail, IAuthData } from "src/app/interfaces";
import { select } from "@ngrx/store";
import * as fromAuth from "src/app/account/store/auth.reducers";

@Component({
  selector: "app-email-change-verification",
  templateUrl: "./email-change-verification.component.html",
  styleUrls: ["./email-change-verification.component.css"],
})
export class EmailChangeVerificationComponent implements OnInit {
  email: string;
  token: string;
  constructor(
    private store: Store<fromApp.AppState>,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get("email");
      this.token = params.get("token");
    });

    const payload: IConfirmEmail = {
      email: this.email,
      token: this.token,
    };

    this.store.dispatch(
      new AuthActions.VerifyEmailChange({ confirmEmailData: payload })
    );

    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.router.navigate(["/user/", val.user_data.email.split("@")[0]], {
            queryParams: { tab: "settings" },
          });
        }
      });
  }
}
