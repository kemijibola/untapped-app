import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as TabsAction from '../../../store/global/tabs/tabs.actions';
import { map } from 'rxjs-compat/operator/map';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Tab } from 'src/app/models';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  // @Input() title: string;
  // @Input() active = false;
  // @Input() tag: string;
  activeTab: Tab;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('tabs').subscribe(val => {
        this.activeTab = val.tabs.filter(x => x.active)[0];
    });
  }

}
