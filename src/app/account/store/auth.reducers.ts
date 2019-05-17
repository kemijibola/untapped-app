import * as AuthActions from './auth.actions';
import { User, Result } from 'src/app/models';

export interface State {
    token: string;
    authenticated: boolean;
    newUserEmail: string;
    emailIsAvailable: boolean;
}
const initialState: State = {
    token: null,
    authenticated: false,
    newUserEmail: '',
    emailIsAvailable: false
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
        case (AuthActions.SET_EMAIL_AVAILABILITY):
            console.log(action.payload);
            return {
                ...state,
                emailIsAvailable: action.payload
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
