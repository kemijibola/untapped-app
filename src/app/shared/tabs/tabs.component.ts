import { Component, OnInit, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { Tab } from 'src/app/models';
import * as TabsAction from '../../store/global/tabs/tabs.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
  tabs: Tab[];
  constructor(private store: Store<fromApp.AppState>) { }

  ngAfterContentInit() {

    this.store.select('tabs').subscribe(val => {
      this.tabs = val.tabs;
    });
  }

  selectTab(tab: Tab) {
    tab.active = true;
    this.store.dispatch(new TabsAction.UpdateTab({index: tab.index, tab: tab}));
  }
}


