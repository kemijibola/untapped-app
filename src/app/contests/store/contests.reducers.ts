import { IContestList, IContest, IUserContest } from "src/app/interfaces";
import * as ContestsActions from "./contests.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<IContestList> {
  contests: IContestList[];
  contest: IContest;
  errorMessage: string;
}

export const contestsAdapter: EntityAdapter<IContestList> = createEntityAdapter<
  IContestList
>();

const initialState: State = contestsAdapter.getInitialState({
  contests: [],
  contest: null,
  errorMessage: ""
});

export function contestsReducer(
  state = initialState,
  action: ContestsActions.ContestsAction
): State {
  switch (action.type) {
    case ContestsActions.SET_CONTESTS:
      return contestsAdapter.setAll(action.payload.contestList, state);
    case ContestsActions.SET_CONTEST:
      return {
        ...state,
        contest: Object.assign(state.contest, action.payload)
      };
    case ContestsActions.FAILURE_ENTER_CONTEST:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
