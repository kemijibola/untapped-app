import { Action } from '@ngrx/store';
import { User } from 'src/app/models';

export const DO_SIGNUP = 'DO_SIGNUP';
export const DO_SIGNIN = 'DO_SIGNIN';
export const FETCH_USER = 'FETCH_USER';
export const SET_EMAIL_AVAILABILITY = 'SET_EMAIL_AVAILABILITY';
export const TOKEN_CHANGED = 'TOKEN_CHANGED';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const EXPIRE_TOKEN = 'EXPIRE_TOKEN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export class SignUp implements Action {
    readonly type = SIGNUP;
}
export class SignIn implements Action {
    readonly type = SIGNIN;
}
export class LogOut implements Action {
    readonly type = LOGOUT;
}
export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) {}
}
// this might also work for LogOut Action
export class ExpireToken implements Action {
    readonly type = EXPIRE_TOKEN;
}
export class UpdateToken implements Action {
    readonly type = UPDATE_TOKEN;
    constructor(public payload: string) {}
}
export class DoSignUp implements Action {
    readonly type = DO_SIGNUP;
    constructor(public payload: { name: string , email: string, password: string }) {}
}
export class FetchUser implements Action {
    readonly type = FETCH_USER;
    constructor(public payload: { param: string }) {
    }
}
export class SetEmailAvailability implements Action {
    readonly type = SET_EMAIL_AVAILABILITY;
    constructor(public payload: User) {}
}

export type AuthActions = SignUp | SignIn | LogOut | SetToken | UpdateToken | DoSignUp | FetchUser | SetEmailAvailability;
