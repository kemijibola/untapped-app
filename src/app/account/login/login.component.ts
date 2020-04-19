import { Component, OnInit } from "@angular/core";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import * as fromAuthReducer from "../store/auth.reducers";
import { Store, select } from "@ngrx/store";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ILogin, SnackBarData } from "src/app/interfaces";
import * as SnackBarActions from "../../shared/notifications/snackbar/snackbar.action";
import * as fromUserTypeReducer from "../../user-type/store/user-type.reducers";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage = "";
  hasError = false;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  onSignin() {
    // this.hasError = false;
    this.store.dispatch(new AuthActions.ResetFailureMessage());
    const email: string = this.signinForm.controls["email"].value;
    const password: string = this.signinForm.controls["password"].value;
    const payload: ILogin = {
      email,
      password,
    };
    this.store.dispatch(new AuthActions.DoSignIn({ loginData: payload }));
  }
}
