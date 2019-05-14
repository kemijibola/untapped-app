import { Action } from '@ngrx/store';
import { UserType } from '../../models/index';

export const FETCH_USERTYPES = 'FETCH_USERTYPES';
export const SET_USERTYPES = 'SET_USERTYPES';

export class SetUserTypes implements Action {
    readonly type  = SET_USERTYPES;
}
export class FetchUserTypes implements Action {
    readonly type = FETCH_USERTYPES;
}

export type UserTypeActions = SetUserTypes | FetchUserTypes;
