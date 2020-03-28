import { ActionReducerMap } from "@ngrx/store";
import * as fromProfile from "./store/profile/profile.reducers";
import * as fromPortfolio from "./store/portfolio/portfolio.reducers";
import * as fromMediaPreview from "./store/portfolio/media/media-preview.reducers";

export interface UserState {
  profile: fromProfile.State;
  portfolio: fromPortfolio.State;
  mediaPreview: fromMediaPreview.State;
}

export const userReducers: ActionReducerMap<UserState> = {
  profile: fromProfile.profileReducer,
  portfolio: fromPortfolio.portfolioReducer,
  mediaPreview: fromMediaPreview.mediaPreviewReducer
};
