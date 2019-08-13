import * as AuthActions from './auth.actions';
import { IAuthData } from '../../interfaces';

export interface State {
  errorMessage: string;
  userData: IAuthData;
}
const initialState: State = {
  userData: {
    _id: '',
    token: '',
    roles: [],
    authenticated: false
  },
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
        userData: {
          _id: '',
          token: '',
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
          roles: [],
          authenticated: false
        }
      };
    case AuthActions.SIGNUP_FAILURE:
      return {
        ...state,
        userData: {
          _id: '',
          token: '',
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
          roles: [],
          authenticated: false
        },
        errorMessage: ''
      };
    default:
      return state;
  }
}
