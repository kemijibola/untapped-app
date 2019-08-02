import { IContestList, IContest, IUserContest } from 'src/app/interfaces';
import * as ContestsActions from './contests.action';

export interface State {
  contests: IContestList[];
  contest: IContest;
}
const initialState: State = {
  contests: [],
  contest: null
};

export function contestsReducer(
  state = initialState,
  action: ContestsActions.ContestsAction
) {
  switch (action.type) {
    case ContestsActions.SET_CONTESTS:
      return {
        ...state,
        contests: [...state.contests, ...action.payload]
      };
    case ContestsActions.SET_CONTEST:
      return {
        ...state,
        contest: Object.assign(state.contest, action.payload)
      };
    default:
      return state;
  }
}
