import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NotificationService } from "src/app/services/notification.service";
import { IConfirmEmail, SnackBarData } from "src/app/interfaces";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { ErrorService } from "src/app/services/ErrorService";
import * as SnackBarActions from "../../shared/notifications/snackbar/snackbar.action";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.css"],
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  email: string;
  token: string;
  constructor(
    private store: Store<fromApp.AppState>,
    public route: ActivatedRoute,
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.email = params.get("email");
      this.token = params.get("token");
    });

    const payload: IConfirmEmail = {
      email: this.email,
      token: this.token,
    };

    this.store.dispatch(
      new AuthActions.DoEmailConfirmation({ confirmEmailData: payload })
    );

    // error
    // this.store.pipe(select(selectErrorMessage)).subscribe((val: any) => {
    //   if (val) {
    //     const message = this.errorService.getServerErrorMessage(val);
    //     this.notificationService.showError(message);
    //   }
    // });
  }

  ngOnDestroy() {
    this.notificationService.showSuccess("Email successfully verified");
  }
}
