import * as AuthActions from "./auth.actions";
import { IAuthData } from "../../interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./auth.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OutboundState } from "src/app/shared/Util";
export interface AuthState extends EntityState<IAuthData> {
  userData: IAuthData | null;
  confirmationResponse: string | null;
  loginStatus: OutboundState | null;
  registerStatus: OutboundState | null;
  resendEmailStatus: OutboundState | null;
  forgotPasswordStatus: OutboundState | null;
  newUserEmail: string | null;
}

const initialState: AuthState = fromAdapter.adapter.getInitialState({
  loginStatus: OutboundState.initiated,
  registerStatus: OutboundState.initiated,
  resendEmailStatus: OutboundState.initiated,
  forgotPasswordStatus: OutboundState.initiated,
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
  newUserEmail: null,
});

export function reducer(
  state = initialState,
  action: AuthActions.AuthActions
): AuthState {
  switch (action.type) {
    case AuthActions.DO_SIGNIN:
      return Object.assign({
        ...state,
        loginStatus: OutboundState.inprogress,
      });
    case AuthActions.REQUEST_PASSWORD_RESET:
      return Object.assign({
        ...state,
        forgotPasswordStatus: OutboundState.inprogress,
      });

    case AuthActions.RESEND_CONFIRMATION_MAIL:
      return Object.assign({
        ...state,
        resendEmailStatus: OutboundState.inprogress,
      });
    case AuthActions.REQUEST_PASSWORD_RESET_SUCCESS:
      return Object.assign({
        ...state,
        forgotPasswordStatus: OutboundState.completed,
      });
    case AuthActions.REQUEST_PASSWORD_RESET_FAILED:
      return Object.assign({
        ...state,
        forgotPasswordStatus: OutboundState.failed,
      });
    case AuthActions.RESEND_CONFIRMATION_MAIL_SUCCESS:
      return Object.assign({
        ...state,
        resendEmailStatus: OutboundState.completed,
      });
    case AuthActions.RESEND_CONFIRMATION_MAIL_FAILED:
      return Object.assign({
        ...state,
        resendEmailStatus: OutboundState.failed,
      });
    case AuthActions.DO_SIGNUP:
      return Object.assign({
        ...state,
        newUserEmail: action.payload.registerData.email,
        registerStatus: OutboundState.inprogress,
      });
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
        loginStatus: OutboundState.completed,
      });
    case AuthActions.SIGNUP_SUCCESS:
      return Object.assign({
        ...state,
        registerStatus: OutboundState.completed,
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
    case AuthActions.SIGNIN_FAILURE:
      return Object.assign({
        ...state,
        loginStatus: OutboundState.completed,
      });
    case AuthActions.SIGNUP_FAILURE:
      return Object.assign({
        ...state,
        registerStatus: OutboundState.completed,
      });
    default: {
      return state;
    }
  }
}
const getSelectedUserAuth = (state: AuthState) => state.userData;

const getLoginCompleted = (state: AuthState): boolean =>
  state.loginStatus === OutboundState.completed;

const getLoginInProgress = (state: AuthState): boolean =>
  state.loginStatus === OutboundState.inprogress;

const getLoginInitiated = (state: AuthState): boolean =>
  state.loginStatus === OutboundState.initiated;

const getSignUpCompleted = (state: AuthState): boolean =>
  state.registerStatus === OutboundState.completed;

const getSignUpInProgress = (state: AuthState): boolean =>
  state.registerStatus === OutboundState.inprogress;

const getSignUpInitiated = (state: AuthState): boolean =>
  state.registerStatus === OutboundState.initiated;

const getForgotPasswordCompleted = (state: AuthState): boolean =>
  state.forgotPasswordStatus === OutboundState.completed;

const getForgotPasswordInProgress = (state: AuthState): boolean =>
  state.forgotPasswordStatus === OutboundState.inprogress;

const getForgotPasswordInitiated = (state: AuthState): boolean =>
  state.forgotPasswordStatus === OutboundState.initiated;

const getForgotPasswordFailed = (state: AuthState): boolean =>
  state.forgotPasswordStatus === OutboundState.failed;

const getNewUserEmail = (state: AuthState) => state.newUserEmail;

const getResendEmailCompleted = (state: AuthState): boolean =>
  state.resendEmailStatus === OutboundState.completed;

const getResendEmailInProgress = (state: AuthState): boolean =>
  state.resendEmailStatus === OutboundState.inprogress;

const getResendEmailInitiated = (state: AuthState): boolean =>
  state.resendEmailStatus === OutboundState.initiated;

const getResendEmailFailure = (state: AuthState): boolean =>
  state.resendEmailStatus === OutboundState.failed;

export const getAuthState = createFeatureSelector<AuthState>("authState");

export const selectCurrentUserData = createSelector(
  getAuthState,
  getSelectedUserAuth
);

export const selectLoginInitiatedStatus = createSelector(
  getAuthState,
  getLoginInitiated
);

export const selectForgotCompletedStatus = createSelector(
  getAuthState,
  getForgotPasswordCompleted
);

export const selectForgotInitiatedStatus = createSelector(
  getAuthState,
  getForgotPasswordInitiated
);

export const selectForgotInProgressStatus = createSelector(
  getAuthState,
  getForgotPasswordInProgress
);

export const selectForgotFailedStatus = createSelector(
  getAuthState,
  getForgotPasswordFailed
);

export const selectLoginInProgressStatus = createSelector(
  getAuthState,
  getLoginInProgress
);

export const selectLoginCompletedStatus = createSelector(
  getAuthState,
  getLoginCompleted
);

export const selectSignUpInitiatedStatus = createSelector(
  getAuthState,
  getSignUpInitiated
);

export const selectSignUpInProgressStatus = createSelector(
  getAuthState,
  getSignUpInProgress
);

export const selectSignUpCompletedStatus = createSelector(
  getAuthState,
  getSignUpCompleted
);

export const selectResendEmailInProgressStatus = createSelector(
  getAuthState,
  getResendEmailInProgress
);

export const selectResendEmailCompletedStatus = createSelector(
  getAuthState,
  getResendEmailCompleted
);

export const selectResendEmailInitiatedStatus = createSelector(
  getAuthState,
  getResendEmailInitiated
);

export const selectResendEmailFailedStatus = createSelector(
  getAuthState,
  getResendEmailFailure
);

export const selectNewUserEmail = createSelector(getAuthState, getNewUserEmail);

const getConfirmationSuccessMessage = (state: AuthState) =>
  state.confirmationResponse;

export const selectConfirmationMessage = createSelector(
  getAuthState,
  getConfirmationSuccessMessage
);
