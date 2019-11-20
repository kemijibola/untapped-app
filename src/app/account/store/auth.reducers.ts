import * as AuthActions from './auth.actions';
import { IAuthData } from '../../interfaces';

export interface State {
  errorMessage: string;
  userData: IAuthData;
  errorConfirmationMsg: string;
}
const initialState: State = {
  userData: {
    access_token: '',
    permissions: [],
    user_data: {
      _id: '',
      full_name: '',
      email: '',
      profile_is_completed: false,
      userType: {
        _id: '',
        name: ''
      }
    },
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
          access_token: '',
          permissions: [],
          user_data: {
            _id: '',
            full_name: '',
            email: '',
            profile_is_completed: false,
            userType: {
              _id: '',
              name: ''
            }
          },
          authenticated: false
        },
        errorMessage: ''
      };
    case AuthActions.SIGNIN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        userData: {
          access_token: '',
          permissions: [],
          user_data: {
            _id: '',
            full_name: '',
            email: '',
            profile_is_completed: false,
            userType: {
              _id: '',
              name: ''
            }
          },
          authenticated: false
        }
      };
    case AuthActions.SET_AUTHDATA:
      return {
        ...state,
        userData: { ...action.payload }
      };
    case AuthActions.DELETE_AUTHDATA:
      return {
        ...state,
        userData: {
          access_token: '',
          permissions: [],
          user_data: {
            _id: '',
            full_name: '',
            email: '',
            profile_is_completed: false,
            userType: {
              _id: '',
              name: ''
            }
          },
          authenticated: false
        }
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        userData: {
          access_token: '',
          permissions: [],
          user_data: {
            _id: '',
            full_name: '',
            email: '',
            profile_is_completed: false,
            userType: {
              _id: '',
              name: ''
            }
          },
          authenticated: false
        }
      };
    case AuthActions.SIGNUP_FAILURE:
      return {
        ...state,
        userData: {
          access_token: '',
          permissions: [],
          user_data: {
            _id: '',
            full_name: '',
            email: '',
            profile_is_completed: false,
            userType: {
              _id: '',
              name: ''
            }
          },
          authenticated: false
        },
        errorMessage: action.payload.error
      };
    case AuthActions.RESET_FAILURE_MESSAGE:
      return {
        ...state,
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
