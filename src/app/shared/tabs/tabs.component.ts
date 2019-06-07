import { Component, OnInit, AfterContentInit, Input, OnDestroy } from '@angular/core';
import { Tab, AppTab } from 'src/app/models';
import * as TabsAction from '../../store/global/tabs/tabs.actions';
import { Store, select } from '@ngrx/store';
import * as fromShared from '../shared.reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnDestroy {
  appTab: AppTab;
  @Input() activeTab: Tab;
  @Input() appTabName: string;
  ngDestroyed = new Subject();
  constructor(
    private store: Store<fromShared.SharedState>) {}

  ngOnInit() {
    this.store
    .pipe(
        select('shared'),
        takeUntil(this.ngDestroyed)
      )
    .subscribe(val => {
      this.appTab = val['tabs'].tabs.filter((x: { name: string; }) => x.name === this.appTabName)[0];
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new TabsAction.DestroyTab({name: this.appTabName}));
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }
}


