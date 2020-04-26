import { Action } from "@ngrx/store";
import { IContest } from "../../../interfaces";

export const CREATE_CONTEST = "CREATE_CONTEST";
export const CREATE_CONTEST_SUCCESS = "CREATE_CONTEST_SUCCESS";
export const SET_CONTEST_IN_EDIT_MODE = "SET_CONTEST_IN_EDIT_MODE";
export const SET_CONTEST = "SET_CONTEST";
export const SET_CONTEST_BANNER = "SET_CONTEST_BANNER";

export class SetContestInEditMode implements Action {
  readonly type = SET_CONTEST_IN_EDIT_MODE;
  constructor(public payload: { editContest: IContest }) {}
}

export class CreateContestSuccess implements Action {
  readonly type = CREATE_CONTEST_SUCCESS;
}
export class SetContest implements Action {
  readonly type = SET_CONTEST;
  constructor(public payload: { contest: IContest }) {}
}

export class CreateContest implements Action {
  readonly type = CREATE_CONTEST;
  constructor(public payload: { newContest: IContest }) {}
}

export class SetContestBanner implements Action {
  readonly type = SET_CONTEST_BANNER;
  constructor(public payload: { bannerKey: string }) {}
}

export type NewContestActions =
  | CreateContest
  | SetContestBanner
  | SetContestInEditMode
  | SetContest
  | CreateContestSuccess;
