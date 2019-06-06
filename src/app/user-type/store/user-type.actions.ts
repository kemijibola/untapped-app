import { Action } from '@ngrx/store';
import { UserType } from '../../models/';

export const FETCH_USERTYPES = 'FETCH_USERTYPES';
export const SET_USERTYPES = 'SET_USERTYPES';
export const SET_SELECTEDUSERTYPE = 'SET_SELECTEDUSERTYPE';
export const RESET_SELECTEDUSERTYPE = 'RESET_SELECTEDUSERTYPE';

export class SetUserTypes implements Action {
    readonly type  = SET_USERTYPES;
    constructor(public payload: UserType[]) {}
}
export class FetchUserTypes implements Action {
    readonly type = FETCH_USERTYPES;
}

export class SetSelectedUserType implements Action {
    readonly type = SET_SELECTEDUSERTYPE;
    constructor(public payload: string) {}
}
export class ResetSelectedUserType implements Action {
    readonly type = RESET_SELECTEDUSERTYPE;
    constructor(public payload: { selectedUserType: string }) {}
}

export type UserTypeActions =
SetUserTypes | FetchUserTypes |
SetSelectedUserType | ResetSelectedUserType;
