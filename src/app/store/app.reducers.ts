import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../account/store/auth.reducers';
import * as fromRole from '../role/store/role.reducers';
import * as fromError from './global/error/error.reducers';

export interface AppState {
    auth: fromAuth.State;
    roles: fromRole.State;
    exception: fromError.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    roles: fromRole.roleReducer,
    exception: fromError.errorReducer
};
