import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import * as fromApp from "../store/app.reducers";
import { IAppTab, ITab, IService } from "../interfaces";
import { AbstractTabComponent } from "../shared/Classes/abstract/abstract-tab/abstract-tab.component";
import { UUID } from "angular2-uuid";
import * as CategoryTypeActions from "src/app/shared/store/category-type/category-type.actions";

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
      { index: 0, title: "Contest", tag: "all", active: false },
      { index: 1, title: "New Contest", tag: "new", active: false },
      { index: 2, title: "Setting", tag: "settings", active: false },
    ],
  };
  constructor(
    public store: Store<fromApp.AppState>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
  }

  navigate(): void {
    this.router.navigate(["/user/contest/page"], {
      queryParams: { tab: this.queryParam },
    });
  }
}
