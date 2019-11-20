import { Action } from '@ngrx/store';
import { IToggle } from 'src/app/interfaces';

export const ADD_PAGE_TOGGLES = 'ADD_PAGE_TOGGLES';
export const UPDATE_TOGGLE = 'UPDATE_TOGGLE';
export const DESTROY_TOGGLE = 'DESTROY_TOGGLE';

export class AddPageToggles implements Action {
    readonly type = ADD_PAGE_TOGGLES;
    constructor(public payload: { toggles: IToggle[]}) {}
}

export class UpdateToggle implements Action {
    readonly type = UPDATE_TOGGLE;
    constructor(public payload: { updateObj: IToggle}) {}
}

export class DestroyToggle implements Action {
    readonly type = DESTROY_TOGGLE;
    constructor(public payload: { name: string}) {}
}

export type ToggleStateActions =  AddPageToggles | AddPageToggles | UpdateToggle | DestroyToggle;
