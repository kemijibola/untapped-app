import { Component, OnInit, AfterContentInit } from "@angular/core";
import * as fromApp from "../../../../store/app.reducers";
import * as TabsAction from "../../../../shared/store/tabs/tabs.actions";
import { IAppTab, ITab } from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import * as fromTabReducer from "../../../store/tabs/tabs.reducers";
import { Observable } from "rxjs";

export abstract class AbstractTabComponent implements OnInit, AfterContentInit {
  abstract store: Store<fromApp.AppState>;
  abstract router: Router;
  abstract route: ActivatedRoute;
  abstract tabPanel: IAppTab;
  abstract queryParam: string;
  abstract toQueryParam: string;
  activeTab: ITab;
  abstract navigate(): void;

  constructor() {}

  ngOnInit() {
    this.store.dispatch(new TabsAction.AddTab({ tabPanel: this.tabPanel }));
    this.store.dispatch(
      new TabsAction.FetchAppTab({ appTabId: this.tabPanel.id })
    );
  }

  ngAfterContentInit() {
    this.queryParam = this.route.snapshot.queryParams["tab"]
      ? this.route.snapshot.queryParams["tab"].toLowerCase()
      : this.toQueryParam;
    // subscribing to query param change
    this.route.queryParams.subscribe((fragement) => {
      this.queryParam = fragement["tab"]
        ? fragement["tab"].toLowerCase()
        : this.toQueryParam;
      this.setActiveTabByQueryParam();
    });
  }
  // Make Tab component more resuable
  private setActiveTabByQueryParam(): void {
    // This is to check if queryParam matches any of defined tabs
    let matchedQuery = "";
    for (const item of this.tabPanel.tabs) {
      const escapeTag = this.escapeRegExp(item.tag);
      const regex = new RegExp(escapeTag, "i");
      const queryMatch = this.queryParam.match(regex);
      if (queryMatch) {
        matchedQuery = queryMatch[0];
        // update toQueryParam with latest valid query param
        this.toQueryParam = queryMatch[0];
      }
    }
    // if queryParam does not exist
    // set to last known valid query param
    this.queryParam = matchedQuery !== "" ? matchedQuery : this.toQueryParam;

    this.store.dispatch(
      new TabsAction.InitiateTabUpdate({
        tabPanel: this.tabPanel,
        tabName: this.queryParam,
      })
    );

    this.navigate();
    this.store
      .pipe(select(fromTabReducer.selectCurrentTab))
      .subscribe((val: IAppTab) => {
        if (val !== undefined) {
          this.activeTab = val.tabs.filter((x) => x.active)[0];
        }
      });
  }

  private escapeRegExp(param: string) {
    return param.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
}
