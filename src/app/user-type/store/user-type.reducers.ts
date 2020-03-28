import { Action } from "@ngrx/store";
import { IUserType } from "../../interfaces";
import * as UserTypeActions from "./user-type.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<IUserType> {
  userTypes: IUserType[];
  selectedUserType: IUserType;
}

export const userTypeAdapter: EntityAdapter<IUserType> = createEntityAdapter<
  IUserType
>();

const initialState: State = userTypeAdapter.getInitialState({
  userTypes: [],
  selectedUserType: {
    _id: "",
    name: "",
    description: ""
  }
});

export function userTypeReducer(
  state = initialState,
  action: UserTypeActions.UserTypeActions
): State {
  switch (action.type) {
    case UserTypeActions.FETCH_USER_TYPES_SUCCESS:
      return userTypeAdapter.setAll(action.payload.userTypes, state);
    case UserTypeActions.SET_SELECTED_USER_TYPE:
      return userTypeAdapter.upsertOne(action.payload.selectedUserType, state);
    case UserTypeActions.RESET_SELECTED_USER_TYPE:
      return userTypeAdapter.upsertOne(action.payload.selectedUserType, state);
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = userTypeAdapter.getSelectors();
