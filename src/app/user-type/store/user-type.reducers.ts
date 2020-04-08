import {
  Action,
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IUserType } from "../../interfaces";
import * as UserTypeActions from "./user-type.actions";
import { AppError } from "src/app/store/global/error/error.reducers";
import * as fromAdapter from "./user-type.adapter";

export interface UserTypeState extends EntityState<IUserType> {
  selectedUserTypeId: string | number | null;
  userTypeError: AppError | null;
}

const initialState: UserTypeState = fromAdapter.adapter.getInitialState({
  selectedUserTypeId: null,
  userTypeError: null,
});

export function reducer(
  state = initialState,
  action: UserTypeActions.UserTypeActions
): UserTypeState {
  switch (action.type) {
    case UserTypeActions.FETCH_USER_TYPES_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.userTypes, state);
    case UserTypeActions.FETCH_USER_TYPE:
      return Object.assign({
        ...state,
        selectedUserTypeId: action.payload.userTypeId,
      });
    case UserTypeActions.FETCH_USER_TYPES_ERROR:
      return Object.assign({
        ...state,
        userTypeError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    default: {
      return state;
    }
  }
}

const getSelectedUserTypeId = (state: UserTypeState) =>
  state.selectedUserTypeId;

const getUserTypeError = (state: UserTypeState) => state.userTypeError;

export const getUserTypeState = createFeatureSelector<UserTypeState>(
  "userTypeState"
);

export const selectUserTypeIds = createSelector(
  getUserTypeState,
  fromAdapter.selectUserTypeIds
);

export const selectUserTypeEntities = createSelector(
  getUserTypeState,
  fromAdapter.selectUserTpeEntities
);

export const selectAllUserTypes = createSelector(
  getUserTypeState,
  fromAdapter.selectAllUserTypes
);
export const userTypeCount = createSelector(
  getUserTypeState,
  fromAdapter.userTypeCount
);

export const selectCurrentUserTypeId = createSelector(
  getUserTypeState,
  getSelectedUserTypeId
);

export const selectUserTypeError = createSelector(
  getUserTypeState,
  getUserTypeError
);
export const selectCurrentUserType = createSelector(
  selectUserTypeEntities,
  selectCurrentUserTypeId,
  (userTypeEntities, userTypeId) => userTypeEntities[userTypeId]
);
