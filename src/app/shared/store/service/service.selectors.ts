import { createSelector } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as fromService from './service.reducers';

const service = (state: fromApp.AppState) => state.service;
const selectedService = (state: fromApp.AppState) => state.service;

export const selectService = createSelector(
  service,
  (state: fromService.State) => state.service
);

export const selectSelectedService = createSelector(
  selectedService,
  (state: fromService.State) => state.selectedService
);
