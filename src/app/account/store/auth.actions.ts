import { Action } from '@ngrx/store';
import { IAuthData, IRegister, ILogin } from 'src/app/interfaces';

export const DO_SIGNUP = 'DO_SIGNUP';
export const DO_SIGNIN = 'DO_SIGNIN';
export const TOKEN_CHANGED = 'TOKEN_CHANGED';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const RESET_FAILURE_MESSAGE = 'RESET_FAILURE_MESSAGE';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_AUTHDATA = 'SET_AUTHDATA';
export const FETCH_AUTHDATA = 'FETCH_AUTHDATA';
export const DELETE_AUTHDATA = 'DELETE_AUTHDATA';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const SET_NEW_USER_EMAIL = 'SET_NEW_USER_EMAIL';

export class DoSignUp implements Action {
  readonly type = DO_SIGNUP;
  constructor(public payload: { register: IRegister }) {}
}
export class DoSignIn implements Action {
  readonly type = DO_SIGNIN;
  constructor(public payload: { loginParam: ILogin }) {}
}
export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
}
export class SignInSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
  constructor(public payload: IAuthData) {}
}
export class SignUpFailure implements Action {
  readonly type = SIGNUP_FAILURE;
  constructor(public payload: { error: string }) {}
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
  constructor(public payload: string) {}
}
export class FetchAuthData implements Action {
  readonly type = FETCH_AUTHDATA;
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
  | FetchAuthData;
