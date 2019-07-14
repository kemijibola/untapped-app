import { ActionReducerMap } from '@ngrx/store';
import * as fromProfile from '../talent/profile/store/profile.reducers';
import * as fromProfilePicture from '../talent/profile/profile-picture/store/profile-picture.reducers';

export interface UserAccountFeatureState {
    profile: fromProfile.State;
    profilePicture: fromProfilePicture.State;
}

export const userAccountFeatureReducers: ActionReducerMap<UserAccountFeatureState> = {
    profile: fromProfile.profileReducer,
    profilePicture: fromProfilePicture.profilePictureReducer
};
