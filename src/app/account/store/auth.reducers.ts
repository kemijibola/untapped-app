import * as AuthActions from "./auth.actions";
import { IAuthData } from "../../interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./auth.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export interface AuthState extends EntityState<IAuthData> {
  userData: IAuthData | null;
  confirmationResponse: string | null;
}

const initialState: AuthState = fromAdapter.adapter.getInitialState({
  confirmationResponse: null,
  userData: {
    access_token: "",
    rolePermissions: [],
    user_data: {
      _id: "",
      full_name: "",
      email: "",
      profile_is_completed: false,
      email_notification: false,
      profile_visibility: false,
      tap_notification: false,
      profile_image_path: "",
      banner_image_path: "",
      userType: {
        _id: "",
        name: "",
      },
    },
    token_expires: "",
    authenticated: false,
  },
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
          authenticated: true,
        },
      });
    case AuthActions.DELETE_AUTHDATA:
      return Object.assign({
        ...state,
        userData: Object.assign({}),
      });

    case AuthActions.SUCCESS_EMAIL_CONFIRMATION:
      return Object.assign({
        ...state,
        confirmationResponse: action.payload.response,
      });
    default: {
      return state;
    }
  }
}
export const getSelectedUserAuth = (state: AuthState) => state.userData;

export const getAuthState = createFeatureSelector<AuthState>("authState");

export const selectCurrentUserData = createSelector(
  getAuthState,
  getSelectedUserAuth
);

const getConfirmationSuccessMessage = (state: AuthState) =>
  state.confirmationResponse;

export const selectConfirmationMessage = createSelector(
  getAuthState,
  getConfirmationSuccessMessage
);
