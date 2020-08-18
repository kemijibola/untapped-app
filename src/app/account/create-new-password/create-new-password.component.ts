import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ConfirmValidator } from "../store/confirm-password.validator";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";

@Component({
  selector: "app-create-new-password",
  templateUrl: "./create-new-password.component.html",
  styleUrls: ["./create-new-password.component.css"],
})
export class CreateNewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  email: string = "";
  constructor(
    public route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get("email");
    });
    this.newPasswordForm = new FormGroup(
      {
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required),
      },
      ConfirmValidator("password", "confirmPassword").bind(this)
    );
  }

  onReset() {
    const password: string = this.newPasswordForm.controls["password"].value;
    this.store.dispatch(
      new AuthActions.CreateNewPassword({
        email: this.email,
        newPassword: password,
      })
    );
  }
}
