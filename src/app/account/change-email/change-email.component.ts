import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  Renderer2,
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
import { EMAIL_REGEX } from "src/app/lib/constants";
import * as fromAuthReducer from "../store/auth.reducers";

@Component({
  selector: "app-change-email",
  templateUrl: "./change-email.component.html",
  styleUrls: ["./change-email.component.css"],
})
export class ChangeEmailComponent implements OnInit {
  userPreEmailAdress: string = "";
  changeEmailForm: FormGroup;
  emailPattern = EMAIL_REGEX;

  initiated$ = this.store.pipe(
    select(fromAuthReducer.selectChangeEmailInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromAuthReducer.selectChangeEmailInProgressStatus)
  );

  completed$ = this.store.pipe(
    select(fromAuthReducer.selectChangeEmailCompletedStatus)
  );

  @ViewChild("changeEmailButton", { static: false })
  changeEmailButton: ElementRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private userService: UserService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.completed$.subscribe((val: boolean) => {
      if (val) {
        this.changeEmailForm.reset();
      }
    });

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
    const changeEmailBtn = this.changeEmailButton.nativeElement;
    this.renderer.setProperty(changeEmailBtn, "disabled", true);

    const newEmail: string = this.changeEmailForm.controls["email"].value;
    this.store.dispatch(
      new AuthActions.ChangeEmailAddress({
        newEmail,
        emailChangeVerificationUri: environment.EMAIL_CHANGE_ROUTE,
      })
    );
  }
}
