import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-wallet",
  templateUrl: "./wallet.component.html",
  styleUrls: ["./wallet.component.css"],
})
export class WalletComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  closeModalDialog(modalId: string) {
    // if (this.componentModal) {
    //   const modalToDeActivate = this.componentModal.modals.filter(
    //     (x) => x.name === modalId
    //   )[0];
    //   const modalToClose: IModal = {
    //     index: modalToDeActivate.index,
    //     name: modalToDeActivate.name,
    //     display: ModalDisplay.none,
    //     viewMode: ModalViewModel.none,
    //     contentType: "",
    //     data: null,
    //     modalCss: "",
    //     modalDialogCss: "",
    //     modalContentCss: "",
    //     showMagnifier: false,
    //   };
    //   this.store.dispatch(
    //     new ModalsActions.ToggleModal({
    //       appModal: this.componentModal,
    //       modal: modalToClose,
    //     })
    //   );
    // }
  }

  openModalDialog(modalId: string, data: any = null) {
    // set MediaType
    // this.entryMediaType = this.contestDetails.contest.entryMediaType;
    // this.store.dispatch(
    //   new ModalsActions.FetchAppModal({ appModalId: "contest" })
    // );
    // if (this.componentModal) {
    //   const modalToActivate = this.componentModal.modals.filter(
    //     (x) => x.name === modalId
    //   )[0];
    //   const modalToOpen: IModal = {
    //     index: modalToActivate.index,
    //     name: modalToActivate.name,
    //     display: ModalDisplay.table,
    //     viewMode:
    //       modalId.localeCompare("talent-entry-details") === 0
    //         ? ModalViewModel.view
    //         : ModalViewModel.new,
    //     contentType: "",
    //     data,
    //     modalCss: "modal aligned-modal",
    //     modalDialogCss: "modal-dialog",
    //     modalContentCss:
    //       modalId.localeCompare("talent-entry-details") === 0
    //         ? "modal-content contest-d"
    //         : "modal-content contest-d new-entry",
    //     showMagnifier: false,
    //   };
    //   this.store.dispatch(
    //     new ModalsActions.ToggleModal({
    //       appModal: this.componentModal,
    //       modal: modalToOpen,
    //     })
    //   );
    // }
    // if (this.contestDetails.submissions.length <= 1) {
    //   this.leftDisabled = true;
    //   this.rightDisabled = true;
    //   this.store.dispatch(
    //     new ModalsActions.SetModalNavigationProperties({
    //       currentIndex: 0,
    //       mediaType: this.contestDetails.contest.entryMediaType,
    //     })
    //   );
    // } else {
    //   this.leftDisabled = true;
    //   this.rightDisabled = false;
    //   this.onNext();
    // }
  }
}
