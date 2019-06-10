import * as ProfilePictureActions from './profile-picture.actions';
import { FileModel } from 'src/app/models/shared/file';

export interface State {
    displayProfile: string;
}

const initialState: State = {
    displayProfile: ''
};

export function profilePictureReducer(state= initialState, action: ProfilePictureActions.ProfilePictureActions) {
    switch (action.type) {
        case ProfilePictureActions.UPDATE_PROFILE_IMAGE:
            return {
                ...state,
                displayProfile: action.payload.image
            };
    }

}
