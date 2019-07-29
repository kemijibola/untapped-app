import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromTabs from '../store/app.reducers';
import * as TabsAction from '../shared/store/tabs/tabs.actions';
import { IAppTab, ITab } from '../interfaces';
import { AbstractTabComponent } from '../shared/Classes/abstract/abstract-tab/abstract-tab.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends AbstractTabComponent {
  tab: IAppTab;
  componentName = 'Talent';
  queryParam = 'talent';
  activeTab: ITab;
  toQueryParam = 'profile';
  constructor(
    public store: Store<fromTabs.AppState>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
    this.tab = {
      name: this.componentName,
      tabs: [
        { index: 0, title: 'Profile', tag: 'profile', active: false },
        { index: 1, title: 'Portfolio', tag: 'portfolio', active: false },
        { index: 2, title: 'Settings', tag: 'settings', active: false }
      ]
    };
  }
  navigate(): void {
    this.router.navigate(['/', this.route.snapshot.params['username']], {
      queryParams: { tab: this.queryParam }
    });
  }
}
