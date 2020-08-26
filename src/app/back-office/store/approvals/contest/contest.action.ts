import { Action } from "@ngrx/store";
import { IContest } from "src/app/interfaces";

export const FETCH_PENDING_CONTESTS = "FETCH_PENDING_CONTESTS";
export const FETCH_PENDING_CONTESTS_SUCCESS = "FETCH_PENDING_CONTESTS_SUCCESS";
export const FETCH_PENDING_CONTESTS_FAILED = "FETCH_PENDING_CONTESTS";

export const APPROVE_CONTEST = "APPROVE_CONTEST";
export const APPROVE_CONTEST_SUCCESS = "APPROVE_CONTEST_SUCCESS";
export const APPROVE_CONTEST_FAILED = "APPROVE_CONTEST_FAILED";

export const REJECT_CONTEST = "REJECT_CONTEST";
export const REJECT_CONTEST_SUCCESS = "REJECT_CONTEST_SUCCESS";
export const REJECT_CONTEST_FAILED = "REJECT_CONTEST_FAILED";

export class FetchPendingContests implements Action {
  readonly type = FETCH_PENDING_CONTESTS;
}

export class FetchPendingContestsSuccess implements Action {
  readonly type = FETCH_PENDING_CONTESTS_SUCCESS;
  constructor(public payload: { pendingContests: IContest[] }) {}
}

export class FetchPendingContestsFailed implements Action {
  readonly type = FETCH_PENDING_CONTESTS_FAILED;
}

export class ApproveContest implements Action {
  readonly type = APPROVE_CONTEST;
  constructor(public payload: { contestId: string }) {}
}

export class ApproveContestSuccess implements Action {
  readonly type = APPROVE_CONTEST_SUCCESS;
}

export class ApproveContestFailed implements Action {
  readonly type = APPROVE_CONTEST_FAILED;
}

export class RejectContest implements Action {
  readonly type = REJECT_CONTEST;
  constructor(public payload: { contestId: string }) {}
}

export class RejectContestSuccess implements Action {
  readonly type = REJECT_CONTEST_SUCCESS;
}

export class RejectContestFailed implements Action {
  readonly type = REJECT_CONTEST_FAILED;
}

export type PendingContestAction =
  | FetchPendingContests
  | FetchPendingContestsSuccess
  | FetchPendingContestsFailed
  | ApproveContest
  | ApproveContestSuccess
  | ApproveContestFailed
  | RejectContest
  | RejectContestSuccess
  | RejectContestFailed;
