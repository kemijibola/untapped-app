import { Action } from '@ngrx/store';

export const SET_BASE_URL = 'SET_BASE_URL';
export const FETCH_CONFIGS = 'FETCH_CONFIGS';

export class FetchConfigs implements Action {
    readonly type = FETCH_CONFIGS;
}
export class SetBaseUrl implements Action {
    readonly type = SET_BASE_URL;
    constructor(public payload: { url: string }) {}
}

export type InitActions =
SetBaseUrl | FetchConfigs;
