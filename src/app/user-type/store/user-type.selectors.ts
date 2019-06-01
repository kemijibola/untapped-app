import { createSelector, Store } from '@ngrx/store';
import * as fromUserType from './user-type.reducers';
import { UserType } from 'src/app/models';


const selectUserTypes = (state: fromUserType.State) => state.userTypes;
const selectedUserType = (state: fromUserType.State) => state.selectedUserType;

export const selecUserTypeList = createSelector(
    selectUserTypes,
    (state: UserType[]) => state
);

export const selectSelectedUserType = createSelector(
    selectedUserType,
    (state: string) => state
);
