import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as fromApp from "../../../store/app.reducers";
import * as ToggleActions from "./slide-toggle.actions";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs/operators";
import { AppToggle, IToggle } from "src/app/interfaces";

@Injectable()
export class SlideToggleEffect {
  initiateToggle = createEffect(() =>
    this.actions$.pipe(
      ofType(ToggleActions.INITIATE_TOGGLE),
      map((action: ToggleActions.InitiateToggle) => action.payload),
      map((payload) => {
        let updatedAppToggle: AppToggle = {
          id: payload.componentToggle.id,
          toggles: [],
        };
        updatedAppToggle.toggles = payload.componentToggle.toggles.reduce(
          (theMap: IToggle[], theItem: IToggle) => {
            if (theItem.name === payload.toggle.name) {
              let toggleToUpdate = {
                index: theItem.index,
                name: theItem.name,
                title: theItem.title,
                state: payload.toggle.state,
              };
              theMap.push(toggleToUpdate);
            } else {
              theMap.push({
                index: theItem.index,
                name: theItem.name,
                title: theItem.title,
                state: theItem.state,
              });
            }
            return theMap;
          },
          []
        );
        return {
          type: ToggleActions.UPSERT_TOGGLE,
          payload: updatedAppToggle,
        };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}
}
