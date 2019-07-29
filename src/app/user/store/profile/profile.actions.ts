import { Action } from '@ngrx/store';
import { IProfile } from '../../../interfaces';

export const FETCH_USERPROFILE = 'FETCH_USERPROFILE';
export const SET_USERPROFILE = 'SET_USERPROFILE';
export const UPDATE_USERPROFILE = 'UPDATE_USERPROFILE';

export class UpdateUserProfile implements Action {
  readonly type = UPDATE_USERPROFILE;
  constructor(public payload: IProfile) {}
}

export class FetchUserProfile implements Action {
  readonly type = FETCH_USERPROFILE;
}

export class SetUserProfile implements Action {
  readonly type = SET_USERPROFILE;
  constructor(public payload: IProfile) {}
}

export type ProfileActions =
  | UpdateUserProfile
  | FetchUserProfile
  | SetUserProfile;
