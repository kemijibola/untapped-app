import { Action } from '@ngrx/store';
import { Modal } from 'src/app/interfaces';

export const ADD_MODAL = 'ADD_MODEL';
export const SET_MODAL_ID = 'SET_MODAL_ID';
export const UPDATE_MODAL = 'UPDATE_MODAL';
export const DESTROY_MODAL = 'DESTROY_MODAL';

export class AddModal implements Action {
  readonly type = ADD_MODAL;
  constructor(public payload: Modal) {}
}

export class SetModalId implements Action {
  readonly type = SET_MODAL_ID;
  constructor(public payload: string) {}
}

export class UpdateModal implements Action {
  readonly type = UPDATE_MODAL;
  constructor(public payload: { id: string; modal: Modal }) {}
}

export class DestroyTab implements Action {
  readonly type = DESTROY_MODAL;
  constructor(public payload: { name: string }) {}
}

export type ModalsActions = AddModal | UpdateModal | DestroyTab | SetModalId;
