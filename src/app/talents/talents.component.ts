import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../store/app.reducers";
import * as fromAuth from "src/app/account/store/auth.reducers";
import { IAuthData, IModal, ModalDisplay, AppModal } from "../interfaces";
import { Router } from "@angular/router";
import * as ModalsActions from "../shared/store/modals/modals.actions";
import * as fromModal from "../shared/store/modals/modals.reducers";
import * as _ from "underscore";

@Component({
  selector: "app-talents",
  templateUrl: "./talents.component.html",
  styleUrls: ["./talents.component.css"],
})
export class TalentsComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  searchPlaceHolderText = "Talents";
  appModal: AppModal;
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit() {
    this.store
      .pipe(select(fromAuth.selectCurrentUserData))
      .subscribe((val: IAuthData) => {
        this.isAuthenticated = val.authenticated;
      });

    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.appModal = { ...val };
        }
      });
  }

  onSignUpClicked() {
    this.router.navigate(["/account/signin"]);
  }

  ngOnDestroy() {
    if (_.has(this.appModal, "id")) {
      const modalToClose: IModal = {
        index: 0,
        name: "album-modal",
        display: ModalDisplay.none,
        modalCss: "",
        modalDialogCss: "",
        showMagnifier: false,
      };
      this.store.dispatch(
        new ModalsActions.ToggleModal({
          appModal: this.appModal,
          modal: modalToClose,
        })
      );
    }
  }
}
