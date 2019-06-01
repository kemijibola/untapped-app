import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tab, AppTab } from '../models';
import { Store } from '@ngrx/store';
import * as fromTabs from '../store/app.reducers';
import * as TabsAction from '../store/global/tabs/tabs.actions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.css']
})
export class TalentComponent implements OnInit, OnDestroy {
  tab: AppTab;
  tab2: AppTab;
  componentName = 'Talent';

  constructor(private store: Store<fromTabs.AppState>) {

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
    // set up tabs with default properties
    this.store.dispatch(new TabsAction.AddTab({tab: this.tab}));
  }

  ngOnDestroy() {
    this.store.dispatch(new TabsAction.DestroyTab({name: this.componentName}));
  }

}
