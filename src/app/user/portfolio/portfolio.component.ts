import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as PortfolioActions from "../store/portfolio/portfolio.actions";
import {
  AppModal,
  ModalDisplay,
  ModalViewModel,
  ModalContent,
} from "src/app/interfaces/shared/modal";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as ToggleActions from "../../shared/store/slide-toggle/slide-toggle.actions";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import * as fromPortfolio from "../store/portfolio/portfolio.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as fromUser from "../user.reducers";
import { AppToggle } from "src/app/interfaces";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"],
})
export class PortfolioComponent {
  componentToggle: AppToggle = {
    id: "portfolio",
    toggles: [
      {
        index: 0,
        name: "modal-upload-toggle",
        title: "Multiple Upload",
        state: false,
      },
    ],
  };
  componentModal: AppModal = {
    id: "portfolio",
    modals: [
      {
        index: 0,
        name: "gigs-modal",
        display: ModalDisplay.none,
        modalCss: "",
        modalDialogCss: "",
        showMagnifier: false,
      },
    ],
  };

  constructor(
    private store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {
    // setup all component modals here
    this.store.dispatch(
      new ModalsActions.AddComponentModal({
        componentModal: this.componentModal,
      })
    );

    // setup all component slide-toggles here
    this.store.dispatch(
      new ToggleActions.AddComponentToggle({
        componentToggle: this.componentToggle,
      })
    );
  }
}
