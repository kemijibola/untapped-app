import { UserAccount, Transaction } from "./../../interfaces/account/wallet";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import {
  AppModal,
  ModalDisplay,
  ModalViewModel,
  IModal,
  PaymentProcessor,
} from "src/app/interfaces";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as fromModal from "../../shared/store/modals/modals.reducers";
import * as fromUser from "../user.reducers";
import * as fromWallet from "../store/wallet/wallet.reducer";
import * as BankActions from "../store/bank/bank.actions";
import { IWallet } from "src/app/interfaces/account/wallet";
import * as _ from "underscore";
import * as fromBanks from "../store/bank/bank.reducer";
import { Observable } from "rxjs";
import * as WalletActions from "../store/wallet/wallet.actions";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.css"],
})
export class WalletComponent implements OnInit {
  color = "green";

  transactionInitiated$ = this.userStore.pipe(
    select(fromWallet.selectTransactionInitiatedStatus)
  );

  transactionInProgress$ = this.userStore.pipe(
    select(fromWallet.selectTransactionInProgressStatus)
  );

  transactionIsCompleted$ = this.userStore.pipe(
    select(fromWallet.selectTransactionCompletedStatus)
  );

  transactionFailed$ = this.userStore.pipe(
    select(fromWallet.selectTransactionFailedStatus)
  );

  constructor(
    private userStore: Store<fromUser.UserState>,
    private store: Store<fromApp.AppState>
  ) {
    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = { ...val };
        }
      });

    this.userStore.dispatch(new WalletActions.FetchWallet());

    this.userStore.dispatch(new WalletActions.FetchUserTransaction());

    this.fetchUserTransaction();
  }
  componentModal: AppModal;
  walletData: IWallet | null;
  canSetupAccount: boolean = false;
  userTransactions: Transaction[] = [];
  userAccountDetails: UserAccount | null;

  ngOnInit(): void {
    this.userStore
      .pipe(select(fromWallet.selectCurrentUserWallet))
      .subscribe((val: IWallet) => {
        if (_.has(val, "_id")) {
          this.walletData = { ...val };
        }
      });

    this.store
      .pipe(select(fromBanks.selectUserAccount))
      .subscribe((val: UserAccount) => {
        if (_.has(val, "_id")) {
          this.userAccountDetails = { ...val };
          console.log(this.userAccountDetails);
        }
      });

    this.userStore
      .pipe(select(fromWallet.selectCompletedStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.closeModalDialog("new-wallet");
        }
      });

    this.userStore
      .pipe(select(fromWallet.selectPayoutCompletedStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.closeModalDialog("wallet-tranfer");
        }
      });

    this.userStore
      .pipe(select(fromBanks.selectAccountSetUpCompletedStatus))
      .subscribe((val: boolean) => {
        if (val) {
          this.closeModalDialog("account-setup");
        }
      });
  }

  fetchUserTransaction(): void {
    this.userStore
      .pipe(select(fromWallet.selectCurrentUserTransaction))
      .subscribe((val: Transaction[]) => {
        this.userTransactions = [...val];
      });
  }

  closeModalDialog(modalId: string) {
    if (this.componentModal) {
      const modalToDeActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      if (modalToDeActivate) {
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
  }

  onWithdraw(modalId: string, contentCss: string): void {
    this.openModalDialog(modalId, contentCss);
  }

  onSetupAccount(modalId: string, contentCss: string) {
    console.log("clicked");
    this.userStore.dispatch(
      new BankActions.FetchBanks({ processor: PaymentProcessor.paystack })
    );
    this.openModalDialog(modalId, contentCss);
  }

  openModalDialog(modalId: string, contentCss: string, data: any = null) {
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
          modalId.localeCompare("wallet-tranfer") === 0
            ? ModalViewModel.view
            : ModalViewModel.new,
        contentType: "",
        data,
        modalCss: "modal aligned-modal",
        modalDialogCss: "modal-dialog",
        modalContentCss: contentCss,
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
