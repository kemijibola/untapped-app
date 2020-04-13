import { Action } from "@ngrx/store";
import {
  IContestList,
  IContest,
  IContestIssue,
  IUserContest,
  CreateContest
} from "../../interfaces";

export const FETCH_CONTESTS = "FETCH_CONTESTS";
export const SET_CONTESTS = "SET_CONTESTS";
export const FETCH_CONTEST = "FETCH_CONTEST";
export const SET_CONTEST = "SET_CONTEST";
export const DO_ENTER_CONTEST = "DO_ENTER_CONTEST";
export const SUCCESS_ENTER_CONTEST = "SUCCESS_ENTER_CONTEST";
export const FAILURE_ENTER_CONTEST = "FAILURE_ENTER_CONTEST";

export class FetchContests implements Action {
  readonly type = FETCH_CONTESTS;
}
export class SetContests implements Action {
  readonly type = SET_CONTESTS;
  constructor(public payload: { contestList: IContestList[] }) {}
}
export class SuccessEnterContest implements Action {
  readonly type = SUCCESS_ENTER_CONTEST;
}
export class FailureEnterContest implements Action {
  readonly type = FAILURE_ENTER_CONTEST;
  constructor(public payload: string) {}
}
export class DoEnterContest implements Action {
  readonly type = DO_ENTER_CONTEST;
  constructor(public payload: CreateContest) {}
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
  | SetContest
  | DoEnterContest
  | SuccessEnterContest
  | FailureEnterContest;
