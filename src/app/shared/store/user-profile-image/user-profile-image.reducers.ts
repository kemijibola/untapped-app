import { IUserImage } from "src/app/interfaces";
import * as UserProfileImageActions from "./user-profile-image.actions";

export interface State {
  userImage: IUserImage;
  readyToUploadImage: boolean;
  updateSuccessful: boolean;
}

const initialState: State = {
  userImage: {
    imagePath: "",
    isDefault: true
  },
  readyToUploadImage: false,
  updateSuccessful: false
};

export function UserProfileImageReducers(
  state = initialState,
  action: UserProfileImageActions.UserProfileImageActions
) {
  switch (action.type) {
    case UserProfileImageActions.SET_PROFILEIMAGE_PATH:
      return {
        ...state,
        userImage: { ...action.payload }
      };
    case UserProfileImageActions.RESET_PROFILEIMAGE_PATH:
      return {
        ...state,
        userImage: action.payload.userImage
      };
    case UserProfileImageActions.UPDATE_USER_PROFILEIMAGE_SUCCESS:
      return {
        ...state,
        updateSuccessful: true
      };
    default:
      return state;
  }
}
