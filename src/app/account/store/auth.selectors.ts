import { createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducers';
import * as fromError from '../../store/global/error/error.reducers';
import * as fromApp from '../../store/app.reducers';

const errorData = (state: fromApp.AppState) => state.error;
const userData = (state: fromApp.AppState) => state.auth;

export const selectErrorMessage = createSelector(
  errorData,
  (state: fromError.State) => state.data
);

export const selectUserData = createSelector(
  userData,
  (state: fromAuth.State) => state.userData
);
