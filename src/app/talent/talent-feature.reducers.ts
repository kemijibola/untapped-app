import { ActionReducerMap } from '@ngrx/store';
import * as fromProfile from '../talent/profile/store/profile.reducers';
import * as fromProfilePicture from '../talent/profile/profile-picture/store/profile-picture.reducers';

export interface TalentState {
    profile: fromProfile.State;
    profilePicture: fromProfilePicture.State;
}

export const talentReducers: ActionReducerMap<TalentState> = {
    profile: fromProfile.profileReducer,
    profilePicture: fromProfilePicture.profilePictureReducer
};

