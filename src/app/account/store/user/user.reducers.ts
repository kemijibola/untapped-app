import { IUser } from 'src/app/interfaces';
import * as UserActions from './user.actions';

export interface State {
  user: IUser;
}
const initialState: State = {
  user: {}
};

export function userReducers(
  state = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.SET_USER:
      return {
        ...state,
        user: Object.assign(state.user, action.payload.user)
      };
    default:
      return state;
  }
}
