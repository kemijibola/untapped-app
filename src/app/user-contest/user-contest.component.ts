import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import * as fromApp from "../store/app.reducers";
import { IAppTab, ITab, IService, IAuthData } from "../interfaces";
import { AbstractTabComponent } from "../shared/Classes/abstract/abstract-tab/abstract-tab.component";
import * as fromAuth from "src/app/account/store/auth.reducers";

@Component({
  selector: "app-user-contest",
  templateUrl: "./user-contest.component.html",
  styleUrls: ["./user-contest.component.css"],
})
export class UserContestComponent extends AbstractTabComponent {
  queryParam = "all";
  activeTab: ITab;
  toQueryParam = "all";
  tabPanel: IAppTab = {
    id: "user-contest",
    divClass: "all-contest-area pt-40 pb-60 pl-130",
    navClass: "nav nav-tabs mb-50 all-tablinks",
    tabs: [
      { index: 0, title: "Competitions", tag: "all", active: false },
      { index: 1, title: "New Competition", tag: "new", active: false },
      { index: 2, title: "SMS Voting System", tag: "sms-vote", active: false },
    ],
  };
  currentUserType: string = "";
  constructor(
    public store: Store<fromApp.AppState>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();

    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.currentUserType = val.user_data.userType.name;
        }
      });
  }

  navigate(): void {
    this.router.navigate(["/user/competition/page"], {
      queryParams: { tab: this.queryParam },
    });
  }
}
