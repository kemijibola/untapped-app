import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import * as fromProfile from "./store/profile/profile.reducers";
import * as fromPortfolio from "./store/portfolio/portfolio.reducers";
import * as fromMediaPreview from "./store/portfolio/media/media-preview.reducers";
import { environment } from "src/environments/environment";

export interface UserState {
  profileState: fromProfile.ProfileState;
  portfolio: fromPortfolio.PortfolioState;
  mediaPreviewState: fromMediaPreview.MediaPreviewState;
}

export const userReducers: ActionReducerMap<UserState> = {
  profileState: fromProfile.profileReducer,
  portfolio: fromPortfolio.portfolioReducer,
  mediaPreviewState: fromMediaPreview.mediaPreviewReducer,
};
