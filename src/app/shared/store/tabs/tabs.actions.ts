import { Action } from '@ngrx/store';
import { AppTab } from 'src/app/models';

export const ADD_TAB = 'ADD_TAB';
export const ADD_TABS = 'ADD_TABS';
export const UPDATE_TAB = 'UPDATE_TAB';
export const DESTROY_TAB = 'DESTROY_TAB';

export class AddTab implements Action {
    readonly type = ADD_TAB;
    constructor(public payload: { tab: AppTab }) {}
}

export class AddTabs implements Action {
    readonly type = ADD_TABS;
    constructor(public payload: { tabs: AppTab[] }) {}
}
export class UpdateTab implements Action {
    readonly type = UPDATE_TAB;
    constructor(public payload: { name: string, tabIndex: number }) {}
}
export class DestroyTab implements Action {
    readonly type = DESTROY_TAB;
    constructor(public payload: { name: string }) {}
}

export type TabsAction =
UpdateTab | AddTab |
DestroyTab | AddTabs;
