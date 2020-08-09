import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as fromApp from "../../../store/app.reducers";
import * as ModalsAction from "./modals.actions";
import { Store } from "@ngrx/store";
import { map, mergeMap } from "rxjs/operators";
import * as fromModals from "./modals.reducers";
import { AppModal, IModal } from "src/app/interfaces";

@Injectable()
export class ModalsEffect {
  toggleModal = createEffect(() =>
    this.actions$.pipe(
      ofType(ModalsAction.TOGGLE_MODAL),
      map((action: ModalsAction.ToggleModal) => action.payload),
      mergeMap((payload) => {
        let updatedAppModal: AppModal = {
          id: payload.appModal.id,
          modals: [],
        };
        let activeModal: IModal;
        updatedAppModal.modals = payload.appModal.modals.reduce(
          (theMap: IModal[], theItem: IModal) => {
            if (theItem.name === payload.modal.name) {
              activeModal = {
                index: theItem.index,
                name: theItem.name,
                display: payload.modal.display,
                viewMode: payload.modal.viewMode,
                contentType: payload.modal.contentType,
                data: payload.modal.data,
                modalCss: payload.modal.modalCss,
                modalDialogCss: payload.modal.modalDialogCss,
                modalContentCss: payload.modal.modalContentCss,
                showMagnifier: payload.modal.showMagnifier,
              };
              theMap.push(activeModal);
            } else {
              theMap.push({
                index: theItem.index,
                name: theItem.name,
                display: theItem.display,
                viewMode: theItem.viewMode,
                contentType: theItem.contentType,
                data: theItem.data,
                modalCss: theItem.modalCss,
                modalDialogCss: theItem.modalDialogCss,
                modalContentCss: theItem.modalContentCss,
                showMagnifier: theItem.showMagnifier,
              });
            }
            return theMap;
          },
          []
        );
        return [
          {
            type: ModalsAction.UPSERT_MODAL,
            payload: updatedAppModal,
          },
          {
            type: ModalsAction.SET_CURRENT_MODAL,
            payload: activeModal,
          },
        ];
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}
}
