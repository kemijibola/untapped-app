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
  }

}
