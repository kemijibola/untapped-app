import { IProfile } from "src/app/interfaces";
import * as ProfileActions from "./profile.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./profile.adapter";
import { OutboundState } from "src/app/shared/Util";

export interface ProfileState extends EntityState<IProfile> {
  userProfile: IProfile | null;
  saveProfileState: OutboundState;
}

const initialState: ProfileState = fromAdapter.adapter.getInitialState({
  userProfile: null,
  saveProfileState: OutboundState.initiated,
});

export function profileReducer(
  state = initialState,
  action: ProfileActions.ProfileActions
): ProfileState {
  switch (action.type) {
    case ProfileActions.SET_USERPROFILE:
      return Object.assign({
        ...state,
        userProfile: action.payload,
        saveProfileState: OutboundState.completed,
      });
    case ProfileActions.UPDATE_USER_SETTINGS_PREFERENCE:
      return Object.assign({
        ...state,
        saveProfileState: OutboundState.inprogress,
      });
    case ProfileActions.CREATE_USERPROFILE:
      return Object.assign({
        ...state,
        saveProfileState: OutboundState.inprogress,
      });
    case ProfileActions.UPDATE_USERPROFILE:
      return Object.assign({
        ...state,
        saveProfileState: OutboundState.inprogress,
      });
    case ProfileActions.CREATE_USERPROFILE_ERROR:
      return Object.assign({
        ...state,
        saveProfileState: OutboundState.failed,
      });
    case ProfileActions.UPDATE_USERPROFILE_ERROR:
      return Object.assign({
        ...state,
        saveProfileState: OutboundState.completed,
      });
    case ProfileActions.UPDATE_USER_SETTINGS_PREFERENCE_ERROR:
      return Object.assign({
        ...state,
        saveProfileState: OutboundState.completed,
      });
    default: {
      return state;
    }
  }
}

export const getProfileState = createFeatureSelector<ProfileState>(
  "profileState"
);

const getSaveCompleted = (state: ProfileState): boolean =>
  state.saveProfileState === OutboundState.completed;

const getSaveInProgress = (state: ProfileState): boolean =>
  state.saveProfileState === OutboundState.inprogress;

const getSaveInitiated = (state: ProfileState): boolean =>
  state.saveProfileState === OutboundState.initiated;

const getFailedStatus = (state: ProfileState): boolean =>
  state.saveProfileState === OutboundState.failed;

const getSelectedCurrentUserProfile = (state: ProfileState) =>
  state.userProfile;

export const selectCurrentUserProfile = createSelector(
  getProfileState,
  getSelectedCurrentUserProfile
);

export const selectSaveProfileCompletedStatus = createSelector(
  getProfileState,
  getSaveCompleted
);

export const selectSaveProfileInitiatedStatus = createSelector(
  getProfileState,
  getSaveInitiated
);

export const selectSaveProfileInProgressStatus = createSelector(
  getProfileState,
  getSaveInProgress
);

export const selectSaveProfileFailedStatus = createSelector(
  getProfileState,
  getFailedStatus
);
