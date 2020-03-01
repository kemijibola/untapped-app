import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as AuthActions from "../store/auth.actions";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NotificationService } from "src/app/services/notification.service";
import { IConfirmEmail } from "src/app/interfaces";
import { selectErrorMessage } from "../store/auth.selectors";
import { ErrorService } from "src/app/services/ErrorService";

@Component({
  selector: "app-confirmation",
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.css"]
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromApp.AppState>,
    public route: ActivatedRoute,
    private errorService: ErrorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((queryParams: Params) => {
      const keys = { ...queryParams.params };
      const payload: IConfirmEmail = {
        email: keys["email"],
        token: keys["token"]
      };
      this.store.dispatch(new AuthActions.DoEmailConfirmation(payload));
    });

    // error
    this.store.pipe(select(selectErrorMessage)).subscribe((val: any) => {
      if (val) {
        const message = this.errorService.getServerErrorMessage(val);
        this.notificationService.showError(message);
      }
    });
  }

  ngOnDestroy() {
    this.notificationService.showSuccess("Email successfully verified");
  }
}
