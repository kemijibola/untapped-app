import { NavLink } from '../../models/index';
import * as CoreModuleActions from './core.actions';

export const CLICK_LINK = 'CLICK_LINK';
const initialState = {
    activeLink: new NavLink('home', true)
};

export function coreReducer(state = initialState, action: CoreModuleActions.CoreModuleActions) {
    switch (action.type) {
        case CoreModuleActions.ON_LINK_CLICKED:
            return {
                ...state,
                navLink: [state.activeLink, action.payload]
            };
        default:
        return state;
    }
}
