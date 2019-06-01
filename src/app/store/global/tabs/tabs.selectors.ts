import { createSelector, Store } from '@ngrx/store';
import * as fromTabs from './tabs.reducers';
import * as fromShared from '../../../shared/shared.reducers';



const selectTabs = (state: fromShared.SharedState) => state.tabs;

export const selectTabList = createSelector(
    selectTabs,
    (state: fromTabs.State) => state.tabs
);
