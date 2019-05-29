import { createSelector, Store } from '@ngrx/store';
import * as fromTabs from './tabs.reducers';


const selectTabs = (state: fromTabs.FeatureState) => state.tabs;

export const selectTabList = createSelector(
    selectTabs,
    (state: fromTabs.State) => state.tabs
);
