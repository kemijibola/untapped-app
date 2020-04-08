import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  MediaAcceptType,
  AppModal,
  MediaType,
  IMedia,
} from "src/app/interfaces";
import {
  ModalDisplay,
  ModalViewModel,
  ModalContent,
  IModal,
} from "src/app/interfaces/shared/modal";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromUser from "../../user.reducers";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import * as fromModal from "../../../shared/store/modals/modals.reducers";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";

@Component({
  selector: "app-portfolio-media-type",
  templateUrl: "./portfolio-media-type.component.html",
  styleUrls: ["./portfolio-media-type.component.css"],
})
export class PortfolioMediaTypeComponent implements OnInit, OnDestroy {
  svgs = [];
  selectedMediaType: MediaType;
  item: IMedia;
  componentModal: AppModal;
  viewMode: ModalViewModel = ModalViewModel.none;

  constructor(
    private userStore: Store<fromUser.UserState>,
    public store: Store<fromApp.AppState>
  ) {
    // super();
    this.store
      .pipe(select(fromModal.selectCurrentModal))
      .subscribe((val: AppModal) => {
        if (val) {
          this.componentModal = { ...val };
        }
      });
  }

  ngOnInit() {
    this.svgs = [
      {
        name: "AUDIO",
        selected: true,
      },
      {
        name: "IMAGE",
        selected: false,
      },
      {
        name: "VIDEO",
        selected: false,
      },
    ];
    this.selectedMediaType = this.svgs[0].name;
    this.userStore.dispatch(
      new PortfolioActions.SetPortfolioSelectedAcceptType({
        acceptType: MediaAcceptType[this.selectedMediaType],
      })
    );
  }

  openModalDialog(modalId: string) {
    this.store.dispatch(
      new ModalsActions.FetchAppModal({ appModalId: "portfolio" })
    );

    if (this.componentModal) {
      const modalToActivate = this.componentModal.modals.filter(
        (x) => x.name === modalId
      )[0];
      const modalToOpen: IModal = {
        index: modalToActivate.index,
        name: modalToActivate.name,
        display: ModalDisplay.table,
        viewMode: ModalViewModel.new,
        contentType: "",
        data: null,
        modalCss: "modal aligned-modal",
        modalDialogCss: "modal-dialog",
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

  closeModalDialog(modalId: string) {
    console.log("click");
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

  onSelect(index: number): void {
    if (index === 0) {
      this.svgs[0].selected = !this.svgs[0].selected;
      this.svgs[1].selected = false;
      this.svgs[2].selected = false;
      this.selectedMediaType = this.svgs[0].name;
    } else if (index === 1) {
      this.svgs[0].selected = false;
      this.svgs[1].selected = !this.svgs[1].selected;
      this.svgs[2].selected = false;
      this.selectedMediaType = this.svgs[1].name;
    } else if (index === 2) {
      this.svgs[0].selected = false;
      this.svgs[1].selected = false;
      this.svgs[2].selected = !this.svgs[2].selected;
      this.selectedMediaType = this.svgs[2].name;
    } else {
    }

    // emit accepte here
    this.userStore.dispatch(
      new PortfolioActions.SetPortfolioSelectedAcceptType({
        acceptType: MediaAcceptType[this.selectedMediaType],
      })
    );
  }

  ngOnDestroy() {
    // this.store.dispatch(new ModalsActions.ResetComponentPageState());
  }
}
