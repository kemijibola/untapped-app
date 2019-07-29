import { createSelector } from '@ngrx/store';
import * as fromTabs from './tabs.reducers';
import * as fromApp from '../../../store/app.reducers';

const selectTabs = (state: fromApp.AppState) => state.appTabs;

export const selectTabList = createSelector(
  selectTabs,
  (state: fromTabs.State) => state.tabs
);
