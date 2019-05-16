import * as AuthActions from './auth.actions';
import { User, Result } from 'src/app/models';

export interface State {
    token: string;
    authenticated: boolean;
    userByEmail: Result;
}
const initialState: State = {
    token: null,
    authenticated: false,
    userByEmail: new Result()
};
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case (AuthActions.SIGNUP):
        case (AuthActions.SIGNIN):
            return {
                ...state,
                authenticated: true
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case (AuthActions.SET_USER_BY_EMAIL):
            return {
                ...state,
                userByEmail: action.payload
            };
        default:
            return state;
    }
}
