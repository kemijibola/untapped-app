import { Component, OnInit } from "@angular/core";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import {
  AppModal,
  ModalDisplay,
  IModal,
  ModalViewModel
} from "src/app/interfaces";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as ModalsActions from "../../shared/store/modals/modals.actions";

@Component({
  selector: "app-talent-portfolio-albums",
  templateUrl: "./talent-portfolio-albums.component.html",
  styleUrls: ["./talent-portfolio-albums.component.css"]
})
export class TalentPortfolioAlbumsComponent extends AbstractModalComponent {
  modal: AppModal;
  modalToActivate: IModal;
  constructor(public store: Store<fromApp.AppState>) {
    super();
    this.modal = {
      component: "talent-portfolio",
      modals: [
        {
          index: 0,
          name: "album-modal",
          display: ModalDisplay.none,
          modalCss: "",
          modalDialogCss: ""
        }
      ]
    };
  }

  ngOnInit() {}

  openModalDialog(modalId: string) {
    this.modalToActivate = this.modal.modals.filter(x => x.name === modalId)[0];
    this.modalToActivate.display = ModalDisplay.table;
    this.modalToActivate.viewMode = ModalViewModel.new;
    this.modalToActivate.modalCss = "modal aligned-modal";
    this.modalToActivate.modalDialogCss = "modal-dialog-album-view";
    this.store.dispatch(
      new ModalsActions.ToggleModal({
        component: this.modal.component,
        modal: this.modalToActivate
      })
    );
  }

  closeModalDialog(modalId: string) {
    // set activeModal to null

    this.store.dispatch(new ModalsActions.ResetCurrentModal());
    this.modalToActivate = this.modal.modals.filter(x => x.name === modalId)[0];
    this.modalToActivate.display = ModalDisplay.none;
    this.store.dispatch(
      new ModalsActions.ToggleModal({
        component: this.modal.component,
        modal: this.modalToActivate
      })
    );
  }
}
