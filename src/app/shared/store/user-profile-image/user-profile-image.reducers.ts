import { IUserImage } from 'src/app/interfaces';
import * as UserProfileImageActions from './user-profile-image.actions';

export interface State {
  userImage: IUserImage;
  readyToUploadImage: boolean;
}

const initialState: State = {
  userImage: null,
  readyToUploadImage: false
};

export function UserProfileImageReducers(
  state = initialState,
  action: UserProfileImageActions.UserProfileImageActions
) {
  switch (action.type) {
    case UserProfileImageActions.SET_PROFILEIMAGE_PATH:
      return {
        ...state,
        userImage: action.payload
      };
    case UserProfileImageActions.SET_UPLOADBUTTON:
      return {
        ...state,
        readyToUploadImage: action.payload
      };
    case UserProfileImageActions.RESET_PROFILEIMAGE_PATH:
      return {
        ...state,
        userImage: action.payload
      };
    case UserProfileImageActions.RESET_UPLOADBUTTON:
      return {
        ...state,
        readyToUploadImage: false
      };
    default:
      return state;
  }
}
