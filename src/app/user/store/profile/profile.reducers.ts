import { AppError } from "src/app/store/global/error/error.reducers";
import { IProfile } from "src/app/interfaces";
import * as ProfileActions from "./profile.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./profile.adapter";

export interface ProfileState extends EntityState<IProfile> {
  userProfile: IProfile | null;
  profileError: AppError | null;
  createError: AppError | null;
}

const initialState: ProfileState = fromAdapter.adapter.getInitialState({
  userProfile: null,
  profileError: null,
  createError: null,
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
    case ProfileActions.FETCH_USERPROFILE_ERROR:
      return Object.assign({
        ...state,
        profileError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    case ProfileActions.UPDATE_USERPROFILE_ERROR:
      return Object.assign({
        ...state,
        profileError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    case ProfileActions.CREATE_USERPROFILE_ERROR:
      console.log("got here");
      return Object.assign({
        ...state,
        profileError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    default:
      return state;
  }
}

export const getProfileState = createFeatureSelector<ProfileState>(
  "profileState"
);

const getSelectedCurrentUserProfile = (state: ProfileState) =>
  state.userProfile;

const getProfileError = (state: ProfileState) => state.profileError;

// const getCreateProfileErr = (state: ProfileState) => state.createError;

export const selectCurrentUserProfile = createSelector(
  getProfileState,
  getSelectedCurrentUserProfile
);

export const selectFetchProfileError = createSelector(
  getProfileState,
  getProfileError
);

// export const selectCreateProfileError = createSelector(
//   getProfileState,
//   getCreateProfileErr
// );
