import { IContestList, IContest, IUserContest } from 'src/app/interfaces';
import * as ContestsActions from './contests.action';

export interface State {
  contests: IContestList[];
  userContests: IUserContest[];
  userContest: IContest;
  contest: IContest;
  bannerImage: string;
  contestErrMessage: string;
  contestIssueErrMessage: string;
}
const initialState: State = {
  contests: [],
  userContests: [],
  userContest: null,
  contest: null,
  bannerImage: '',
  contestErrMessage: '',
  contestIssueErrMessage: ''
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
    case ContestsActions.SET_USER_CONTESTS:
      return {
        ...state,
        userContests: [...state.userContests, action.payload]
      };
    case ContestsActions.SET_USER_CONTEST:
      return {
        ...state,
        userContest: Object.assign(state.userContest, action.payload)
      };
    case ContestsActions.SET_CONTEST_BANNER:
      return {
        ...state,
        bannerImage: action.payload
      };
    case ContestsActions.CREATE_CONTEST_FAILURE:
      return {
        ...state,
        contestErrMessage: action.payload
      };
    case ContestsActions.CREATE_CONTEST_ISSUE_FAILURE:
      return {
        ...state,
        contestIssueErrMessage: action.payload
      };
    default:
      return state;
  }
}
