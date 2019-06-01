import { ActionReducerMap } from '@ngrx/store';
import * as fromTab from '../store/global/tabs/tabs.reducers';

export interface SharedState {
    tabs: fromTab.State;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
    tabs: fromTab.TabsReducers
};
