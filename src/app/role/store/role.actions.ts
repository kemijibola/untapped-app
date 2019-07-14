import { Action } from '@ngrx/store';
import { IRole } from 'src/app/interfaces';

export const FETCH_ROLES = 'FETCH_ROLES';
export const SET_ROLES = 'SET_ROLES';
export const SET_SELECTEDROLE = 'SET_SELECTEDROLE';
export const RESET_SELECTEDROLE = 'RESET_SELECTEDROLE';

export class SetRoles implements Action {
  readonly type = SET_ROLES;
  constructor(public payload: { roles: IRole[] }) {}
}

export class FetchRoles implements Action {
  readonly type = FETCH_ROLES;
}

export class SetSelectedRole implements Action {
  readonly type = SET_SELECTEDROLE;
  constructor(public payload: { selectedRole: string }) {}
}

export class ResetSelectedRole implements Action {
  readonly type = RESET_SELECTEDROLE;
  constructor(public payload: { selectedRole: string }) {}
}

export type RoleActions =
  | SetRoles
  | FetchRoles
  | SetSelectedRole
  | ResetSelectedRole;
