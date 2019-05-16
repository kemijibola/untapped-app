import { Action } from '@ngrx/store';
import { User, Result } from 'src/app/models';

export const DO_SIGNUP = 'DO_SIGNUP';
export const DO_SIGNIN = 'DO_SIGNIN';
export const FETCH_USER_BY_EMAIL = 'FETCH_USER_BY_EMAIL';
export const SET_USER_BY_EMAIL = 'SET_USER_BY_EMAIL';
export const TOKEN_CHANGED = 'TOKEN_CHANGED';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const EXPIRE_TOKEN = 'EXPIRE_TOKEN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const SET_NEW_USER_EMAIL = 'SET_NEW_USER_EMAIL';

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
export class FetchUserByEmail implements Action {
    readonly type = FETCH_USER_BY_EMAIL;
    constructor(public payload: { param: string }) {
    }
}
export class SetUserByEmail implements Action {
    readonly type = SET_USER_BY_EMAIL;
    constructor(public payload: any) {}
}
export class SetNewUserEmail implements Action {
    readonly type = SET_NEW_USER_EMAIL;
    constructor(public payload: string) {}
}

export type AuthActions = SignUp | SignIn | LogOut |
SetToken | UpdateToken | DoSignUp | FetchUserByEmail | SetUserByEmail | SetNewUserEmail;
