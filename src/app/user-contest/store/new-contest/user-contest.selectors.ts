import { createSelector } from '@ngrx/store';
import * as fromNewContest from './new-contest.reducers';
import * as fromUserContest from '../../user-contest.reducers';

const contestBannerImage = (state: fromUserContest.UserContestState) =>
  state.newContest;

export const selectContestBannerImage = createSelector(
  contestBannerImage,
  (state: fromNewContest.State) => state.bannerImage
);
