import * as AuthActions from "./auth.actions";
import { IAuthData } from "../../interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { AppError } from "src/app/store/global/error/error.reducers";
import * as fromAdapter from "./auth.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export interface AuthState extends EntityState<IAuthData> {
  authError: AppError | null;
  userData: IAuthData | null;
}

const initialState: AuthState = fromAdapter.adapter.getInitialState({
  authError: null,
  userData: {
    access_token: "",
    rolePermissions: [],
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
    token_expires: "",
    authenticated: false
  }
});

export function reducer(
  state = initialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActions.SET_AUTHDATA:
      return Object.assign({
        ...state,
        userData: {
          access_token: action.payload.access_token,
          rolePermissions: [...action.payload.rolePermissions],
          user_data: { ...action.payload.user_data },
          token_expires: action.payload.token_expires,
          authenticated: true
        }
      });
    case AuthActions.SIGNIN_FAILURE:
      return Object.assign({
        ...state,
        authError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage
        })
      });
    case AuthActions.DELETE_AUTHDATA:
      return Object.assign({
        ...state,
        userData: Object.assign({})
      });

    default: {
      return state;
    }
  }
}
export const getSelectedUserAuth = (state: AuthState) => state.userData;

export const getAuthState = createFeatureSelector<AuthState>("authState");

export const getAuthError = (state: AuthState) => state.authError;

export const selectCurrentUserData = createSelector(
  getAuthState,
  getSelectedUserAuth
);

export const selectAuthError = createSelector(getAuthState, getAuthError);
