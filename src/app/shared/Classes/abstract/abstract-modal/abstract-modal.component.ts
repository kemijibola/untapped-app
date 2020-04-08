import {
  IModal,
  ModalDisplay,
  ModalViewModel,
  ModalContent,
} from "./../../../../interfaces/shared/modal";
import * as fromApp from "../../../../store/app.reducers";
import { OnInit } from "@angular/core";
import { AppModal } from "src/app/interfaces";
import { Store, select } from "@ngrx/store";
import * as ModalsAction from "../../../../shared/store/modals/modals.actions";
import * as fromModal from "../../../../shared/store/modals/modals.reducers";

export abstract class AbstractModalComponent implements OnInit {
  abstract store: Store<fromApp.AppState>;
  abstract componentModalId: string;
  // abstract appModal: AppModal;
  // activeModal: IModal;
  abstract openModalDialog(modalId: string, additionalParams?: any): void;
  abstract closeModalDialog(modalId: string, additionalParams?: any): void;
  constructor() {}

  ngOnInit() {
    // this.store
    //   .pipe(select(fromModal.selectCurrentActiveModal))
    //   .subscribe((val: IModal) => {
    //     if (val) {
    //       this.activeModal = { ...val };
    //     }
    //   });
  }
}
