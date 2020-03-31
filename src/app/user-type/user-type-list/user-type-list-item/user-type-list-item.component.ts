import { selectAllUserTypes } from "./../../store/user-type.reducers";
import { IUserType } from "./../../../interfaces/account/role";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable, pipe } from "rxjs";
import { Subject } from "rxjs";
import { takeUntil, map, switchMap, withLatestFrom } from "rxjs/operators";
import * as UserTypeActions from "../../store/user-type.actions";
import * as fromApp from "../../../store/app.reducers";
import * as fromUserType from "../../store/user-type.reducers";
import * as fromUserTypeReducer from "../../store/user-type.reducers";
import { AppError } from "src/app/store/global/error/error.reducers";
import * as SnackBarActions from "../../../shared/notifications/snackbar/snackbar.action";
import { SnackBarData } from "src/app/interfaces";

@Component({
  selector: "app-user-type-list-item",
  templateUrl: "./user-type-list-item.component.html",
  styleUrls: ["./user-type-list-item.component.css"]
})
export class UserTypeListItemComponent implements OnInit, OnDestroy {
  selectedUserType$: Observable<IUserType>;
  userTypes$: Observable<IUserType[]>;
  selectedUserType: IUserType;
  userTypeForm: FormGroup;
  icons = {
    Talent: "assets/img/i2.svg",
    Professional: "assets/img/i3.svg",
    Audience: "assets/img/audience.svg"
  };

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.userTypes$ = this.store.select(fromUserTypeReducer.selectAllUserTypes);

    this.store
      .select(fromUserTypeReducer.selectCurrentUserType)
      .subscribe((val: IUserType) => {
        this.selectedUserType = { ...val };
      });

    this.store
      .select(fromUserTypeReducer.selectUserTypeError)
      .subscribe(val => {
        if (val !== null) {
          console.log("error sighted");
          const snackBarConfig: SnackBarData = {
            message: val.errorMessage,
            action: "X",
            config: {
              panelClass: ["error-snackbar"],
              horizontalPosition: "right",
              verticalPosition: "top",
              duration: 5000
            }
          };
          this.store.dispatch(
            new SnackBarActions.SnackBarOpen({ params: snackBarConfig })
          );
        }
        // if (val.errorCode === 0) {
        //   console.log("error not sighted");
        // }
      });

    this.userTypeForm = new FormGroup({
      typeOfUser: new FormControl(
        this.selectedUserType._id,
        Validators.required
      )
    });
  }

  onClick(userType: IUserType) {
    this.userTypeForm.get("typeOfUser").setValue(userType._id);
    this.store.dispatch(
      new UserTypeActions.FetchUserType({ userTypeId: userType._id })
    );
  }

  ngOnDestroy() {
    // set selected user type to default select
    this.store.dispatch(
      new UserTypeActions.FetchUserType({
        userTypeId: this.selectedUserType._id
      })
    );
  }
}
