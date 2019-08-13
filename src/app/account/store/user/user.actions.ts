import { Action } from '@ngrx/store';
import { IUser } from 'src/app/interfaces';

export const FETCH_USER = 'FETCH_USER';
export const SET_USER = 'SET_USER';

export class FetchUser implements Action {
  readonly type = FETCH_USER;
  constructor(public payload: { id: string }) {}
}

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: { user: IUser }) {}
}

export type UserActions = FetchUser | SetUser;
