import * as ToggleStateActions from './slide-toggle.actions';
import { IToggle } from 'src/app/interfaces';

export interface State {
    toggles: IToggle[];
}

const initialState: State = {
    toggles: [],
};

export function SlideToggleReducers(state = initialState, action: ToggleStateActions.ToggleStateActions) {

    switch (action.type) {
        case ToggleStateActions.ADD_PAGE_TOGGLES:
            return {
                ...state,
                toggles: [...state.toggles, ...action.payload.toggles]
            };
        case ToggleStateActions.UPDATE_TOGGLE:
            const toggleByIndex = state.toggles.filter(
                x => x.index === action.payload.updateObj.index
            )[0];
            const updateToggle = {
                ...toggleByIndex,
                ...action.payload.updateObj
            };
            Object.assign(toggleByIndex, updateToggle);
            return {
                ...state,
                toggles: [toggleByIndex]
            };
        default:
            return state;
    }
}
