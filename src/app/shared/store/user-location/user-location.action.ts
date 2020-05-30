import { Action } from "@ngrx/store";
import { ILocation } from "src/app/interfaces";

export const SET_SELECTED_ADDRESS = "SET_SELECTED_ADDRESS";

export class SetSelectedAddress implements Action {
  readonly type = SET_SELECTED_ADDRESS;
  constructor(public payload: { address: ILocation }) {}
}

export type UserLocationAction = SetSelectedAddress;
