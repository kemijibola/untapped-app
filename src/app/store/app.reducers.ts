import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../account/store/auth.reducers';
import * as fromUserType from '../user-type/store/user-type.reducers';

export interface AppState {
    auth: fromAuth.State;
    userTypes: fromUserType.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    userTypes: fromUserType.userTypeReducer
};
