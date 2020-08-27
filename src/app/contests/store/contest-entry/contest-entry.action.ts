import { Action } from "@ngrx/store";
import { IContestEntry, IUserContestListAnalysis } from "src/app/interfaces";

export const ENTER_CONTEST = "ENTER_CONTEST";
export const ENTER_CONTEST_SUCCESS = "ENTER_CONTEST_SUCCESS";
export const SET_CONTEST_ENTRY = "SET_CONTEST_ENTRY";
export const ENTER_CONTEST_FAILED = "ENTER_CONTEST_FAILED";
export const FETCH_CONTEST_ENTRIES = "FETCH_CONTEST_ENTRIES";
export const FETCH_CONTEST_ENTRIES_SUCCESS = "FETCH_CONTEST_ENTRIES_SUCCESS";
export const FETCH_CONTEST_ENTRY = "FETCH_CONTEST_ENTRY";
export const FETCH_USER_PARTICIPATED_CONTEST =
  "FETCH_USER_PARTICIPATED_CONTEST";
export const FETCH_USER_PARTICIPATED_CONTEST_SUCCESS =
  "FETCH_USER_PARTICIPATED_CONTEST_SUCCESS";
export const FETCH_USER_PARTICIPATED_CONTEST_ERROR =
  "FETCH_USER_PARTICIPATED_CONTEST_ERROR";
export const SET_USER_PARTICIPATED_CONTEST = "SET_USER_PARTICIPATED_CONTEST";

export class EnterContest implements Action {
  readonly type = ENTER_CONTEST;
  constructor(public payload: { newContestEntry: IContestEntry }) {}
}

export class SetContestEntry implements Action {
  readonly type = SET_CONTEST_ENTRY;
  constructor(public payload: { contestEntry: IContestEntry }) {}
}
export class EnterContestSuccess implements Action {
  readonly type = ENTER_CONTEST_SUCCESS;
}

export class EnterContestFailed implements Action {
  readonly type = ENTER_CONTEST_FAILED;
}
export class FetchContestEntries implements Action {
  readonly type = FETCH_CONTEST_ENTRIES;
}

export class FetchContestEntry implements Action {
  readonly type = FETCH_CONTEST_ENTRY;
  constructor(public payload: { contestEntryId: string }) {}
}

export class FetchContestEntriesSuccess implements Action {
  readonly type = FETCH_CONTEST_ENTRIES_SUCCESS;
  constructor(public payload: { entries: IContestEntry[] }) {}
}

export class FetchUserParticipatedContest implements Action {
  readonly type = FETCH_USER_PARTICIPATED_CONTEST;
}

export class SetUserParticipatedContest implements Action {
  readonly type = SET_USER_PARTICIPATED_CONTEST;
  constructor(
    public payload: { participatedInContests: IUserContestListAnalysis[] }
  ) {}
}

export class FetchUserParticipatedContestSuccess implements Action {
  readonly type = FETCH_USER_PARTICIPATED_CONTEST_SUCCESS;
}

export class FetchUserParticipatedContestError implements Action {
  readonly type = FETCH_USER_PARTICIPATED_CONTEST_ERROR;
}

export type ContestEntryActions =
  | EnterContest
  | FetchContestEntries
  | FetchContestEntry
  | EnterContestSuccess
  | FetchContestEntriesSuccess
  | FetchUserParticipatedContest
  | FetchUserParticipatedContestSuccess
  | SetUserParticipatedContest
  | FetchUserParticipatedContestError
  | SetContestEntry
  | EnterContestFailed;
