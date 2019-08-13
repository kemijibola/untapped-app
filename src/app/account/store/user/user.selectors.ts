import { createSelector } from '@ngrx/store';
import * as fromUser from './user.reducers';
import * as fromApp from '../../../store/app.reducers';

const user = (state: fromApp.AppState) => state.user;

export const selectUser = createSelector(
  user,
  (state: fromUser.State) => state.user
);
