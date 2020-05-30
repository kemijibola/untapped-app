import * as AuthActions from "../store/auth.actions";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
    });
  }
  onReset() {
    const email: string = this.forgotPasswordForm.controls["email"].value;
    this.store.dispatch(
      new AuthActions.RequestPasswordReset({
        email,
        redirectUrl: environment.RESET_PASSWORD_URL,
      })
    );
  }
}
