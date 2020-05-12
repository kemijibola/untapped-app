import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData } from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emailAsyncValidator } from "../async-email.validator";
import { UserService } from "src/app/services/user.service";
import * as AuthActions from "../store/auth.actions";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-change-email",
  templateUrl: "./change-email.component.html",
  styleUrls: ["./change-email.component.css"],
})
export class ChangeEmailComponent implements OnInit {
  userPreEmailAdress: string = "";
  changeEmailForm: FormGroup;
  constructor(
    private store: Store<fromApp.AppState>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.changeEmailForm = new FormGroup({
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email]),
        emailAsyncValidator(500, this.userService).bind(this)
      ),
    });
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.userPreEmailAdress = val.user_data.email.split("@")[0];
        }
      });
  }

  onSubmit() {
    const newEmail: string = this.changeEmailForm.controls["email"].value;
    this.store.dispatch(
      new AuthActions.ChangeEmailAddress({
        newEmail,
        emailChangeVerificationUri: environment.EMAIL_CHANGE_ROUTE,
      })
    );
  }
}
