import { Action } from '@ngrx/store';
import {
  IContestList,
  IContest,
  IContestIssue,
  IUserContest
} from '../../interfaces';

export const FETCH_CONTESTS = 'FETCH_CONTESTS';
export const SET_CONTESTS = 'SET_CONTESTS';
export const FETCH_CONTEST = 'FETCH_CONTEST';
export const SET_CONTEST = 'SET_CONTEST';

export class FetchContests implements Action {
  readonly type = FETCH_CONTESTS;
}
export class SetContests implements Action {
  readonly type = SET_CONTESTS;
  constructor(public payload: IContestList[]) {}
}
export class FetchContest implements Action {
  readonly type = FETCH_CONTEST;
  // payload is contest id
  constructor(public payload: string) {}
}
export class SetContest implements Action {
  readonly type = SET_CONTEST;
  constructor(public payload: IContest) {}
}

export type ContestsAction =
  | FetchContests
  | SetContests
  | FetchContest
  | SetContest;
