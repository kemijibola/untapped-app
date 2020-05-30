import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import * as fromProfile from "./store/profile/profile.reducers";
import * as fromPortfolio from "./store/portfolio/portfolio.reducers";
import * as fromMediaPreview from "./store/portfolio/media/media-preview.reducers";
import * as fromUserLocation from "../shared/store/user-location/user-location.reducer";

export interface UserState {
  profileState: fromProfile.ProfileState;
  portfolio: fromPortfolio.PortfolioState;
  mediaPreviewState: fromMediaPreview.MediaPreviewState;
  userLocationState: fromUserLocation.UserLocationState;
}

export const userReducers: ActionReducerMap<UserState> = {
  profileState: fromProfile.profileReducer,
  portfolio: fromPortfolio.portfolioReducer,
  mediaPreviewState: fromMediaPreview.mediaPreviewReducer,
  userLocationState: fromUserLocation.userLocationReducer,
};
