import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromTabs from '../store/app.reducers';
import * as TabsAction from '../shared/store/tabs/tabs.actions';
import { IAppTab, ITab } from '../interfaces';
import { AbstractTabComponent } from '../shared/Classes/abstract/abstract-tab/abstract-tab.component';

@Component({
  selector: 'app-user-contest',
  templateUrl: './user-contest.component.html',
  styleUrls: ['./user-contest.component.css']
})
export class UserContestComponent extends AbstractTabComponent {
  tab: IAppTab;
  componentName = 'UserContest';
  queryParam = 'contests';
  activeTab: ITab;
  toQueryParam: 'contests';
  constructor(
    public store: Store<fromTabs.AppState>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super();
    this.tab = {
      name: this.componentName,
      tabs: [
        { index: 0, title: 'Contest', tag: 'contests', active: false },
        { index: 1, title: 'New Contest', tag: 'new-contest', active: false },
        { index: 2, title: 'Setting', tag: 'setting', active: false }
      ]
    };
  }

  navigate(): void {
    this.router.navigate(['/user-contest'], {
      queryParams: { tab: this.queryParam }
    });
  }
}