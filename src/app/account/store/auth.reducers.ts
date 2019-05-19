import * as AuthActions from './auth.actions';
import { Register } from '../../models/';

export interface State {
    authenticated: boolean;
    newUser: Register;
    user: {
        token: string;
        id: string;
        user_type: string
    };
    errorMessage: string;
}
const initialState: State = {
    authenticated: false,
    newUser: new Register(),
    user: {
        token: '',
        id: '',
        user_type: ''
    },
    errorMessage: ''
};
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case (AuthActions.DO_SIGNUP):
            return {
            ...state,
            newUser: action.payload
        };
        case (AuthActions.SIGNUP_SUCCESS):
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
                    id: action.payload.id,
                    user_type: action.payload.user_type
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
        default:
            return state;
    }
}
