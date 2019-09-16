import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as PortfolioActions from '../store/portfolio/portfolio.actions';
import {
  PortfolioQueryParams,
  MediaType,
  MediaUploadType,
  IAuthData,
  Modal,
  IMedia
} from 'src/app/interfaces';
import { selectModalId } from '../../shared/store/modals/modals.selectors';
import * as ModalsActions from '../../shared/store/modals/modals.actions';
import { AbstractModalComponent } from 'src/app/shared/Classes/abstract/abstract-modal/abstract-modal.component';
import * as fromPortfolio from '../store/portfolio/portfolio.reducers';
import { selectUserData } from '../../account/store/auth.selectors';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent extends AbstractModalComponent {
  modalId = '';
  mediaType: MediaType;
  items: IMedia[] = [];
  constructor(
    public store: Store<fromApp.AppState>,
    private featureStore: Store<fromPortfolio.PortfolioFeatureState>
  ) {
    super();
    this.store.pipe(select(selectModalId)).subscribe((modalId: string) => {
      if (modalId) {
        this.modalId = modalId;
        const modalConfig: Modal = {
          name: modalId,
          show: true
        };
        this.store.dispatch(new ModalsActions.AddModal(modalConfig));
      }
    });
  }
}
