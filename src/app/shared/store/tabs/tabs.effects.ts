import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import * as fromApp from "../../../store/app.reducers";
import * as TabsAction from "./tabs.actions";
import * as fromTabsReducer from "./tabs.reducers";
import { pipe } from "rxjs";
import { map, withLatestFrom, mergeMap } from "rxjs/operators";
import { IUpdateTab, ITab, IAppTab } from "src/app/interfaces";

@Injectable()
export class TabsEffect {
  updateTab = createEffect(() =>
    this.actions$.pipe(
      ofType(TabsAction.INITIATE_TAB_UPDATE),
      map((action: TabsAction.InitiateTabUpdate) => action.payload),
      map(payload => {
        let tabToActivate: ITab;
        let updatedTabPanel: IAppTab = {
          id: payload.tabPanel.id,
          tabs: []
        };
        updatedTabPanel.tabs = payload.tabPanel.tabs.reduce(
          (theMap: ITab[], theItem: ITab) => {
            if (theItem.tag === payload.tabName) {
              const activeTab = {
                index: theItem.index,
                tag: theItem.tag,
                title: theItem.title,
                active: true
              };
              theMap.push(activeTab);
              tabToActivate = { ...activeTab };
            } else {
              theMap.push({
                index: theItem.index,
                tag: theItem.tag,
                title: theItem.title,
                active: false
              });
            }
            return theMap;
          },
          []
        );
        return {
          type: TabsAction.UPSERT_TAB,
          payload: updatedTabPanel
        };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}
}
