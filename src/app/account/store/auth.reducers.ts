import * as AuthActions from './auth.actions';
import { User, Result } from 'src/app/models';

export interface State {
    token: string;
    authenticated: boolean;
    newUserEmail: string;
    userByEmail: any;
}
const initialState: State = {
    token: null,
    authenticated: false,
    newUserEmail: '',
    userByEmail: {}
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
        case (AuthActions.SET_NEW_USER_EMAIL):
            return {
                ...state,
                newUserEmail: action.payload
            };
        default:
            return state;
    }
}
