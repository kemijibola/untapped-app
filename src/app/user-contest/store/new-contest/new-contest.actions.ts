import { Action } from "@ngrx/store";
import { IContest } from "../../../interfaces";

export const CREATE_CONTEST = "CREATE_CONTEST";
export const UPDATE_CONTEST = "UPDATE_CONTEST";
export const CREATE_CONTEST_SUCCESS = "CREATE_CONTEST_SUCCESS";
export const CREATE_CONTEST_ERROR = "CREATE_CONTEST_ERROR";
export const UPDATE_CONTEST_ERROR = "UPDATE_CONTEST_ERROR";
export const SET_CONTEST_IN_EDIT_MODE = "SET_CONTEST_IN_EDIT_MODE";
export const SET_CONTEST = "SET_CONTEST";
export const SET_CONTEST_BANNER = "SET_CONTEST_BANNER";
export const SET_CONTEST_AGREEMENT = "SET_CONTEST_AGREEMENT";

export class SetContestInEditMode implements Action {
  readonly type = SET_CONTEST_IN_EDIT_MODE;
  constructor(public payload: { editContest: IContest }) {}
}

export class CreateContestSuccess implements Action {
  readonly type = CREATE_CONTEST_SUCCESS;
}
export class SetContestAgreement implements Action {
  readonly type = SET_CONTEST_AGREEMENT;
  constructor(public payload: { status: boolean }) {}
}
export class SetContest implements Action {
  readonly type = SET_CONTEST;
  constructor(public payload: { contest: IContest }) {}
}

export class CreateContest implements Action {
  readonly type = CREATE_CONTEST;
  constructor(public payload: { newContest: IContest }) {}
}

export class UpdateContest implements Action {
  readonly type = UPDATE_CONTEST;
  constructor(public payload: { newContest: IContest }) {}
}
export class SetContestBanner implements Action {
  readonly type = SET_CONTEST_BANNER;
  constructor(public payload: { bannerKey: string }) {}
}

export class UpdateContestError implements Action {
  readonly type = UPDATE_CONTEST_ERROR;
}
export class CreateContestError implements Action {
  readonly type = CREATE_CONTEST_ERROR;
}

export type NewContestActions =
  | CreateContest
  | SetContestBanner
  | SetContestInEditMode
  | SetContest
  | CreateContestSuccess
  | CreateContestError
  | SetContestAgreement
  | UpdateContest
  | UpdateContestError;
