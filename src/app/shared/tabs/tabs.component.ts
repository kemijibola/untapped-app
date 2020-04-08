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
export class TabsComponent implements OnInit, OnChanges, OnDestroy {
  tab: Observable<IAppTab>;
  @Input() tabId: string;
  ngDestroyed = new Subject();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.tab = this.store.pipe(select(fromTabReducer.selectCurrentTab));
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple["tabId"]) {
      this.store.dispatch(new TabsAction.FetchAppTab({ appTabId: this.tabId }));
    }
  }

  ngOnDestroy() {
    console.log("dispatching tab");
    this.store.dispatch(new TabsAction.DestroyTab({ id: this.tabId }));
  }
}
