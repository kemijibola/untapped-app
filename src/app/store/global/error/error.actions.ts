import { Action } from '@ngrx/store';

export const EXCEPTION_OCCURED = 'EXCEPTION_OCCURED';

export class ExceptionOccurred implements Action {
  readonly type = EXCEPTION_OCCURED;
  constructor(public payload: { error: any }) {}
}

export type ErrorActions = ExceptionOccurred;
