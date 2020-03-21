import { Action } from "@ngrx/store";
import { IModal, NavigationData } from "src/app/interfaces";

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SET_NAVIGATION_PROPERTIES = "SET_NAVIGATION_PROPERTIES";
export const RESET_CURRENT_MODAL = "RESET_CURRENT_MODAL";

export class ToggleModal implements Action {
  readonly type = TOGGLE_MODAL;
  constructor(public payload: { component: string; modal: IModal }) {}
}

export class ResetCurrentModal implements Action {
  readonly type = RESET_CURRENT_MODAL;
}

export class SetModalNavigationProperties implements Action {
  readonly type = SET_NAVIGATION_PROPERTIES;
  constructor(public payload: NavigationData) {}
}

export type ModalsActions =
  | ToggleModal
  | ResetCurrentModal
  | SetModalNavigationProperties;
