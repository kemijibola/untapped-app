import { IProfile } from "src/app/interfaces";
import * as ProfileActions from "./profile.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<IProfile> {
  profile: IProfile;
}

export const profileAdapter: EntityAdapter<IProfile> = createEntityAdapter<
  IProfile
>();

const initialState: State = profileAdapter.getInitialState({
  profile: null
});

export function profileReducer(
  state = initialState,
  action: ProfileActions.ProfileActions
): State {
  switch (action.type) {
    case ProfileActions.SET_USERPROFILE:
      return profileAdapter.setOne(action.payload, state);
    default:
      return state;
  }
}
