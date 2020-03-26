import { selectShowMagnifier } from "./../store/modals/modals.selectors";
import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy
} from "@angular/core";
import * as fromApp from "../../store/app.reducers";
import {
  selectActiveModal,
  selectMagnifiedData
} from "../../shared/store/modals/modals.selectors";
import { AppModal, IModal } from "src/app/interfaces";
import {
  ModalDisplay,
  ModalViewModel,
  ModalContent,
  MagnifierData
} from "src/app/interfaces/shared/modal";
import { select, Store } from "@ngrx/store";
import { ModalService } from "src/app/services/modal.service";
import { stringify } from "querystring";
import {
  fetchNoMediaDefaultImage,
  fetchOriginalImage
} from "src/app/lib/Helper";
import * as ModalsActions from "../../shared/store/modals/modals.actions";

@Component({
  selector: "app-modals",
  templateUrl: "./modals.component.html",
  styleUrls: ["./modals.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ModalsComponent implements OnInit {
  @Input() id: string;
  currentModal: IModal = {
    index: 0,
    name: "",
    display: ModalDisplay.none,
    modalCss: "",
    modalDialogCss: "",
    showMagnifier: false
  };
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.pipe(select(selectActiveModal)).subscribe((modal: IModal) => {
      if (modal.name === this.id) {
        this.currentModal = { ...this.currentModal, ...modal };
      }
    });
  }
}
