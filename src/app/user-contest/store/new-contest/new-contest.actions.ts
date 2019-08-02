import { Action } from '@ngrx/store';
import { IContest } from '../../../interfaces';

export const CREATE_CONTEST = 'CREATE_CONTEST';
export const SET_NEW_CONTEST = 'SET_NEW_CONTEST';
export const SET_CONTEST_BANNER = 'SET_CONTEST_BANNER';
export const SET_CONTEST_SUCCESS = 'CREATE_CONTEST_SUCCESS';
export const SET_CONTEST_FAILURE = 'CREATE_CONTEST_FAILURE';

export class CreateContest implements Action {
  readonly type = CREATE_CONTEST;
  constructor(public payload: IContest) {}
}
export class SetContestSuccess implements Action {
  // THe overview screen is displayed
  readonly type = SET_CONTEST_SUCCESS;
}
export class SetNewContest implements Action {
  readonly type = SET_NEW_CONTEST;
  constructor(public payload: IContest) {}
}
export class SetContestFailure implements Action {
  readonly type = SET_CONTEST_FAILURE;
  constructor(public payload: string) {}
}
export class SetContestBanner implements Action {
  readonly type = SET_CONTEST_BANNER;
  constructor(public payload: string) {}
}

export type NewContestActions =
  | CreateContest
  | SetContestSuccess
  | SetNewContest
  | SetContestFailure
  | SetContestBanner;
