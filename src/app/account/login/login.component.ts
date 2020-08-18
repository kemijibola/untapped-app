import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import * as fromAuthReducer from "../store/auth.reducers";
import { Store, select } from "@ngrx/store";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ILogin } from "src/app/interfaces";
import { EMAIL_REGEX } from "src/app/lib/constants";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;

  initiated$ = this.store.pipe(
    select(fromAuthReducer.selectLoginInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromAuthReducer.selectLoginInProgressStatus)
  );

  loginCompleted$ = this.store.pipe(
    select(fromAuthReducer.selectLoginCompletedStatus)
  );
  emailPattern = EMAIL_REGEX;

  @ViewChild("loginButton", { static: false }) loginButton: ElementRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });
  }

  onSignin() {
    const loginBtn = this.loginButton.nativeElement;
    this.renderer.setProperty(loginBtn, "disabled", true);
    const email: string = this.signinForm.controls["email"].value;
    const password: string = this.signinForm.controls["password"].value;
    const payload: ILogin = {
      email,
      password,
    };
    this.store.dispatch(new AuthActions.DoSignIn({ loginData: payload }));
    // this.trigger();
    // this.renderer.setProperty(loginBtn, "disabled", false);
  }
}
