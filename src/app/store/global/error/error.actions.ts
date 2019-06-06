import { Action } from '@ngrx/store';

export const SET_EXCEPTION = 'SET_EXCEPTION';
export const EXCEPTION_OCCURRED = 'EXCEPTION_OCCURRED';

export class SetException implements Action {
    readonly type = SET_EXCEPTION;
    constructor(public payload: { message: string }) {}
}

export class ExceptionOccurred implements Action {
    readonly type = EXCEPTION_OCCURRED;
    constructor(public payload: { message: string }) {}
}

export type ErrorActions = SetException | ExceptionOccurred;
