import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import {
  IAuthData,
  UserFilterCategory,
  ReportType,
  IUserType,
} from "../interfaces";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import * as fromProfessionals from "../shared/store/filtered-categories/professional-category/professional-category.reducer";
import * as UserFilterActions from "../shared/store/filtered-categories/user-filter/user-filter.action";
import * as fromUserFilter from "../shared/store/filtered-categories/user-filter/user-filter.reducer";
import * as fromUserTypeReducer from "../user-type/store/user-type.reducers";
import * as UserTypeActions from "../user-type/store/user-type.actions";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-professionals",
  templateUrl: "./professionals.component.html",
  styleUrls: ["./professionals.component.css"],
})
export class ProfessionalsComponent implements OnInit {
  // professionals: Observable<UserFilterCategory[]>;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {
    this.store.dispatch(new UserTypeActions.FetchUserTypes());
  }
  currentUser: Observable<IAuthData>;
  searchPlaceHolderText = "Professionals";
  professionalUserTypeId: string = environment.PROFESSIONAL_USER_TYPE_ID;

  initiated$ = this.store.pipe(
    select(fromUserFilter.selectUsersInitiatedStatus)
  );

  inProgress$ = this.store.pipe(
    select(fromUserFilter.selectUsersInProgressStatus)
  );

  completed$ = this.store.pipe(
    select(fromUserFilter.selectUsersCompletedStatus)
  );

  failed$ = this.store.pipe(select(fromUserFilter.selectUsersFailedStatus));

  ngOnInit() {
    this.fetchUsers();

    this.currentUser = this.store.pipe(select(fromAuth.selectCurrentUserData));

    // this.store
    //   .select(fromUserTypeReducer.selectAllUserTypes)
    //   .subscribe((val: IUserType[]) => {
    //     this.professionalUserTypeId = val.filter(
    //       (x) => x.name === "Professional"
    //     )[0]._id;
    //   });
  }

  fetchUsers(): void {
    this.store.dispatch(
      new UserFilterActions.FetchAllUsers({
        queryParams: {
          type: ReportType.allprofessionals,
        },
      })
    );
  }

  onSignUpClicked() {
    this.router.navigate(["/account/login"]);
  }
}
