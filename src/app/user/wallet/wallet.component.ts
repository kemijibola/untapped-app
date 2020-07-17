import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  AppModal,
  ModalDisplay,
  ModalViewModel,
  IModal,
} from "src/app/interfaces";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as fromModal from "../../shared/store/modals/modals.reducers";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.css"],
})
export class WalletComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  componentModal: AppModal;

  ngOnInit(): void {
    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = { ...val };
        }
      });
  }

  closeModalDialog(modalId: string) {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      const modalToClose: IModal = {
        index: modalToDeActivate.index,
        name: modalToDeActivate.name,
        display: ModalDisplay.none,
        viewMode: ModalViewModel.none,
        contentType: "",
        data: null,
        modalCss: "",
        modalDialogCss: "",
        modalContentCss: "",
        showMagnifier: false,
      };
      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToClose,
        })
      );
    }
  }

  openModalDialog(modalId: string, data: any = null) {
    // set MediaType
    this.store.dispatch(
      new ModalsActions.FetchAppModal({ appModalId: "user-wallet" })
    );

    if (this.componentModal) {
      const modalToActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      const modalToOpen: IModal = {
        index: modalToActivate.index,
        name: modalToActivate.name,
        display: ModalDisplay.table,
        viewMode:
          modalId.localeCompare("wallet-data") === 0
            ? ModalViewModel.view
            : ModalViewModel.new,
        contentType: "",
        data,
        modalCss: "modal aligned-modal",
        modalDialogCss: "modal-dialog",
        modalContentCss:
          modalId.localeCompare("talent-entry-details") === 0
            ? "modal-content contest-d"
            : "modal-content contest-d new-entry",
        showMagnifier: false,
      };
      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.componentModal,
          modal: modalToOpen,
        })
      );
    }
  }
}
