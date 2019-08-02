import { Action } from '@ngrx/store';
import { IUserContest } from '../../../interfaces';

export const FETCH_USER_CONTESTS = 'FETCH_USER_CONTESTS';
export const SET_USER_CONTESTS = 'SET_USER_CONTESTS';

export class FetchUserContests implements Action {
  readonly type = FETCH_USER_CONTESTS;
  // payload is current user Id
  constructor(public payload: string) {}
}

export class SetUserContests implements Action {
  readonly type = SET_USER_CONTESTS;
  constructor(public payload: IUserContest[]) {}
}

export type AllContestActions = FetchUserContests | SetUserContests;
