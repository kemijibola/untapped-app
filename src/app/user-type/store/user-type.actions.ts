import { Action } from '@ngrx/store';
import { Result } from '../../models/';

export const FETCH_USERTYPES = 'FETCH_USERTYPES';
export const SET_USERTYPES = 'SET_USERTYPES';
export const SET_SELECTEDUSERTYPE = 'SET_SELECTEDUSERTYPE';
export const REMOVE_SELECTEDUSERTYPE = 'REMOVE_SELECTEDUSERTYPE';

export class SetUserTypes implements Action {
    readonly type  = SET_USERTYPES;
    constructor(public payload: Result) {}
}
export class FetchUserTypes implements Action {
    readonly type = FETCH_USERTYPES;
}

export class SetSelectedUserType implements Action {
    readonly type = SET_SELECTEDUSERTYPE;
    constructor(public payload: string) {}
}
export class RemoveSelectedUserType implements Action {
    readonly type = REMOVE_SELECTEDUSERTYPE;
}

export type UserTypeActions =
SetUserTypes | FetchUserTypes |
SetSelectedUserType | RemoveSelectedUserType;
