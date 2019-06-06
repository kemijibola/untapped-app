import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../account/store/auth.reducers';
import * as fromUserType from '../user-type/store/user-type.reducers';
import * as fromError from './global/error/error.reducers';

export interface AppState {
    auth: fromAuth.State;
    userTypes: fromUserType.State;
    exception: fromError.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    userTypes: fromUserType.userTypeReducer,
    exception: fromError.errorReducer
};
