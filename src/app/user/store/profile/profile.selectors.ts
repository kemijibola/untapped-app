import { createSelector } from "@ngrx/store";
import * as fromUser from "../../user.reducers";
import * as fromProfile from "./profile.reducers";

const userProfile = (state: fromUser.UserState) => state.profile;

export const selectUserProfile = createSelector(
  userProfile,
  (state: fromProfile.State) => state.profile
);
