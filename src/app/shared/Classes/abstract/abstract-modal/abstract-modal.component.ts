import * as fromApp from '../../../../store/app.reducers';
import { OnInit } from '@angular/core';
import { Modal } from 'src/app/interfaces';
import { Store, select } from '@ngrx/store';
import { selectModals } from '../../../../shared/store/modals/modals.selectors';

export abstract class AbstractModalComponent implements OnInit {
  abstract modalId: string;
  abstract store: Store<any>;
  currentModal: Modal = {
    name: '',
    show: false
  };
  constructor() {}

  ngOnInit() {
    this.store.pipe(select(selectModals)).subscribe((modals: Modal[]) => {
      if (modals.length > 0) {
        this.currentModal = modals.filter(
          x => x.show && x.name === this.modalId
        )[0] || {
          name: '',
          show: false
        };
      }
    });
  }
}
