import { Action } from "@ngrx/store";
import {
  IContestList,
  IContest,
  IContestIssue,
  IUserContest,
  CreateContest,
  ContestData,
  ContestEligibilityData,
} from "../../../interfaces";

export const SET_SELECTED_CONTEST = "SET_SELECTED_CONTEST";
export const FETCH_CONTEST_BY_ID = "FETCH_CONTEST_BY_ID";
export const CHECK_USER_ELIGIBILITY = "CHECK_USER_ELIGIBILITY";
export const CHECK_USER_ELIGIBILITY_SUCCESS = "CHECK_USER_ELIGIBILITY_SUCCESS";

export class SetSelectedContest implements Action {
  readonly type = SET_SELECTED_CONTEST;
  constructor(public payload: { selectedContest: ContestData }) {}
}

export class FetchContestById implements Action {
  readonly type = FETCH_CONTEST_BY_ID;
  constructor(public payload: { contestId: string }) {}
}

export class CheckUserEligibilitySuccess implements Action {
  readonly type = CHECK_USER_ELIGIBILITY_SUCCESS;
  constructor(public payload: { response: ContestEligibilityData }) {}
}
export class CheckUserEligibility implements Action {
  readonly type = CHECK_USER_ELIGIBILITY;
  constructor(public payload: { contestId: string }) {}
}

export type ContestActions =
  | SetSelectedContest
  | FetchContestById
  | CheckUserEligibilitySuccess
  | CheckUserEligibility;
