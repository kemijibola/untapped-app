import * as ProfilePictureActions from './profile-picture.actions';
import { IFileModel } from 'src/app/interfaces';

export interface State {
  displayProfile: string;
}

const initialState: State = {
  displayProfile: ''
};

export function profilePictureReducer(
  state = initialState,
  action: ProfilePictureActions.ProfilePictureActions
) {
  switch (action.type) {
    case ProfilePictureActions.UPDATE_PROFILE_IMAGE:
      return {
        ...state,
        displayProfile: action.payload.image
      };
  }
}
