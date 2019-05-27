import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tab } from '../models';
import { Store } from '@ngrx/store';
import * as fromTabs from '../store/app.reducers';
import * as TabsAction from '../store/global/tabs/tabs.actions';

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrls: ['./talent.component.css']
})
export class TalentComponent implements OnInit {
  fragment;
  tabs: Tab[];

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromTabs.AppState>) {
    this.tabs = [
      {index: 0, title: 'Profile', tag: 'profile', active: false },
      {index: 1, title: 'Portfolio', tag: 'portfolio', active: false },
      {index: 2, title: 'Settings', tag: 'settings', active: false }
    ];
  }

  ngOnInit() {
    this.store.dispatch(new TabsAction.AddTabs({tabs: this.tabs}));

    this.fragment = this.route.snapshot.fragment ? this.route.snapshot.fragment.toLowerCase() : 'profile';

    if (this.route.snapshot.fragment) {
      this.route.fragment.subscribe((fragment) => {
        this.fragment = fragment.toLowerCase();
        this.setActiveTabByFragment();
      });
    }
    this.setActiveTabByFragment();
  }

  setActiveTabByFragment() {
    console.log(this.fragment);
    const activeTab = this.tabs.filter(x => x.tag === this.fragment);
    activeTab[0].active = true;
    this.store.dispatch(new TabsAction.UpdateTab({index: activeTab[0].index, tab: activeTab[0]}));
    this.router.navigate(['./', this.route.snapshot.params['username']], { fragment: activeTab[0].tag });
  }

}
