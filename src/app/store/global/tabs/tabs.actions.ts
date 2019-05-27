import { Action } from '@ngrx/store';
import { Tab } from 'src/app/models';

export const ADD_TABS = 'ADD_TABS';
export const UPDATE_TAB = 'UPDATE_TAB';

export class UpdateTab implements Action {
    readonly type = UPDATE_TAB;
    constructor(public payload: { index: number, tab: Tab }) {}
}

export class AddTabs implements Action {
    readonly type = ADD_TABS;
    constructor(public payload: { tabs: Tab[] }) {}
}

export type TabsAction = UpdateTab | AddTabs;
