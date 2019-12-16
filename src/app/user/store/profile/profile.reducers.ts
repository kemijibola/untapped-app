import { IProfile } from "src/app/interfaces";
import * as ProfileActions from "./profile.actions";

export interface State {
  profile: IProfile;
}
const initialState: State = {
  profile: null
};

export function profileReducer(
  state = initialState,
  action: ProfileActions.ProfileActions
) {
  switch (action.type) {
    case ProfileActions.SET_USERPROFILE:
      return {
        ...state,
        profile: { ...action.payload }
      };
    default:
      return state;
  }
}
