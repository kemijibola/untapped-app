import { IProfile } from "src/app/interfaces";
import * as ProfileActions from "./profile.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./profile.adapter";

export interface ProfileState extends EntityState<IProfile> {
  userProfile: IProfile | null;
}

const initialState: ProfileState = fromAdapter.adapter.getInitialState({
  userProfile: null,
});

export function profileReducer(
  state = initialState,
  action: ProfileActions.ProfileActions
): ProfileState {
  switch (action.type) {
    case ProfileActions.SET_USERPROFILE:
      return Object.assign({
        ...state,
        userProfile: { ...action.payload },
      });
    default: {
      return state;
    }
  }
}

export const getProfileState = createFeatureSelector<ProfileState>(
  "profileState"
);

const getSelectedCurrentUserProfile = (state: ProfileState) =>
  state.userProfile;

// const getCreateProfileErr = (state: ProfileState) => state.createError;

export const selectCurrentUserProfile = createSelector(
  getProfileState,
  getSelectedCurrentUserProfile
);
