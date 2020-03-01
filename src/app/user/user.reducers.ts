import { ActionReducerMap } from "@ngrx/store";
import * as fromProfile from "./store/profile/profile.reducers";
import * as fromPortfolio from "./store/portfolio/portfolio.reducers";

export interface UserState {
  profile: fromProfile.State;
  portfolio: fromPortfolio.State;
}

export const userReducers: ActionReducerMap<UserState> = {
  profile: fromProfile.profileReducer,
  portfolio: fromPortfolio.portfolioReducer
};
