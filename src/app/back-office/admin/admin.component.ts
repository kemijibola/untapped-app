import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AbstractTabComponent } from "src/app/shared/Classes/abstract/abstract-tab/abstract-tab.component";
import { Router } from "@angular/router";
import { ITab, IAppTab, IAuthData } from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as fromAdmin from "./admin.reducer";
import * as PendingMediaActions from "./../store/approvals/media/media.action";
import { RolePermission } from "src/app/lib/constants";
import * as PendingContestActions from "./../store/approvals/contest/contest.action";
import * as PendingEntryActions from "./../store/approvals/entry/entry.action";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent extends AbstractTabComponent {
  queryParam = "media";
  activeTab: ITab;
  toQueryParam = "media";
  tabPanel: IAppTab = {
    id: "admin-approvals",
    divClass: "all-contest-area pt-40 pb-60 pl-130",
    navClass: "nav nav-tabs mb-50 all-tablinks",
    tabs: [
      { index: 0, title: "Media", tag: "media", active: false },
      { index: 1, title: "Contest", tag: "contest", active: false },
      { index: 2, title: "Submissions", tag: "submission", active: false },
      {
        index: 3,
        title: "Talent Profile",
        tag: "talentprofile",
        active: false,
      },
    ],
  };
  hasPendingMediaViewPermission: boolean = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public store: Store<fromApp.AppState>,
    private adminStore: Store<fromAdmin.AdminState>
  ) {
    super();
    this.adminStore.dispatch(new PendingMediaActions.FetchPendingApprovals());
    this.adminStore.dispatch(new PendingContestActions.FetchPendingContests());

    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        if (val.authenticated) {
          this.hasPendingMediaViewPermission =
            val.rolePermissions.filter(
              (x) => x.permission.name === RolePermission.canViewPendingMedia
            ).length > 0;
        }
      });
  }

  navigate(): void {
    this.router.navigate(["/admin/approvals"], {
      queryParams: { tab: this.queryParam },
    });
  }
}
