import { Component, OnInit, Input } from '@angular/core';
import * as fromApp from '../../store/app.reducers';
import { selectModals } from '../../shared/store/modals/modals.selectors';
import { Modal } from 'src/app/interfaces';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {
  currentModal: Modal = {
    name: '',
    show: false
  };
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.pipe(select(selectModals)).subscribe((modals: Modal[]) => {
      if (modals.length > 0) {
        this.currentModal = modals.filter(x => x.show && x.name)[0] || {
          name: '',
          show: false
        };
      }
    });
  }
}
