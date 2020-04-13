import { IUser } from "src/app/interfaces";
import * as UserActions from "./user.actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<IUser> {
  user: IUser;
}

export const userAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

const initialState: State = userAdapter.getInitialState({
  user: Object.assign({})
});

export function userReducers(
  state = initialState,
  action: UserActions.UserActions
): State {
  switch (action.type) {
    case UserActions.SET_USER:
      return userAdapter.setOne(action.payload.user, state);
    default:
      return state;
  }
}
