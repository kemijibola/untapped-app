import * as InitActions from './init.actions';

export interface State {
    baseUrl: string;
}

const initialState: State = {
    baseUrl: ''
};

export function InitReducers(state = initialState, action: InitActions.InitActions) {
    switch (action.type) {
        case InitActions.SET_BASE_URL:
            return {
                ...state,
                baseUrl: action.payload['baseUrl']
            };
        default:
            return state;
    }
}


