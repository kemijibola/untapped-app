import { Action } from "@ngrx/store";
import {
  IModal,
  NavigationData,
  MagnifierData,
  AppModal
} from "src/app/interfaces";

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SET_NAVIGATION_PROPERTIES = "SET_NAVIGATION_PROPERTIES";
export const RESET_CURRENT_MODAL = "RESET_CURRENT_MODAL";

export const SET_MAGNIFIER_DATA = "SET_MAGNIFIER_DATA";
export const TOGGLE_MAGNIFIER = "TOGGLE_MAGNIFIER";

export class ToggleModal implements Action {
  readonly type = TOGGLE_MODAL;
  constructor(public payload: { component: string; modal: IModal }) {}
}

export class ToggleMagnifier implements Action {
  readonly type = TOGGLE_MAGNIFIER;
  constructor(public payload: boolean) {}
}

export class ResetCurrentModal implements Action {
  readonly type = RESET_CURRENT_MODAL;
}

export class SetModalNavigationProperties implements Action {
  readonly type = SET_NAVIGATION_PROPERTIES;
  constructor(public payload: NavigationData) {}
}

export class SetMagnifierData implements Action {
  readonly type = SET_MAGNIFIER_DATA;
  constructor(public payload: MagnifierData) {}
}

export type ModalsActions =
  | ToggleModal
  | ResetCurrentModal
  | SetModalNavigationProperties
  | SetMagnifierData
  | ToggleMagnifier;
