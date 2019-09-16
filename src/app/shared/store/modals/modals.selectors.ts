import { createSelector } from '@ngrx/store';
import * as fromModal from './modals.reducers';
import * as fromApp from '../../../store/app.reducers';

const modals = (state: fromApp.AppState) => state.modals;

const modalId = (state: fromApp.AppState) => state.modals;

export const selectModals = createSelector(
  modals,
  (state: fromModal.State) => state.modals
);

export const selectModalId = createSelector(
  modalId,
  (state: fromModal.State) => state.modalId
);
