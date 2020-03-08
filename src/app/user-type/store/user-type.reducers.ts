import { IUserType } from '../../interfaces';
import * as UserTypeActions from './user-type.actions';

export interface State {
  userTypes: IUserType[];
  selectedUserType: string;
}

const initialState: State = {
  userTypes: [],
  selectedUserType: ''
};

export function userTypeReducer(
  state = initialState,
  action: UserTypeActions.UserTypeActions
) {
  switch (action.type) {
    case UserTypeActions.SET_USER_TYPES:
      return {
        ...state,
        userTypes: [...action.payload]
      };
    case UserTypeActions.SET_SELECTED_USER_TYPE:
      return {
        ...state,
        selectedUserType: action.payload
      };
    case UserTypeActions.RESET_SELECTED_USER_TYPE:
      return {
        ...state,
        selectedUserType: action.payload
      };
    default:
      return state;
  }
}
