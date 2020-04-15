import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { ITab, IAppTab } from "src/app/interfaces";
import * as TabsAction from "../store/tabs/tabs.actions";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
// import { selectTabList } from "../../shared/store/tabs/tabs.selectors";
import * as fromTabReducer from "../../shared/store/tabs/tabs.reducers";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"],
})
export class TabsComponent implements OnInit, OnDestroy {
  tab: IAppTab;
  ngDestroyed = new Subject();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(fromTabReducer.selectCurrentTab))
      .subscribe((val: IAppTab) => {
        this.tab = { ...val };
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new TabsAction.DestroyTab({ id: this.tab.id }));
  }
}
