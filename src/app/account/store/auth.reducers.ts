import * as AuthActions from './auth.actions';
import { Register } from '../../models/';

export interface State {
    authenticated: boolean;
    authData: {
        token: string;
        permissions: [];
        user: string
    };
    errorMessage: string;
}
const initialState: State = {
    authenticated: false,
    authData: {
        token: '',
        permissions: [],
        user: ''
    },
    errorMessage: ''
};
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case (AuthActions.SIGNUP_SUCCESS):
            return {
                ...state,
                authenticated: false,
                token: null,
                errorMessage: null
            };
        case (AuthActions.SIGNIN_SUCCESS):
            return {
                ...state,
                authenticated: true,
                errorMessage: null
            };
        case (AuthActions.SET_TOKEN):
            return {
                ...state,
                user: {
                    token: action.payload.token,
                    user: action.payload.user,
                    permissions: action.payload.permissions
                }
            };
        case (AuthActions.LOGOUT):
            return {
                ...state,
                token: null,
                authenticated: false
            };
        case (AuthActions.SIGNUP_FAILURE):
            return {
                ...state,
                errorMessage: action.payload.message
            };
        case (AuthActions.SIGNIN_FAILURE):
            return {
                ...state,
                errorMessage: action.payload.message
            };
        default:
            return state;
    }
}
