import { Action } from "@ngrx/store";
import {
  IContestList,
  IContest,
  IContestIssue,
  IUserContest,
  CreateContest,
} from "../../interfaces";

export const FETCH_CONTESTS_PREVIEW = "FETCH_CONTESTS_PREVIEW";
export const FETCH_CONTESTS_PREVIEW_SUCCESS = "FETCH_CONTESTS_PREVIEW_SUCCESS";
export const FETCH_CONTEST_PREVIEW = "FETCH_CONTEST_PREVIEW";
export const RESET_CONTESTS_PREVIEW_TO_DEFAULT =
  "RESET_CONTESTS_PREVIEW_TO_DEFAULT";

export class FetchContestsPreview implements Action {
  readonly type = FETCH_CONTESTS_PREVIEW;
  constructor(public payload: { perPage: number; page: number }) {}
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
export type ContestsAction =
  | FetchContestsPreview
  | FetchContestsPreviewSuccess
  | FetchContestPreview
  | ResetContestsPreviewToDefault;
