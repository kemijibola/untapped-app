import { Action } from '@ngrx/store';
import { IService } from '../../../interfaces';
import { ServiceTypes } from 'src/app/lib/constants';

export const FETCH_SERVICE = 'FETCH_SERVICE';
export const SET_SERVICE = 'SET_SERVICE';
export const SET_SELECTED_SERVICE = 'SET_SELECTED_SERVICE';
export const RESET_SELECTEDSERVICE = 'RESET_SELECTEDSERVICE';

export class FetchService implements Action {
  readonly type = FETCH_SERVICE;
  constructor(public payload: { serviceTypes: ServiceTypes }) {}
}

export class SetService implements Action {
  readonly type = SET_SERVICE;
  constructor(public payload: { service: IService }) {}
}

export class SetSelectedService implements Action {
  readonly type = SET_SELECTED_SERVICE;
  constructor(public payload: { id: string }) {}
}

export class ResetSelectedService implements Action {
  readonly type = RESET_SELECTEDSERVICE;
}

export type ServiceActions =
  | FetchService
  | SetService
  | SetSelectedService
  | ResetSelectedService;
