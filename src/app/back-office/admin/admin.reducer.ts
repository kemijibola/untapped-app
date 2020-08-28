import * as fromPendingMedia from "../store/approvals/media/media.reducer";
import { ActionReducerMap } from "@ngrx/store";
import * as fromPendingContest from "../store/approvals/contest/contest.reducer";
import * as fromPendingEntry from "../store/approvals/entry/entry.reducer";
import * as fromPendingUser from "../store/approvals/profile/profile.reducer";

export interface AdminState {
  pendingMedia: fromPendingMedia.PendingMediaState;
  pendingContest: fromPendingContest.PendingContestState;
  pendingEntry: fromPendingEntry.PendingEntryState;
  pendingUser: fromPendingUser.PendingUserState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
  pendingMedia: fromPendingMedia.pendingMediaReducer,
  pendingContest: fromPendingContest.pendingContestReducer,
  pendingEntry: fromPendingEntry.pendingEntryReducer,
  pendingUser: fromPendingUser.pendingUserReducer,
};
