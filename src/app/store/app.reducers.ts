import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../account/store/auth.reducers';
import * as fromError from './global/error/error.reducers';
import * as fromRole from '../role/store/role.reducers';

export interface AppState {
  auth: fromAuth.State;
  exception: fromError.State;
  roles: fromRole.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  exception: fromError.errorReducer,
  roles: fromRole.roleReducer
};
