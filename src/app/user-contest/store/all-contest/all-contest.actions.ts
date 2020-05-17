import { Action } from "@ngrx/store";
import { IUserContest, IUserContestListAnalysis } from "../../../interfaces";

export const FETCH_USER_CONTEST_LIST = "FETCH_USER_CONTEST_LIST";
export const FETCH_USER_CONTEST_LIST_SUCCESS =
  "FETCH_USER_CONTEST_LIST_SUCCESS";
export const FETCH_USER_CONTEST_BY_ID = "FETCH_USER_CONTEST_BY_ID";

export class FetchUserContestList implements Action {
  readonly type = FETCH_USER_CONTEST_LIST;
}

export class FetchUserContestListSuccess implements Action {
  readonly type = FETCH_USER_CONTEST_LIST_SUCCESS;
  constructor(public payload: { userContests: IUserContestListAnalysis[] }) {}
}

export class FetchUserContestById implements Action {
  readonly type = FETCH_USER_CONTEST_BY_ID;
  constructor(public payload: { contestId: string }) {}
}

export type AllContestActions =
  | FetchUserContestList
  | FetchUserContestListSuccess
  | FetchUserContestById;
