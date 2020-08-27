import { Action } from "@ngrx/store";
import { IContestEntryDetails } from "src/app/interfaces";

export const FETCH_PENDING_ENTRIES = "FETCH_PENDING_ENTRIES";
export const FETCH_PENDING_ENTRIES_SUCCESS = "FETCH_PENDING_ENTRIES_SUCCESS";
export const FETCH_PENDING_ENTRIES_FAILED = "FETCH_PENDING_ENTRIES_FAILED";

export const APPROVE_ENTRY = "APPROVE_ENTRY";
export const APPROVE_ENTRY_SUCCESS = "APPROVE_ENTRY_SUCCESS";
export const APPROVE_ENTRY_FAILED = "APPROVE_ENTRY_FAILED";

export const REJECT_ENTRY = "REJECT_ENTRY";
export const REJECT_ENTRY_SUCCESS = "REJECT_ENTRY_SUCCESS";
export const REJECT_ENTRY_FAILED = "REJECT_ENTRY_FAILED";

export class FetchPendingEntries implements Action {
  readonly type = FETCH_PENDING_ENTRIES;
}

export class FetchPendingEntriesSuccess implements Action {
  readonly type = FETCH_PENDING_ENTRIES_SUCCESS;
  constructor(public payload: { pendingEntries: IContestEntryDetails[] }) {}
}

export class FetchPendingEntriesFailed implements Action {
  readonly type = FETCH_PENDING_ENTRIES_FAILED;
}

export class ApproveEntry implements Action {
  readonly type = APPROVE_ENTRY;
  constructor(public payload: { entryId: string }) {}
}

export class ApproveEntrySuccess implements Action {
  readonly type = APPROVE_ENTRY_SUCCESS;
}

export class ApproveEntryFailed implements Action {
  readonly type = APPROVE_ENTRY_FAILED;
}

export class RejectEntry implements Action {
  readonly type = REJECT_ENTRY;
  constructor(public payload: { entryId: string; reason: string }) {}
}

export class RejectEntrySuccess implements Action {
  readonly type = REJECT_ENTRY_SUCCESS;
}

export class RejectEntryFailed implements Action {
  readonly type = REJECT_ENTRY_FAILED;
}

export type PendingEntryAction =
  | FetchPendingEntries
  | FetchPendingEntriesSuccess
  | FetchPendingEntriesFailed
  | ApproveEntry
  | ApproveEntrySuccess
  | ApproveEntryFailed
  | RejectEntry
  | RejectEntrySuccess
  | RejectEntryFailed;
