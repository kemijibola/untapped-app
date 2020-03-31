import { Action } from "@ngrx/store";
import { SnackBarData } from "src/app/interfaces";

export const SNACKBAR_OPEN = "SNACKBAR_OPEN";
export const SNACKBAR_CLOSE = "SNACKBAR_CLOSE";

export class SnackBarOpen implements Action {
  readonly type = SNACKBAR_OPEN;
  constructor(public payload: { params: SnackBarData }) {}
}

export class SnackBarClose implements Action {
  readonly type = SNACKBAR_CLOSE;
}

export type SnackBarActions = SnackBarOpen | SnackBarClose;
