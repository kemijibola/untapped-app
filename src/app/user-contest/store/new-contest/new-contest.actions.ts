import { Action } from '@ngrx/store';
import { IContest } from '../../../interfaces';
import { IJudge } from 'src/app/interfaces/contests/Judge';

export const CREATE_CONTEST = 'CREATE_CONTEST';
export const SET_NEW_CONTEST = 'SET_NEW_CONTEST';
export const SET_CONTEST_BANNER = 'SET_CONTEST_BANNER';
export const SET_CONTEST_SUCCESS = 'CREATE_CONTEST_SUCCESS';
export const SET_CONTEST_FAILURE = 'CREATE_CONTEST_FAILURE';
export const ADD_CONTEST_JUDGE = 'ADD_CONTEST_JUDGE';

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
  constructor(public payload: { contest: IContest }) {}
}
export class SetContestFailure implements Action {
  readonly type = SET_CONTEST_FAILURE;
  constructor(public payload: { error: string }) {}
}
export class SetContestBanner implements Action {
  readonly type = SET_CONTEST_BANNER;
  constructor(public payload: { contestBanner: string }) {}
}

export class AddContestJudge implements Action {
  readonly type = ADD_CONTEST_JUDGE;
  constructor(public payload: { _id: string; judges: IJudge[] }) {}
}

export type NewContestActions =
  | CreateContest
  | SetContestSuccess
  | SetNewContest
  | SetContestFailure
  | SetContestBanner
  | AddContestJudge;
