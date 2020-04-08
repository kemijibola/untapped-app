import { Action } from "@ngrx/store";
import {
  IModal,
  NavigationData,
  MagnifierData,
  AppModal,
} from "src/app/interfaces";

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const ADD_COMPONENT_MODAL = "ADD_COMPONENT_MODAL";
export const SET_CURRENT_MODAL = "SET_CURRENT_MODAL";
export const RESET_CURRENT_MODAL = "RESET_CURRENT_MODAL";
export const FETCH_APP_MODAL = "FETCH_APP_MODAL";
export const UPSERT_MODAL = "UPSERT_MODAL";
export const DESTROY_MODAL = "DESTROY_MODAL";
export const DESTROY_MODALS = "DESTROY_MODALS";
export const DESTROY_ALL = "DESTROY_ALL";
export const SET_NAVIGATION_PROPERTIES = "SET_NAVIGATION_PROPERTIES";

export const SET_MAGNIFIER_DATA = "SET_MAGNIFIER_DATA";
export const TOGGLE_MAGNIFIER = "TOGGLE_MAGNIFIER";

export class ToggleModal implements Action {
  readonly type = TOGGLE_MODAL;
  constructor(public payload: { appModal: AppModal; modal: IModal }) {}
}

export class AddComponentModal implements Action {
  readonly type = ADD_COMPONENT_MODAL;
  constructor(public payload: { componentModal: AppModal }) {}
}

export class ResetCurrentModal implements Action {
  readonly type = RESET_CURRENT_MODAL;
}
export class SetCurrentModal implements Action {
  readonly type = SET_CURRENT_MODAL;
  constructor(public payload: IModal) {}
}
export class DestroyModal implements Action {
  readonly type = DESTROY_MODAL;
  constructor(public payload: { id: string }) {}
}

export class DestroyModals implements Action {
  readonly type = DESTROY_MODALS;
  constructor(public payload: { ids: string[] }) {}
}

export class DestroyAll implements Action {
  readonly type = DESTROY_ALL;
}

export class UpsertModal implements Action {
  readonly type = UPSERT_MODAL;
  constructor(public payload: AppModal) {}
}
export class FetchAppModal implements Action {
  readonly type = FETCH_APP_MODAL;
  constructor(public payload: { appModalId: string }) {}
}

export class ToggleMagnifier implements Action {
  readonly type = TOGGLE_MAGNIFIER;
  constructor(public payload: boolean) {}
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
  | SetModalNavigationProperties
  | SetMagnifierData
  | ToggleMagnifier
  | UpsertModal
  | FetchAppModal
  | DestroyModal
  | DestroyModals
  | DestroyAll
  | SetCurrentModal
  | ResetCurrentModal
  | AddComponentModal;
