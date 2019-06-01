import { UserType } from '../../models/index';
import * as UserTypeActions from './user-type.actions';

export interface State {
    userTypes: UserType[];
    selectedUserType: string;
}
const initialState: State = {
    userTypes: [],
    selectedUserType: ''
};

export function userTypeReducer(state = initialState, action: UserTypeActions.UserTypeActions) {
    switch (action.type) {
        case (UserTypeActions.SET_USERTYPES):
            return {
                ...state,
                userTypes: action.payload
            };
        case (UserTypeActions.SET_SELECTEDUSERTYPE):
            return {
                ...state,
                selectedUserType: action.payload
            };
        case (UserTypeActions.REMOVE_SELECTEDUSERTYPE):
            return {
                ...state,
                selectedUserType: ''
            };
        default:
            return state;
    }
}
