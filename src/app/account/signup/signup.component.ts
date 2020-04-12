import { ErrorService } from "./../../services/ErrorService";
import { Component, OnInit, AfterContentInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { emailAsyncValidator } from "../async-email.validator";
import { UserService } from "src/app/services/user.service";
import { Subject } from "rxjs";
import * as AuthActions from "../store/auth.actions";
import * as fromUserType from "../../user-type/store/user-type.reducers";
import { takeUntil, map } from "rxjs/operators";
import { IRegister, IUserType } from "src/app/interfaces";
import { AUDIENCE } from "src/app/lib/constants";
import { NotificationService } from "src/app/services/notification.service";
import * as fromUserTypeReducer from "../../user-type/store/user-type.reducers";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, AfterContentInit {
  signupForm: FormGroup;
  time = 500;
  emailPattern = "^[a-z0-9A-Z._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";
  selectedUserType: IUserType = {
    _id: "",
    name: "",
    description: "",
  };
  ngDestroyed = new Subject();
  errorMessage = "";

  constructor(
    private store: Store<fromApp.AppState>,
    private userService: UserService,
    private notificationService: NotificationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email]),
        emailAsyncValidator(500, this.userService).bind(this)
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      terms: new FormControl(null, Validators.required),
    });

    // subscribe to error
    // this.store.pipe(select(selectErrorMessage)).subscribe((val: any) => {
    //   if (val) {
    //     if (!this.signupForm.invalid) {
    //       const message = this.errorService.getServerErrorMessage(val);
    //       this.notificationService.showError(message);
    //     }
    //   }
    // });
  }

  ngAfterContentInit() {
    this.store
      .select(fromUserTypeReducer.selectCurrentUserType)
      .subscribe((val: IUserType) => {
        this.selectedUserType = { ...val };
        //console.log(this.selectedUserType);
      });
  }

  onSubmit() {
    const username: string = this.signupForm.controls["name"].value;
    const email: string = this.signupForm.controls["email"].value;
    const password: string = this.signupForm.controls["password"].value;
    const payload: IRegister = {
      fullName: username,
      email: email,
      password: password,
      userType: this.selectedUserType._id,
    };
    this.store.dispatch(new AuthActions.DoSignUp({ registerData: payload }));
  }
}
