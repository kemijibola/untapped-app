import { Action } from '@ngrx/store';
import {
  IContestList,
  IContest,
  IContestIssue,
  IUserContest
} from '../../interfaces';

export const FETCH_CONTESTS = 'FETCH_CONTESTS';
export const SET_CONTESTS = 'SET_CONTESTS';
export const FETCH_USER_CONTESTS = 'FETCH_USER_CONTESTS';
export const FETCH_USER_CONTEST = 'FETCH_USER_CONTEST';
export const SET_USER_CONTEST = 'SET_USER_CONTEST';
export const SET_USER_CONTESTS = 'SET_USER_CONTESTS';
export const FETCH_CONTEST = 'FETCH_CONTEST';
export const SET_CONTEST = 'SET_CONTEST';
export const CREATE_CONTEST = 'CREATE_CONTEST';
export const CREATE_CONTEST_SUCCESS = 'CREATE_CONTEST_SUCCESS';
export const CREATE_CONTEST_FAILURE = 'CREATE_CONTEST_FAILURE';
export const CREATE_CONTEST_ISSUE = 'CREATE_CONTEST_ISSUE';
export const CREATE_CONTEST_ISSUE_SUCCESS = 'CREATE_CONTEST_ISSUE_SUCCESS';
export const CREATE_CONTEST_ISSUE_FAILURE = 'CREATE_CONTEST_ISSUE_FAILURE';
export const SET_CONTEST_BANNER = 'SET_CONTEST_BANNER';

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
export class FetchUserContests implements Action {
  readonly type = FETCH_USER_CONTESTS;
  // payload is current user Id
  constructor(public payload: string) {}
}
export class FetchUserContest implements Action {
  readonly type = FETCH_USER_CONTEST;
}
export class SetUserContest implements Action {
  readonly type = SET_USER_CONTEST;
  constructor(public payload: IContest) {}
}

export class SetUserContests implements Action {
  readonly type = SET_USER_CONTESTS;
  constructor(public payload: IUserContest[]) {}
}
export class SetContest implements Action {
  readonly type = SET_CONTEST;
  constructor(public payload: IContest) {}
}
export class CreateContest implements Action {
  readonly type = CREATE_CONTEST;
  constructor(public payload: IContest) {}
}
export class CreateContestSuccess implements Action {
  // THe overview screen is displayed
  readonly type = CREATE_CONTEST_SUCCESS;
}
export class CreateContestFailure implements Action {
  readonly type = CREATE_CONTEST_FAILURE;
  constructor(public payload: string) {}
}
export class CreateContestIssue implements Action {
  readonly type = CREATE_CONTEST_ISSUE;
  constructor(public payload: IContestIssue) {}
}
export class CreateContestIssueSuccess implements Action {
  // THe overview screen is displayed
  readonly type = CREATE_CONTEST_SUCCESS;
  constructor(public payload: IContest) {}
}
export class CreateContestIssueFailure implements Action {
  readonly type = CREATE_CONTEST_ISSUE_FAILURE;
  constructor(public payload: string) {}
}
export class SetContestBanner implements Action {
  readonly type = SET_CONTEST_BANNER;
  constructor(public payload: string) {}
}

export type ContestsAction =
  | FetchContests
  | SetContests
  | FetchContest
  | SetContest
  | FetchUserContests
  | FetchUserContest
  | SetUserContest
  | SetUserContests
  | CreateContest
  | CreateContestSuccess
  | CreateContestFailure
  | CreateContestIssue
  | CreateContestIssueSuccess
  | CreateContestIssueFailure
  | SetContestBanner;
