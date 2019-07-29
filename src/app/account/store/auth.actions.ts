import { Action } from '@ngrx/store';
import { IAuthData, IRegister, ILogin } from 'src/app/interfaces';

export const DO_SIGNUP = 'DO_SIGNUP';
export const DO_SIGNIN = 'DO_SIGNIN';
export const TOKEN_CHANGED = 'TOKEN_CHANGED';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const EXPIRE_TOKEN = 'EXPIRE_TOKEN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const SET_NEW_USER_EMAIL = 'SET_NEW_USER_EMAIL';

export class DoSignUp implements Action {
  readonly type = DO_SIGNUP;
  constructor(public payload: IRegister) {}
}
export class DoSignIn implements Action {
  readonly type = DO_SIGNIN;
  constructor(public payload: ILogin) {}
}
export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
}
export class SignInSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
}
export class SignUpFailure implements Action {
  readonly type = SIGNUP_FAILURE;
  constructor(public payload: string) {}
}
export class LogOut implements Action {
  readonly type = LOGOUT;
}
export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: IAuthData) {}
}
// this might also work for LogOut Action
export class ExpireToken implements Action {
  readonly type = EXPIRE_TOKEN;
}
export class UpdateToken implements Action {
  readonly type = UPDATE_TOKEN;
  constructor(public payload: string) {}
}
export class SetNewUserEmail implements Action {
  readonly type = SET_NEW_USER_EMAIL;
  constructor(public payload: string) {}
}

export type AuthActions =
  | SignUpSuccess
  | SignInSuccess
  | LogOut
  | SetToken
  | UpdateToken
  | DoSignUp
  | SetNewUserEmail
  | DoSignIn
  | SignUpFailure;
