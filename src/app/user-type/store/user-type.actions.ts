import { Action } from '@ngrx/store';
import { IUserType } from 'src/app/interfaces';

export const FETCH_USER_TYPES = 'FETCH_USER_TYPES';
export const SET_USER_TYPES = 'SET_USER_TYPES';
export const SET_SELECTED_USER_TYPE = 'SET_SELECTED_USER_TYPE';
export const RESET_SELECTED_USER_TYPE = 'RESET_SELECTED_USER_TYPE';

export class SetUserTypes implements Action {
  readonly type = SET_USER_TYPES;
  constructor(public payload: IUserType[]) {}
}

export class FetchUserTypes implements Action {
  readonly type = FETCH_USER_TYPES;
}

export class SetSelectedUserType implements Action {
  readonly type = SET_SELECTED_USER_TYPE;
  constructor(public payload: string) {}
}

export class ResetSelectedUserType implements Action {
  readonly type = RESET_SELECTED_USER_TYPE;
  constructor(public payload: string) {}
}

export type UserTypeActions =
  | SetUserTypes
  | FetchUserTypes
  | SetSelectedUserType
  | ResetSelectedUserType;
