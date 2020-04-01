import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as PortfolioActions from "../store/portfolio/portfolio.actions";
import {
  AppModal,
  ModalDisplay,
  ModalViewModel,
  ModalContent
} from "src/app/interfaces/shared/modal";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";
import * as fromPortfolio from "../store/portfolio/portfolio.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as fromUser from "../user.reducers";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"]
})
export class PortfolioComponent {
  constructor(
    private store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {}
}
