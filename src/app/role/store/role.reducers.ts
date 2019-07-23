import { IRole } from '../../interfaces';
import * as RoleActions from './role.actions';

export interface State {
  roles: IRole[];
  selectedRole: string;
}

const initialState: State = {
  roles: [],
  selectedRole: ''
};

export function roleReducer(
  state = initialState,
  action: RoleActions.RoleActions
) {
  switch (action.type) {
    case RoleActions.SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
    case RoleActions.SET_SELECTEDROLE:
      return {
        ...state,
        selectedRole: action.payload
      };
    case RoleActions.RESET_SELECTEDROLE:
      return {
        ...state,
        selectedRole: action.payload
      };
    default:
      return state;
  }
}