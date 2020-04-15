import { Action } from "@ngrx/store";
import { IContest, IUserContest } from "src/app/interfaces";

export const FETCH_USER_CONTEST_LIST = "FETCH_USER_CONTEST_LIST";
export const FETCH_USER_CONTEST_LIST_SUCCESS =
  "FETCH_USER_CONTEST_LIST_SUCCESS";
export const FETCH_USER_CONTEST_BY_ID = "FETCH_USER_CONTEST_BY_ID";
export const CREATE_CONTEST = "CREATE_CONTEST";
export const SET_CONTEST_IN_EDIT_MODE = "SET_CONTEST_IN_EDIT_MODE";
export const SET_CONTEST_BANNER = "SET_CONTEST_BANNER";

export class FetchUserContestList implements Action {
  readonly type = FETCH_USER_CONTEST_LIST;
}

export class SetContestInEditMode implements Action {
  readonly type = SET_CONTEST_IN_EDIT_MODE;
  constructor(public payload: { editContest: IContest }) {}
}

export class FetchUserContestListSuccess implements Action {
  readonly type = FETCH_USER_CONTEST_LIST_SUCCESS;
  constructor(public payload: { userContests: IUserContest[] }) {}
}

export class FetchUserContestById implements Action {
  readonly type = FETCH_USER_CONTEST_BY_ID;
  constructor(public payload: { contestId: string }) {}
}

export class CreateContest implements Action {
  readonly type = CREATE_CONTEST;
  constructor(public payload: { newContest: IContest }) {}
}

export class SetContestBanner implements Action {
  readonly type = SET_CONTEST_BANNER;
  constructor(public payload: { bannerKey: string }) {}
}

export type UserContestActions =
  | FetchUserContestList
  | FetchUserContestListSuccess
  | FetchUserContestById
  | FetchUserContestById
  | CreateContest
  | SetContestBanner
  | SetContestInEditMode;
