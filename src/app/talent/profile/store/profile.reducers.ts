import { IProfile } from 'src/app/models';
import * as ProfileTypeActions from './profile.actions';


export interface State {
    profile: IProfile;
    profileImage: string;
}
const initialState: State = {
    profile: null,
    profileImage: 'assets/img/profile/profile-2.png'
};

export function profileReducer(state= initialState, action: ProfileTypeActions.ProfileTypeActions) {
    switch (action.type) {
        case ProfileTypeActions.SET_PROFILE:
            return {
                ...state,
                profile: Object.assign(state.profile, action.payload),
                profileImage: Object.assign(state.profileImage, action.payload.profile['profile_picture'])
            };
    }

}
