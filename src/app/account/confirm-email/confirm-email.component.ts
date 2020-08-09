import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { CountdownComponent } from "ngx-countdown";
import * as AuthActions from "../store/auth.actions";
import * as fromAuth from "../store/auth.reducers";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";

@Component({
  selector: "app-confirm-email",
  templateUrl: "./confirm-email.component.html",
  styleUrls: ["./confirm-email.component.css"],
})
export class ConfirmEmailComponent implements OnInit, AfterViewInit {
  @ViewChild("cd", { static: false }) private countdown: CountdownComponent;
  canResendMail: boolean;
  counterInProgress: boolean = true;
  userEmail: string = "";
  showResendBtn: boolean = false;
  initiated$ = this.store.pipe(
    select(fromAuth.selectResendEmailInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromAuth.selectResendEmailInProgressStatus)
  );

  completed$ = this.store.pipe(
    select(fromAuth.selectResendEmailCompletedStatus)
  );

  failed$ = this.store.pipe(select(fromAuth.selectResendEmailFailedStatus));

  constructor(private store: Store<fromApp.AppState>) {}

  ngAfterViewInit(): void {
    this.startCounter();
  }

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectNewUserEmail))
      .subscribe((val: string) => {
        if (val) {
          this.userEmail = val;
        }
      });

    this.completed$.subscribe((val: boolean) => {
      if (val) {
        this.counterInProgress = true;
        this.showResendBtn = false;
      }
    });
  }

  onClickResend(): void {
    if (this.userEmail) {
      this.counterInProgress = false;
      this.showResendBtn = true;
      this.store.dispatch(
        new AuthActions.ResendConfirmationMail({ email: this.userEmail })
      );
    }
  }

  startCounter(): void {
    this.counterInProgress = true;
    this.countdown.begin();
  }

  handleEvent(data) {
    if (data.action === "done") {
      this.counterInProgress = false;
      this.showResendBtn = true;
    }
  }
}
