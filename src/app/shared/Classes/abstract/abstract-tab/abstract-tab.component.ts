import { Component, OnInit, AfterContentInit } from "@angular/core";
import * as fromApp from "../../../../store/app.reducers";
import * as TabsAction from "../../../../shared/store/tabs/tabs.actions";
import { IAppTab, ITab } from "src/app/interfaces";
import { Store } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";

export abstract class AbstractTabComponent implements OnInit, AfterContentInit {
  abstract store: Store<fromApp.AppState>;
  abstract router: Router;
  abstract route: ActivatedRoute;
  abstract tab: IAppTab;
  abstract componentName: string;
  abstract queryParam: string;
  abstract toQueryParam: string;
  activeTab: ITab;
  abstract navigate(): void;

  constructor() {}

  ngOnInit() {
    this.store.dispatch(new TabsAction.AddTab({ appTab: this.tab }));
  }

  ngAfterContentInit() {
    this.queryParam = this.route.snapshot.queryParams["tab"]
      ? this.route.snapshot.queryParams["tab"].toLowerCase()
      : this.toQueryParam;
    // subscribing to query param change
    this.route.queryParams.subscribe(fragement => {
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
    for (const item of this.tab.tabs) {
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
    const selectedTab = this.tab.tabs.filter(x => x.tag === this.queryParam)[0];
    this.store.dispatch(
      new TabsAction.UpdateTab({
        updateObj: {
          name: this.componentName,
          tabIndex: selectedTab.index
        }
      })
    );
    this.navigate();
    this.activeTab = selectedTab;
  }

  private escapeRegExp(param: string) {
    return param.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
}
