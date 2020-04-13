import * as UserImageActions from "./user-image.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./user-image.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserImageState extends EntityState<any> {}

const initialState: UserImageState = fromAdapter.adapter.getInitialState({});

export function reducer(
  state = initialState,
  action: UserImageActions.UserImageActions
): UserImageState {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getUserImageState = createFeatureSelector<UserImageState>(
  "userImageState"
);
