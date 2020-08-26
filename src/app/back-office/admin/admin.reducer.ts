import * as fromPendingMedia from "../store/approvals/media/media.reducer";
import { ActionReducerMap } from "@ngrx/store";
import * as fromPendingContest from "../store/approvals/contest/contest.reducer";
import * as fromPendingEntry from "../store/approvals/entry/entry.reducer";

export interface AdminState {
  pendingMedia: fromPendingMedia.PendingMediaState;
  pendingContest: fromPendingContest.PendingContestState;
  pendingEntry: fromPendingEntry.PendingEntryState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
  pendingMedia: fromPendingMedia.pendingMediaReducer,
  pendingContest: fromPendingContest.pendingContestReducer,
  pendingEntry: fromPendingEntry.pendingEntryReducer,
};
