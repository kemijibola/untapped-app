import { Action } from "@ngrx/store";
import {
  IContestList,
  IContest,
  IContestIssue,
  IUserContest,
  CreateContest,
  ContestData,
  ContestEligibilityData,
} from "../../interfaces";

export const FETCH_CONTESTS_PREVIEW = "FETCH_CONTESTS_PREVIEW";
export const FETCH_CONTESTS_PREVIEW_SUCCESS = "FETCH_CONTESTS_PREVIEW_SUCCESS";
export const FETCH_CONTEST_PREVIEW = "FETCH_CONTEST_PREVIEW";
export const RESET_CONTESTS_PREVIEW_TO_DEFAULT =
  "RESET_CONTESTS_PREVIEW_TO_DEFAULT";
export const FETCH_CONTEST_BY_ID = "FETCH_CONTEST_BY_ID";
export const FETCH_CONTEST_BY_ID_SUCCESS = "FETCH_CONTEST_BY_ID_SUCCESS";
export const CHECK_USER_ELIGIBILITY = "CHECK_USER_ELIGIBILITY";
export const CHECK_USER_ELIGIBILITY_SUCCESS = "CHECK_USER_ELIGIBILITY_SUCCESS";
export const RESET_CONTEST_DATA = "RESET_CONTEST_DATA";
export const RESET_USER_ELIGIBILITY_STATUS = "RESET_USER_ELIGIBILITY_STATUS";

export class FetchContestById implements Action {
  readonly type = FETCH_CONTEST_BY_ID;
  constructor(public payload: { id: string }) {}
}
export class FetchContestByIdSuccess implements Action {
  readonly type = FETCH_CONTEST_BY_ID_SUCCESS;
  constructor(public payload: { contest: ContestData }) {}
}
export class FetchContestsPreview implements Action {
  readonly type = FETCH_CONTESTS_PREVIEW;
  constructor(public payload: { perPage: number; page: number }) {}
}
export class CheckUserEligibilitySuccess implements Action {
  readonly type = CHECK_USER_ELIGIBILITY_SUCCESS;
  constructor(public payload: { response: ContestEligibilityData }) {}
}
export class CheckUserEligibility implements Action {
  readonly type = CHECK_USER_ELIGIBILITY;
  constructor(public payload: { contestId: string }) {}
}

export class FetchContestsPreviewSuccess implements Action {
  readonly type = FETCH_CONTESTS_PREVIEW_SUCCESS;
  constructor(public payload: { runningContests: IContestList[] }) {}
}

export class FetchContestPreview implements Action {
  readonly type = FETCH_CONTEST_PREVIEW;
  constructor(public payload: { contestPreviewId: string }) {}
}

export class ResetContestsPreviewToDefault implements Action {
  readonly type = RESET_CONTESTS_PREVIEW_TO_DEFAULT;
}

export class ResetContestData implements Action {
  readonly type = RESET_CONTEST_DATA;
}
export class ResetUserEligibilityStatus implements Action {
  readonly type = RESET_USER_ELIGIBILITY_STATUS;
}
export type ContestsAction =
  | FetchContestById
  | FetchContestsPreview
  | FetchContestsPreviewSuccess
  | FetchContestPreview
  | ResetContestsPreviewToDefault
  | FetchContestByIdSuccess
  | CheckUserEligibility
  | CheckUserEligibilitySuccess
  | ResetContestData
  | ResetUserEligibilityStatus;
