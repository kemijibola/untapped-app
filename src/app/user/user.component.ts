import { Component, OnInit, OnDestroy, AfterContentInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as AuthActions from "../account/store/auth.actions";
import { IAppTab, ITab, IAuthData, AppUserType } from "../interfaces";
import { AbstractTabComponent } from "../shared/Classes/abstract/abstract-tab/abstract-tab.component";
import { UUID } from "angular2-uuid";
import * as TabsAction from "../shared/store/tabs/tabs.actions";
import * as fromAuth from "src/app/account/store/auth.reducers";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent extends AbstractTabComponent {
  typeOfUser: string;
  tabPanel: IAppTab;
  queryParam = "profile";
  toQueryParam = "profile";
  divClass = "profile-area fx-padding-2 pt-80 pb-105";
  navClass = "nav nav-tabs mb-30 all-tablinks";
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
          this.setUpAppUserTab(val.user_data.userType.name);
        }
      });
  }

  navigate(): void {
    this.router.navigate(["/user/", this.route.snapshot.params["username"]], {
      queryParams: { tab: this.queryParam },
    });
  }

  setUpAppUserTab(userType: string) {
    switch (userType) {
      case AppUserType.Talent:
        this.loadTalentTabs();
        break;
      case AppUserType.Professional:
        this.loadProfessionalTabs();
        break;
      case AppUserType.Audience:
        this.loadAudienceTab();
        break;
      default:
        this.loadAudienceTab();
        break;
    }
  }

  loadTalentTabs() {
    this.tabPanel = {
      id: "user-tab",
      divClass: "profile-area fx-padding-2 pt-80 pb-105",
      navClass: "nav nav-tabs mb-30 all-tablinks",
      tabs: [
        { index: 0, title: "Profile", tag: "profile", active: false },
        { index: 1, title: "Portfolio", tag: "portfolio", active: false },
        { index: 2, title: "Settings", tag: "settings", active: false },
        { index: 3, title: "Contests", tag: "contests", active: false },
        {
          index: 4,
          title: "Manage Votes",
          tag: "managevotes",
          active: false,
        },
      ],
    };
  }

  loadProfessionalTabs() {
    this.tabPanel = {
      id: "user-tab",
      divClass: "profile-area fx-padding-2 pt-80 pb-105",
      navClass: "nav nav-tabs mb-30 all-tablinks",
      tabs: [
        { index: 0, title: "Profile", tag: "profile", active: false },
        { index: 1, title: "Settings", tag: "settings", active: false },
        {
          index: 2,
          title: "Manage Votes",
          tag: "managevotes",
          active: false,
        },
      ],
    };
  }

  loadAudienceTab() {
    this.tabPanel = {
      id: "user-tab",
      divClass: "profile-area fx-padding-2 pt-80 pb-105",
      navClass: "nav nav-tabs mb-30 all-tablinks",
      tabs: [
        { index: 0, title: "Settings", tag: "settings", active: false },
        { index: 1, title: "Contests", tag: "contests", active: false },
        {
          index: 2,
          title: "Manage Votes",
          tag: "managevotes",
          active: false,
        },
      ],
    };
  }
}
