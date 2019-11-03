import * as AuthActions from './auth.actions';
import { IAuthData } from '../../interfaces';

export interface State {
  errorMessage: string;
  userData: IAuthData;
  errorConfirmationMsg: string;
}
const initialState: State = {
  userData: {
    _id: '',
    token: '',
    email: '',
    fullName: '',
    roles: [],
    authenticated: false
  },
  errorMessage: '',
  errorConfirmationMsg: ''
};
export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGNUP_SUCCESS:
      return {
        ...state,
        userData: {
          _id: '',
          token: '',
          email: '',
          fullName: '',
          roles: [],
          authenticated: false
        },
        errorMessage: ''
      };
    case AuthActions.SIGNIN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        userData: {
          _id: '',
          token: '',
          email: '',
          fullName: '',
          roles: [],
          authenticated: false
        }
      };
    case AuthActions.SET_AUTHDATA:
      return {
        ...state,
        userData: action.payload
      };
    case AuthActions.DELETE_AUTHDATA:
      return {
        ...state,
        userData: {
          _id: '',
          token: '',
          email: '',
          fullName: '',
          roles: [],
          authenticated: false
        }
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        userData: {
          _id: '',
          token: '',
          email: '',
          fullName: '',
          roles: [],
          authenticated: false
        }
      };
    case AuthActions.SIGNUP_FAILURE:
      console.log('error from reducer', action.payload.error);
      return {
        ...state,
        userData: {
          _id: '',
          token: '',
          email: '',
          fullName: '',
          roles: [],
          authenticated: false
        },
        errorMessage: action.payload.error
      };
    case AuthActions.RESET_FAILURE_MESSAGE:
      return {
        ...state,
        userData: {
          _id: '',
          token: '',
          email: '',
          fullName: '',
          roles: [],
          authenticated: false
        },
        errorMessage: ''
      };
    case AuthActions.FAILURE_EMAIL_CONFIRMATION:
      return {
        ...state,
        errorConfirmationMsg: action.payload
      };
    default:
      return state;
  }
}
