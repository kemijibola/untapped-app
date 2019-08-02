import { ActionReducerMap } from '@ngrx/store';
import * as fromAllUserContest from './store/all-contest/all-contest.reducers';
import * as fromNewContest from './store/new-contest/new-contest.reducers';

export interface UserContestState {
  all: fromAllUserContest.State;
  newContest: fromNewContest.State;
}

export const userContestReducers: ActionReducerMap<UserContestState> = {
  all: fromAllUserContest.allContestReducer,
  newContest: fromNewContest.newContestReducer
};
