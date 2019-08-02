import { IContestList, IContest, IUserContest } from 'src/app/interfaces';
import * as NewContestActions from './new-contest.actions';

export interface State {
  contest: IContest;
  bannerImage: string;
  contestErrMessage: string;
}
const initialState: State = {
  contest: null,
  bannerImage: '',
  contestErrMessage: ''
};

export function newContestReducer(
  state = initialState,
  action: NewContestActions.NewContestActions
) {
  switch (action.type) {
    case NewContestActions.SET_NEW_CONTEST:
      return {
        ...state,
        contest: Object.assign(state.contest, action.payload)
      };
    case NewContestActions.SET_CONTEST_FAILURE:
      return {
        ...state,
        contestErrMessage: action.payload
      };
    case NewContestActions.SET_CONTEST_BANNER:
      return {
        ...state,
        bannerImage: action.payload
      };
    default:
      return state;
  }
}
