import { IUserContest } from 'src/app/interfaces';
import * as AllContestActions from './all-contest.actions';

export interface State {
  userContests: IUserContest[];
}
const initialState: State = {
  userContests: []
};

export function allContestReducer(
  state = initialState,
  action: AllContestActions.AllContestActions
) {
  switch (action.type) {
    case AllContestActions.SET_USER_CONTESTS:
      return {
        ...state,
        userContests: [...state.userContests, ...action.payload]
      };
    default:
      return state;
  }
}
