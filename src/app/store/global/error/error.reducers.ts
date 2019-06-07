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
        case (ErrorActions.ERROR_OCCURRED):
            return {
                ...state,
                message: action.payload
            };
        case (ErrorActions.SET_ERROR):
            console.log(action.payload);
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
}
