import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromTabs from '../store/app.reducers';
import * as TabsAction from '../shared/store/tabs/tabs.actions';
import { IAppTab, ITab } from '../interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterContentInit {
  tab: IAppTab;
  componentName = 'Talent';
  fragment: string;
  toFragment = 'profile';
  activeTab: ITab;
  constructor(
    private store: Store<fromTabs.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tab = {
      name: this.componentName,
      tabs: [
        { index: 0, title: 'Profile', tag: 'profile', active: false },
        { index: 1, title: 'Portfolio', tag: 'portfolio', active: false },
        { index: 2, title: 'Settings', tag: 'settings', active: false }
      ]
    };
  }

  ngOnInit() {
    this.store.dispatch(new TabsAction.AddTab(this.tab));
  }

  ngAfterContentInit() {
    this.fragment = this.route.snapshot.fragment
      ? this.route.snapshot.fragment.toLowerCase()
      : this.toFragment;
    // subscribing to fragment change
    this.route.fragment.subscribe((fragement: string) => {
      this.fragment = fragement ? fragement.toLowerCase() : this.toFragment;
      this.setActiveTabByFragment();
    });
  }

  // Make Tab component more resuable
  private setActiveTabByFragment() {
    // This is to check if fragment matches any of defined tabs
    let matchedFragment = '';
    for (const item of this.tab.tabs) {
      const escapeTag = this.escapeRegExp(item.tag);
      const regex = new RegExp(escapeTag, 'i');
      const fragmentMatch = this.fragment.match(regex);
      if (fragmentMatch) {
        matchedFragment = fragmentMatch[0];
        // update toFragment with latest valid fragment
        this.toFragment = fragmentMatch[0];
      }
    }
    // if fragment does not exist
    // set to last known valid fragment
    this.fragment = matchedFragment !== '' ? matchedFragment : this.toFragment;
    const selectedTab = this.tab.tabs.filter(x => x.tag === this.fragment)[0];
    this.store.dispatch(
      new TabsAction.UpdateTab({
        name: this.componentName,
        tabIndex: selectedTab.index
      })
    );
    this.router.navigate(['/', this.route.snapshot.params['username']], {
      fragment: this.fragment
    });
    this.activeTab = selectedTab;
  }
  private escapeRegExp(routeFragment: string) {
    return routeFragment.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}