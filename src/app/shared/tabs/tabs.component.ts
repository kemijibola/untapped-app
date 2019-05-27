import { Component, OnInit, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { Tab } from 'src/app/models';
import * as TabsAction from '../../store/global/tabs/tabs.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, AfterContentInit {
  tabs: Tab[];
  activeTab: Tab;
  fragment;
  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.store.select('tabs').subscribe(val => {
      this.tabs = val.tabs;
      this.activeTab = this.tabs.filter(x => x.active)[0];
    });
  }

  ngAfterContentInit() {
    this.fragment = this.route.snapshot.fragment ? this.route.snapshot.fragment.toLowerCase() : 'profile';

    if (this.route.snapshot.fragment) {
      this.route.fragment.subscribe((fragment) => {
        this.fragment = fragment.toLowerCase();
        this.setActiveTabByFragment();
      });
    }
    this.setActiveTabByFragment();
  }

  selectTab(tab: Tab) {
    tab.active = true;
    this.activeTab = tab;
    this.store.dispatch(new TabsAction.UpdateTab({index: tab.index, tab: tab}));
  }

  setActiveTabByFragment() {
    const activeTab = this.tabs.filter(x => x.tag === this.fragment);
    activeTab[0].active = true;
    this.store.dispatch(new TabsAction.UpdateTab({index: activeTab[0].index, tab: activeTab[0]}));
    this.router.navigate(['./', this.route.snapshot.params['username']], { fragment: activeTab[0].tag });
  }


}


