import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IConfirmEmail } from "src/app/interfaces";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-reset-password-verification",
  templateUrl: "./reset-password-verification.component.html",
  styleUrls: ["./reset-password-verification.component.css"],
})
export class ResetPasswordVerificationComponent implements OnInit {
  email: string;
  token: string;
  newPasswordForm: FormGroup;
  constructor(
    public route: ActivatedRoute,
    private store: Store<fromApp.AppState>
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
      new AuthActions.VerifyRestPassword({ verifyPasswordReq: payload })
    );
  }
}
