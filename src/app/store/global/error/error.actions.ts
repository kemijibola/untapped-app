import { Action } from '@ngrx/store';

export const EFFECT_ERROR = 'EFFECT_ERROR';

export class EffectError implements Action {
    readonly type = EFFECT_ERROR;
    constructor(public payload: { message: string, type: string}) {}
}

export type ErrorActions = EffectError;
