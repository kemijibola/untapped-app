import * as AuthActions from './auth.actions';
import { IAuthData } from '../../interfaces';

export interface State {
  authenticated: boolean;
  errorMessage: string;
  userData: IAuthData;
}
const initialState: State = {
  authenticated: false,
  userData: null,
  errorMessage: ''
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
        userData: null,
        errorMessage: ''
      };
    case AuthActions.SIGNIN_SUCCESS:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        userData: action.payload
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        userData: null,
        authenticated: false
      };
    case AuthActions.SIGNUP_FAILURE:
      return {
        ...state,
        userData: null,
        authenticated: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
