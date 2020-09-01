import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  Inject,
} from "@angular/core";
import * as fromApp from "../../store/app.reducers";
import { AppModal, IModal } from "src/app/interfaces";
import { ModalDisplay } from "src/app/interfaces/shared/modal";
import { select, Store } from "@ngrx/store";
import * as fromModal from "../../shared/store/modals/modals.reducers";
import { DOCUMENT } from "@angular/common";
import * as ModalsAction from "../../shared/store/modals/modals.actions";
@Component({
  selector: "app-modals",
  templateUrl: "./modals.component.html",
  styleUrls: ["./modals.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ModalsComponent implements OnInit, OnDestroy {
  @Input() id: string;
  currentModal: IModal = {
    index: 0,
    name: "",
    display: ModalDisplay.none,
    modalCss: "",
    modalDialogCss: "",
    modalContentCss: "",
    showMagnifier: false,
  };

  constructor(
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(fromModal.selectCurrentActiveModal))
      .subscribe((modal: IModal) => {
        if (modal) {
          if (modal.name === this.id) {
            this.currentModal = { ...this.currentModal, ...modal };
            this.renderer.setStyle(this.document.body, "overflow-y", "hidden");
          }
          if (modal.display === "none") {
            // trigger close media here
            this.renderer.setStyle(this.document.body, "overflow-y", "scroll");
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(this.document.body, "overflow-y", "scroll");
  }
}
