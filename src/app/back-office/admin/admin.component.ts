import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AbstractTabComponent } from "src/app/shared/Classes/abstract/abstract-tab/abstract-tab.component";
import { Router } from "@angular/router";
import { ITab, IAppTab } from 'src/app/interfaces';

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent extends AbstractTabComponent {
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
      { index: 2, title: "Setting", tag: "settings", active: false },
    ],
  };
  currentUserType: string = "";
  constructor(public router: Router, public route: ActivatedRoute) {
    super();
  }

  navigate(): void {
    this.router.navigate(["/user/competition/page"], {
      queryParams: { tab: this.queryParam },
    });
  }
}
