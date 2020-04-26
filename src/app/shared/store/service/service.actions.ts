import { Action } from "@ngrx/store";
import { IService } from "../../../interfaces";

export const FETCH_SERVICES = "FETCH_SERVICES";
export const FETCH_SERVICE = "FETCH_SERVICE";
export const FETCH_SERVICE_SUCCESS = "FETCH_SERVICE_SUCCESS";

export class FetchServices implements Action {
  readonly type = FETCH_SERVICES;
}

export class FetchService implements Action {
  readonly type = FETCH_SERVICE;
  constructor(public payload: { serviceId: string }) {}
}

export class FetchServiceSuccess implements Action {
  readonly type = FETCH_SERVICE_SUCCESS;
  constructor(public payload: { services: IService[] }) {}
}

export type ServiceActions = FetchServices | FetchService | FetchServiceSuccess;
