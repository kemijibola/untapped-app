import { Action } from '@ngrx/store';

export const ADD_GLOBAL_ERROR = 'ADD_GLOBAL_ERROR';

export class AddGlobalError implements Action {
  readonly type = ADD_GLOBAL_ERROR;
  constructor(public payload: any) {}
}

export type ErrorActions = AddGlobalError;
