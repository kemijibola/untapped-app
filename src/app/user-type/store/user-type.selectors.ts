import { createSelector, Store } from '@ngrx/store';
import { IUserType } from 'src/app/interfaces';
import * as fromUserType from './user-type.reducers';

const selectUserTypes = (state: fromUserType.State) => state.userTypes;
const selectedUserType = (state: fromUserType.State) => state.selectedUserType;

export const selectRoleList = createSelector(
  selectUserTypes,
  (state: IUserType[]) => state
);

export const selectSelectedUserType = createSelector(
  selectedUserType,
  (state: string) => state
);
