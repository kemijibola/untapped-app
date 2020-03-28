import {
  IModal,
  ModalDisplay,
  ModalViewModel,
  ModalContent
} from "./../../../../interfaces/shared/modal";
import * as fromApp from "../../../../store/app.reducers";
import { OnInit } from "@angular/core";
import { AppModal } from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import * as ModalsAction from "../../../../shared/store/modals/modals.actions";

export abstract class AbstractModalComponent implements OnInit {
  abstract store: Store<fromApp.AppState>;
  abstract modal: AppModal;
  abstract openModalDialog(modalId: string, additionalParams?: any): void;
  abstract closeModalDialog(modalId: string, additionalParams?: any): void;
  constructor() {}

  ngOnInit() {
    // console.log(this.modal);
    // this.store.dispatch(new ModalsAction.AddComponentModals(this.modal));
  }
}
