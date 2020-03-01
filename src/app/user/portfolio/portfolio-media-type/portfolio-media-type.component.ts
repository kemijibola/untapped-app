import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  MediaAcceptType,
  AppModal,
  MediaType,
  IMedia,
  MediaUploadType,
  PortfolioOperationType,
  AppPageState,
  PageViewMode
} from "src/app/interfaces";
import {
  ModalDisplay,
  ModalViewModel,
  ModalContent,
  IModal
} from "src/app/interfaces/shared/modal";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromUser from "../../user.reducers";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import {
  selectUserAudioList,
  selectUserVideoList,
  selectUserImageList
} from "../../store/portfolio/portfolio.selectors";
import { AbstractModalComponent } from "src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component";

@Component({
  selector: "app-portfolio-media-type",
  templateUrl: "./portfolio-media-type.component.html",
  styleUrls: ["./portfolio-media-type.component.css"]
})
export class PortfolioMediaTypeComponent extends AbstractModalComponent
  implements OnInit, OnDestroy {
  svgs = [];
  selectedMediaType: MediaType;
  item: IMedia;
  modal: AppModal;
  modalToActivate: IModal;
  viewMode: ModalViewModel = ModalViewModel.none;

  constructor(
    private userStore: Store<fromUser.UserState>,
    public store: Store<fromApp.AppState>
  ) {
    super();
    this.modal = {
      component: "portfolio",
      modals: [
        {
          index: 0,
          name: "gigs-modal",
          display: ModalDisplay.none
        }
      ]
    };
  }

  ngOnInit() {
    this.svgs = [
      {
        name: "AUDIO",
        selected: true
      },
      {
        name: "IMAGE",
        selected: false
      },
      {
        name: "VIDEO",
        selected: false
      }
    ];
    this.selectedMediaType = this.svgs[0].name;
    this.userStore.dispatch(
      new PortfolioActions.SetPortfolioSelectedAcceptType(
        MediaAcceptType[this.selectedMediaType]
      )
    );
  }

  openModalDialog(modalId: string) {
    this.modalToActivate = this.modal.modals.filter(x => x.name === modalId)[0];
    this.modalToActivate.display = ModalDisplay.block;
    this.modalToActivate.viewMode = ModalViewModel.new;
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
      new PortfolioActions.SetPortfolioSelectedAcceptType(
        MediaAcceptType[this.selectedMediaType]
      )
    );
  }

  // onMediaTypeSelected(type: MediaType): void {
  //   switch (type) {
  //     case MediaType.AUDIO:
  //       this.featureStore
  //         .pipe(select(selectUserAudioList))
  //         .subscribe((audios: IMedia[]) => {
  //           console.log('audio', audios);
  //           // this.item =
  //         });
  //       return;
  //     case MediaType.VIDEO:
  //       this.featureStore
  //         .pipe(select(selectUserVideoList))
  //         .subscribe((videos: IMedia[]) => {
  //           console.log('videos', videos);
  //         });
  //       return;
  //     case MediaType.IMAGE:
  //       this.featureStore
  //         .pipe(select(selectUserImageList))
  //         .subscribe((images: IMedia[]) => {
  //           console.log('images', images);
  //         });
  //       return;
  //   }
  // }
  ngOnDestroy() {
    // this.store.dispatch(new ModalsActions.ResetComponentPageState());
  }
}
