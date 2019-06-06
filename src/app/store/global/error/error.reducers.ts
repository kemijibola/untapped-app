import * as ErrorActions from './error.actions';

export interface State {
    exception: {
        message: string
    };
}
const initialState: State = {
    exception: {
        message: ''
    }
};

export function errorReducer(state = initialState, action: ErrorActions.ErrorActions) {
    switch (action.type) {
        case (ErrorActions.EXCEPTION_OCCURRED):
            return {
                ...state,
                message: action.payload
            };
        case (ErrorActions.SET_EXCEPTION):
            return {
                ...state,
                message: action.payload.message
            };
        default:
            return state;
    }
}
