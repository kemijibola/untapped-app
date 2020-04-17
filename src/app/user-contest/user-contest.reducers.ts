import { ActionReducerMap } from "@ngrx/store";
import * as fromAllUserContest from "./store/all-contest/all-contest.reducers";
import * as fromNewUserContest from "./store/new-contest/new-contest.reducers";

export interface UserContestState {
  all: fromAllUserContest.AllContestState;
  new: fromNewUserContest.NewContestState;
}

export const userContestReducers: ActionReducerMap<UserContestState> = {
  all: fromAllUserContest.allContestReducer,
  new: fromNewUserContest.newContestReducer,
};
