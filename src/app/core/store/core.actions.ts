import { Action } from '@ngrx/store';
import { NavLink } from 'src/app/models';

export const ON_LINK_CLICKED = 'ON_LINK_CLICKED';

export class ClickLink implements Action {
    readonly type = ON_LINK_CLICKED;
    // payload: NavLink;
    constructor(public payload: NavLink) {}
}

export type CoreModuleActions = ClickLink;

