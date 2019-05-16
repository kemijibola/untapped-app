import * as AuthActions from './auth.actions';
import { User } from 'src/app/models';

export interface State {
    token: string;
    authenticated: boolean;
    isEmailAvailable: boolean;
}
const initialState: State = {
    token: null,
    authenticated: false,
    isEmailAvailable: false
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
        case (AuthActions.DO_EMAIL_CHECK):
            return {
                ...state,
                isEmailAvailable: action.payload
            };
        default:
            return state;
    }
}
