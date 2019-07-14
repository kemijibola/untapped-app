import { createSelector, Store } from '@ngrx/store';
import { IRole } from 'src/app/interfaces';
import * as fromRole from './role.reducers';

const selectRoles = (state: fromRole.State) => state.roles;
const selectedRole = (state: fromRole.State) => state.selectedRole;

export const selectRoleList = createSelector(
  selectRoles,
  (state: IRole[]) => state
);

export const selectSelectedUserType = createSelector(
  selectedRole,
  (state: string) => state
);
