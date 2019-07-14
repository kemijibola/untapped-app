import * as AuthActions from './auth.actions';
import { IAuthData } from '../../interfaces';

export interface State {
  authenticated: boolean;
  userData: IAuthData;
}
const initialState: State = {
  authenticated: false,
  userData: null
};
export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGNUP_SUCCESS:
      return {
        ...state,
        authenticated: false,
        userData: null
      };
    case AuthActions.SIGNIN_SUCCESS:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        userData: action.payload.authData
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        userData: null,
        authenticated: false
      };
    default:
      return state;
  }
}
