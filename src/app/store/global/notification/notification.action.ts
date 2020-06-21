import { Action } from "@ngrx/store";
import { AppNotification, AppNotificationKey } from "src/app/interfaces";

export const ADD_ERROR = "ADD_ERROR";
export const ADD_SUCCESS = "ADD_SUCCESS";
export const ADD_INFO = "ADD_INFO";
export const CLEAR_INFO = "CLEAR_INFO";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_SUCCESS = "CLEAR_SUCCESS";
export const NOOP = "NOOP";

export class AddError implements Action {
  readonly type = ADD_ERROR;
  constructor(public payload: AppNotification) {}
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: AppNotification) {}
}

export class Noop implements Action {
  readonly type = NOOP;
}

export class AddInfo implements Action {
  readonly type = ADD_INFO;
  constructor(public payload: AppNotification) {}
}

export class ClearNotification implements Action {
  readonly type = CLEAR_ERROR;
  constructor(public payload: { type: AppNotificationKey }) {}
}

export type NotificationActions =
  | AddError
  | AddInfo
  | AddSuccess
  | ClearNotification
  | Noop;
