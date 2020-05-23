import { Action } from "@ngrx/store";
import { IToggle } from "src/app/interfaces";

export const ADD_COMPONENT_TOGGLE = "ADD_COMPONENT_TOGGLE";
export const INITIATE_TOGGLE = "INITIATE_TOGGLE";
export const UPSERT_TOGGLE = "UPSERT_TOGGLE";
export const DESTROY_TOGGLE = "DESTROY_TOGGLE";
export const FETCH_TOGGLE = "FETCH_TOGGLE";

export class AddComponentToggle implements Action {
  readonly type = ADD_COMPONENT_TOGGLE;
  constructor(public payload: { componentToggle: IToggle[] }) {}
}

export class FetchToggle implements Action {
  readonly type = FETCH_TOGGLE;
  constructor(public payload: { appToggleId: string }) {}
}
// export class InitiateToggle implements Action {
//   readonly type = INITIATE_TOGGLE;
//   constructor(
//     public payload: { componentToggle: AppToggle; toggle: IToggle }
//   ) {}
// }

export class UpsertToggle implements Action {
  readonly type = UPSERT_TOGGLE;
  constructor(public payload: IToggle) {}
}

export type ToggleActions = AddComponentToggle | UpsertToggle | FetchToggle;
