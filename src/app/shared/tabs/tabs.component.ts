import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  OnDestroy
} from '@angular/core';
import { ITab, IAppTab } from 'src/app/interfaces';
import * as TabsAction from '../store/tabs/tabs.actions';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectTabList } from '../../shared/store/tabs/tabs.selectors';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnDestroy {
  appTab: IAppTab;
  @Input() activeTab: ITab;
  @Input() appTabName: string;
  ngDestroyed = new Subject();
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(
        select(selectTabList),
        takeUntil(this.ngDestroyed)
      )
      .subscribe((val: IAppTab[]) => {
        this.appTab = val.filter(x => x.name === this.appTabName)[0];
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new TabsAction.DestroyTab({ name: this.appTabName }));
    this.ngDestroyed.next();
    this.ngDestroyed.complete();
  }
}
