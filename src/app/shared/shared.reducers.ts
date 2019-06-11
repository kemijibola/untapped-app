import { ActionReducerMap } from '@ngrx/store';
import * as fromTab from './store/tabs/tabs.reducers';
import * as fromUpload from './store/upload/upload.reducers';

export interface SharedState {
    tabs: fromTab.State;
    upload: fromUpload.State;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
    tabs: fromTab.TabsReducers,
    upload: fromUpload.UploadReducers
};
