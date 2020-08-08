import { ILocation } from "src/app/interfaces";
import * as UserLocationAction from "./user-location.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./user-location.adapter";

export interface UserLocationState extends EntityState<ILocation> {
  userAddress: ILocation | null;
}

const initialState: UserLocationState = fromAdapter.adapter.getInitialState({
  userAddress: null,
});

export function userLocationReducer(
  state = initialState,
  action: UserLocationAction.UserLocationAction
): UserLocationState {
  switch (action.type) {
    case UserLocationAction.SET_SELECTED_ADDRESS:
      return Object.assign({
        ...state,
        userAddress: action.payload,
      });
    default: {
      return state;
    }
  }
}

export const getUserLocationState = createFeatureSelector<UserLocationState>(
  "userLocationState"
);

const getSelectedCurrentUserLocation = (state: UserLocationState) =>
  state.userAddress;

export const selectCurrentUserLocation = createSelector(
  getUserLocationState,
  getSelectedCurrentUserLocation
);
