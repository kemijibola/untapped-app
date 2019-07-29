import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as fromTabs from '../../../../store/app.reducers';
import * as TabsAction from '../../../../shared/store/tabs/tabs.actions';
import { IAppTab, ITab } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

export abstract class AbstractTabComponent implements OnInit, AfterContentInit {
  abstract store: Store<fromTabs.AppState>;
  abstract router: Router;
  abstract route: ActivatedRoute;
  abstract tab: IAppTab;
  abstract componentName: string;
  abstract queryParam: string;
  abstract toQueryParam: string;
  abstract activeTab: ITab;
  abstract navigate(): void;

  constructor() {}

  ngOnInit() {
    this.store.dispatch(new TabsAction.AddTab(this.tab));
  }

  ngAfterContentInit() {
    this.queryParam = this.route.snapshot.queryParams['tab']
      ? this.route.snapshot.queryParams['tab'].toLowerCase()
      : this.toQueryParam;
    // subscribing to fragment change
    this.route.queryParams.subscribe(fragement => {
      this.queryParam = fragement['tab']
        ? fragement['tab'].toLowerCase()
        : this.toQueryParam;
      this.setActiveTabByFragment();
    });
  }

  // Make Tab component more resuable
  private setActiveTabByFragment(): void {
    // This is to check if queryParam matches any of defined tabs
    let matchedFragment = '';
    for (const item of this.tab.tabs) {
      const escapeTag = this.escapeRegExp(item.tag);
      const regex = new RegExp(escapeTag, 'i');
      const fragmentMatch = this.queryParam.match(regex);
      if (fragmentMatch) {
        matchedFragment = fragmentMatch[0];
        // update toQueryParam with latest valid fragment
        this.toQueryParam = fragmentMatch[0];
      }
    }
    // if queryParam does not exist
    // set to last known valid fragment
    this.queryParam =
      matchedFragment !== '' ? matchedFragment : this.toQueryParam;
    const selectedTab = this.tab.tabs.filter(x => x.tag === this.queryParam)[0];
    this.store.dispatch(
      new TabsAction.UpdateTab({
        name: this.componentName,
        tabIndex: selectedTab.index
      })
    );
    this.navigate();
    this.activeTab = selectedTab;
  }

  private escapeRegExp(routeFragment: string) {
    return routeFragment.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}
