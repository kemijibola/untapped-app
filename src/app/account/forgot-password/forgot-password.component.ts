import * as AuthActions from "../store/auth.actions";
import * as fromAuthAction from "../store/auth.reducers";
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  initiated$ = this.store.pipe(
    select(fromAuthAction.selectForgotInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromAuthAction.selectForgotInProgressStatus)
  );

  isCompleted$ = this.store.pipe(
    select(fromAuthAction.selectForgotCompletedStatus)
  );

  failed$ = this.store.pipe(select(fromAuthAction.selectForgotFailedStatus));

  @ViewChild("forgotButton", { static: false }) forgotButton: ElementRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(
        null,
        Validators.compose([Validators.required, Validators.email])
      ),
    });
  }
  onReset() {
    const forgotBtn = this.forgotButton.nativeElement;
    this.renderer.setProperty(forgotBtn, "disabled", true);

    const email: string = this.forgotPasswordForm.controls["email"].value;
    this.store.dispatch(
      new AuthActions.RequestPasswordReset({
        email,
        redirectUrl: environment.RESET_PASSWORD_URL,
      })
    );
  }
}
