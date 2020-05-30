import { Action } from "@ngrx/store";
import { UserFilterCategory, ReportType } from "src/app/interfaces";

export const FETCH_ALL_PROFESSIONAL = "FETCH_ALL_PROFESSIONAL";
export const FETCH_ALL_PROFESSIONAL_SUCCESS = "FETCH_ALL_PROFESSIONAL_SUCCESS";
export const FETCH_PROFESSIONAL = "FETCH_PROFESSIONAL";

export class FetchAllProfessional implements Action {
  readonly type = FETCH_ALL_PROFESSIONAL;
  constructor(public payload: ReportType) {}
}

export class FetchAllProfessionalSuccess implements Action {
  readonly type = FETCH_ALL_PROFESSIONAL_SUCCESS;
  constructor(public payload: { professionals: UserFilterCategory[] }) {}
}

export class FetchProfessional implements Action {
  readonly type = FETCH_PROFESSIONAL;
  constructor(public payload: { id: string }) {}
}

export type ProfessionalCategoryActions =
  | FetchAllProfessional
  | FetchAllProfessionalSuccess
  | FetchProfessional;
