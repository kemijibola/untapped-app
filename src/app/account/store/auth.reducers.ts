import * as AuthActions from "./auth.actions";
import { IAuthData } from "../../interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { AppError } from "src/app/store/global/error/error.reducers";

export interface State extends EntityState<IAuthData> {
  errorMessage: AppError;
  userData: IAuthData;
  errorConfirmationMsg: string;
}

export const authAdapter: EntityAdapter<IAuthData> = createEntityAdapter<
  IAuthData
>();

const initialState: State = authAdapter.getInitialState({
  userData: {
    access_token: "",
    permissions: [],
    user_data: {
      _id: "",
      full_name: "",
      email: "",
      profile_is_completed: false,
      profile_image_path: "",
      userType: {
        _id: "",
        name: ""
      }
    },
    authenticated: false
  },
  errorMessage: {
    errorCode: 0,
    errorMessage: ""
  },
  errorConfirmationMsg: ""
});

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
): State {
  switch (action.type) {
    case AuthActions.SIGNUP_SUCCESS:
      return authAdapter.setOne(
        {
          access_token: "",
          permissions: [],
          user_data: {
            _id: "",
            full_name: "",
            email: "",
            profile_is_completed: false,
            profile_image_path: "",
            userType: {
              _id: "",
              name: ""
            }
          },
          authenticated: false
        },
        state
      );
    case AuthActions.SIGNIN_FAILURE:
      console.log("line 66", action.payload);
      return authAdapter.setOne(
        {
          access_token: "",
          permissions: [],
          user_data: {
            _id: "",
            full_name: "",
            email: "",
            profile_is_completed: false,
            profile_image_path: "",
            userType: {
              _id: "",
              name: ""
            }
          },
          authenticated: false
        },
        {
          ...state,
          errorMessage: action.payload
        }
      );
    case AuthActions.SET_AUTHDATA:
      console.log(action.payload);
      // action.payload.authData.authenticated = true;
      return authAdapter.setOne(action.payload.authData, state);
    case AuthActions.DELETE_AUTHDATA:
      return authAdapter.upsertOne(
        {
          access_token: "",
          permissions: [],
          user_data: {
            _id: "",
            full_name: "",
            email: "",
            profile_is_completed: false,
            profile_image_path: "",
            userType: {
              _id: "",
              name: ""
            }
          },
          authenticated: false
        },
        state
      );
    case AuthActions.LOGOUT:
      return authAdapter.upsertOne(
        {
          access_token: "",
          permissions: [],
          user_data: {
            _id: "",
            full_name: "",
            email: "",
            profile_is_completed: false,
            profile_image_path: "",
            userType: {
              _id: "",
              name: ""
            }
          },
          authenticated: false
        },
        state
      );
    case AuthActions.SIGNUP_FAILURE:
      return authAdapter.setOne(
        {
          access_token: "",
          permissions: [],
          user_data: {
            _id: "",
            full_name: "",
            email: "",
            profile_is_completed: false,
            profile_image_path: "",
            userType: {
              _id: "",
              name: ""
            }
          },
          authenticated: false
        },
        {
          ...state,
          errorMessage: action.payload.error
        }
      );
    case AuthActions.RESET_FAILURE_MESSAGE:
      return {
        ...state,
        errorMessage: {
          errorMessage: "",
          errorCode: 0
        }
      };
    case AuthActions.FAILURE_EMAIL_CONFIRMATION:
      return authAdapter.setOne(
        {
          access_token: "",
          permissions: [],
          user_data: {
            _id: "",
            full_name: "",
            email: "",
            profile_is_completed: false,
            profile_image_path: "",
            userType: {
              _id: "",
              name: ""
            }
          },
          authenticated: false
        },
        {
          ...state,
          errorConfirmationMsg: action.payload.error
        }
      );
    default:
      return state;
  }
}
