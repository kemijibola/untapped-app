import { Action } from "@ngrx/store";
import {
  IAuthData,
  IRegister,
  ILogin,
  IConfirmEmail,
} from "src/app/interfaces";

export const DO_SIGNUP = "DO_SIGNUP";
export const DO_SIGNIN = "DO_SIGNIN";
export const TOKEN_CHANGED = "TOKEN_CHANGED";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const RESET_FAILURE_MESSAGE = "RESET_FAILURE_MESSAGE";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const SET_AUTHDATA = "SET_AUTHDATA";
export const FETCH_AUTHDATA = "FETCH_AUTHDATA";
export const DELETE_AUTHDATA = "DELETE_AUTHDATA";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const SET_NEW_USER_EMAIL = "SET_NEW_USER_EMAIL";
export const DO_EMAIL_CONFIRMATION = "DO_EMAIL_CONFIRMATION";
export const SUCCESS_EMAIL_CONFIRMATION = "SUCCESS_EMAIL_CONFIRMATION";
export const FAILURE_EMAIL_CONFIRMATION = "FAILURE_EMAIL_CONFIRMATION";
export const CHECK_TOKEN_EXPIRED = "CHECK_TOKEN_EXPIRED";
export const PROCEED_TO_ROUTE = "PROCEED_TO_ROUTE";

export class DoSignUp implements Action {
  readonly type = DO_SIGNUP;
  constructor(public payload: { registerData: IRegister }) {}
}
export class DoSignIn implements Action {
  readonly type = DO_SIGNIN;
  constructor(public payload: { loginData: ILogin }) {}
}
export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
}
export class SignInSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
  constructor(public payload: { userData: IAuthData }) {}
}
export class SignUpFailure implements Action {
  readonly type = SIGNUP_FAILURE;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}
export class ResetFailureMessage implements Action {
  readonly type = RESET_FAILURE_MESSAGE;
}
export class LogOut implements Action {
  readonly type = LOGOUT;
}
export class SetAuthData implements Action {
  readonly type = SET_AUTHDATA;
  constructor(public payload: IAuthData) {}
}
// this might also work for LogOut Action
export class DeleteAutData implements Action {
  readonly type = DELETE_AUTHDATA;
}
export class UpdateToken implements Action {
  readonly type = UPDATE_TOKEN;
  constructor(public payload: { token: string }) {}
}
export class SetNewUserEmail implements Action {
  readonly type = SET_NEW_USER_EMAIL;
  constructor(public payload: { email: string }) {}
}

export class SignInFailure implements Action {
  readonly type = SIGNIN_FAILURE;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}
export class FetchAuthData implements Action {
  readonly type = FETCH_AUTHDATA;
}

export class DoEmailConfirmation implements Action {
  readonly type = DO_EMAIL_CONFIRMATION;
  constructor(public payload: { confirmEmailData: IConfirmEmail }) {}
}

export class SuccessEmailConfirmation implements Action {
  readonly type = SUCCESS_EMAIL_CONFIRMATION;
  constructor(public payload: { response: string }) {}
}

export class FailureEmailConfirmation implements Action {
  readonly type = FAILURE_EMAIL_CONFIRMATION;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class CheckTokenExpired implements Action {
  readonly type = CHECK_TOKEN_EXPIRED;
  constructor(public payload: { tokenData: IAuthData }) {}
}

export class ProceedToRoute implements Action {
  readonly type = PROCEED_TO_ROUTE;
  constructor(public payload: { routeUrl: string }) {}
}

export type AuthActions =
  | SignUpSuccess
  | SignInSuccess
  | LogOut
  | SetAuthData
  | DeleteAutData
  | UpdateToken
  | DoSignUp
  | SetNewUserEmail
  | DoSignIn
  | SignUpFailure
  | ResetFailureMessage
  | SignInFailure
  | FetchAuthData
  | DoEmailConfirmation
  | SuccessEmailConfirmation
  | FailureEmailConfirmation
  | CheckTokenExpired
  | ProceedToRoute;
