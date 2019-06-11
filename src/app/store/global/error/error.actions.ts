import { Action } from '@ngrx/store';

export const SET_ERROR = 'SET_ERROR';
export const OPERATION_FAILED = 'OPERATION_FAILED';
export const ERROR_OCCURRED = 'ERROR_OCCURRED';

export class SetError implements Action {
    readonly type = SET_ERROR;
    constructor(public payload: { message: string }) {}
}

export class ExceptionOccurred implements Action {
    readonly type = ERROR_OCCURRED;
    constructor(public payload: { message: string }) {}
}


export type ErrorActions = SetError | ExceptionOccurred;
