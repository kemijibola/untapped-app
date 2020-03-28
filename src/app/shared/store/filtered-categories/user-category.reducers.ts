import * as UserCategoryActions from "./user-category.action";
import { UserFilterCategory } from "src/app/interfaces";

export interface State {
  talents: UserFilterCategory[];
  selectedUser: UserFilterCategory;
}

const initialState: State = {
  talents: [],
  selectedUser: Object.assign({})
};

export function UserCategoryReducers(
  state = initialState,
  action: UserCategoryActions.UserCategoryActions
) {
  switch (action.type) {
    case UserCategoryActions.SET_ALL_TALENT_HIGHEST_COMMENT:
      return {
        ...state,
        talents: [...action.payload]
      };
    case UserCategoryActions.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: { ...state.selectedUser, ...action.payload }
      };
    default:
      return state;
  }
}
