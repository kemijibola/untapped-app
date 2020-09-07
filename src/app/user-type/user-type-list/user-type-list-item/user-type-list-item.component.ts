import { IUserType } from "./../../../interfaces/account/role";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as UserTypeActions from "../../store/user-type.actions";
import * as fromApp from "../../../store/app.reducers";
import * as fromUserTypeReducer from "../../store/user-type.reducers";
import * as _ from "underscore";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-user-type-list-item",
  templateUrl: "./user-type-list-item.component.html",
  styleUrls: ["./user-type-list-item.component.css"],
})
export class UserTypeListItemComponent implements OnInit, OnDestroy {
  selectedUserType$: Observable<IUserType>;
  selectedUserType: IUserType;
  userTypeForm: FormGroup;
  icons = {
    Talent: "assets/img/i2.svg",
    Professional: "assets/img/i3.svg",
    Audience: "assets/img/audience.svg",
  };
  talentUserTypeId: string = environment.TALENT_USER_TYPE_ID;

  initiated$ = this.store.pipe(
    select(fromUserTypeReducer.selectFetchUserTypesInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromUserTypeReducer.selectFetchUserTypesInProgressStatus)
  );

  completed$ = this.store.pipe(
    select(fromUserTypeReducer.selectFetchUserTypesCompletedStatus)
  );

  failed$ = this.store.pipe(
    select(fromUserTypeReducer.selectUserTypesFailedStatus)
  );

  userTypes$ = this.store.select(fromUserTypeReducer.selectAllUserTypes);

  constructor(private store: Store<fromApp.AppState>) {
    // this.store.dispatch(new UserTypeActions.FetchUserTypes());
    // this.fetchUserTypes();
  }
  ngOnInit() {
    this.userTypeForm = new FormGroup({
      typeOfUser: new FormControl("", Validators.required),
    });

    this.store
      .select(fromUserTypeReducer.selectCurrentUserType)
      .take(2)
      .subscribe((val: IUserType) => {
        console.log("entered", val);
        if (val) {
          this.selectedUserType = val;
          this.userTypeForm.get("typeOfUser").setValue(val._id);
        } else {
          this.userTypeForm.get("typeOfUser").setValue(this.talentUserTypeId);
        }
      });
  }

  onClick(userType: IUserType) {
    this.userTypeForm.get("typeOfUser").setValue(userType._id);
    this.store.dispatch(
      new UserTypeActions.FetchUserType({ userTypeId: userType._id })
    );
  }

  fetchUserTypes() {}

  trackByFn(index: number, item: IUserType) {
    return item._id;
  }

  ngOnDestroy() {
    // set selected user type to default select
    if (_.has(this.selectedUserType, "_id")) {
      this.store.dispatch(
        new UserTypeActions.FetchUserType({
          userTypeId: this.selectedUserType._id,
        })
      );
    }
  }
}
