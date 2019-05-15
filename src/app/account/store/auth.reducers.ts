import * as AuthActions from './auth.actions';
import { User } from 'src/app/models';

export interface State {
    token: string;
    authenticated: boolean;
    user: User;
}
const initialState: State = {
    token: null,
    authenticated: false,
    user: null
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
        // case (AuthActions.FETCH_USER):
        //     return {
        //         ...state,
        //         param: action.payload
        //     };
        case (AuthActions.SET_EMAIL_AVAILABILITY):
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
