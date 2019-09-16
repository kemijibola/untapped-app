import { createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducers';
import * as fromApp from '../../store/app.reducers';

const errorMessage = (state: fromApp.AppState) => state.auth;
const userData = (state: fromApp.AppState) => state.auth;

export const selectErrorMessage = createSelector(
  errorMessage,
  (state: fromAuth.State) => state.errorMessage
);

export const selectUserData = createSelector(
  userData,
  (state: fromAuth.State) => state.userData
);
