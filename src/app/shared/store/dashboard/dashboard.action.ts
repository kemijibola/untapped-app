import { Action } from "@ngrx/store";
import { ContestWithEntriesPreview } from "src/app/interfaces/shared/dashboard";

export const FETCH_DASHBOARD_CONTESTS = "FETCH_DASHBOARD_CONTESTS";
export const FETCH_DASHBOARD_CONTESTS_SUCCESS =
  "FETCH_DASHBOARD_CONTESTS_SUCCESS";
export const FETCH_DASHBOARD_CONTEST = "FETCH_DASHBOARD_CONTEST";

export class FetchDashboardContests implements Action {
  readonly type = FETCH_DASHBOARD_CONTESTS;
}

export class FetchDashboardContestsSuccess implements Action {
  readonly type = FETCH_DASHBOARD_CONTESTS_SUCCESS;
  constructor(
    public payload: { runningContests: ContestWithEntriesPreview[] }
  ) {}
}

export class FetchDashboardContest implements Action {
  readonly type = FETCH_DASHBOARD_CONTEST;
  constructor(public payload: { contestId: string }) {}
}

export type DashboardActions =
  | FetchDashboardContests
  | FetchDashboardContestsSuccess
  | FetchDashboardContest;
