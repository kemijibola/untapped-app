import { Action } from '@ngrx/store';
import { IProfile } from 'src/app/models';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const SET_PROFILE = 'SET_PROFILE';
export const UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE';
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';

export class UpdateProfile implements Action {
    readonly type = UPDATE_PROFILE;
    constructor(public payload: { profile: any}) {}
}

export class FetchProfile implements Action {
    readonly type = FETCH_PROFILE;
}

export class SetProfile implements Action {
    readonly type = SET_PROFILE;
    constructor(public payload: { profile: IProfile }) {}
}

export class UpdateProfileImage implements Action {
    readonly type = UPDATE_PROFILE_IMAGE;
    constructor(public payload: { image: string }) {}
}

export class SetProfileImage implements Action {
    readonly type = SET_PROFILE_IMAGE;
    constructor(public payload: { image: string }) {}
}

export type ProfileActions =
UpdateProfile | FetchProfile |
SetProfile | UpdateProfileImage |
SetProfileImage;
