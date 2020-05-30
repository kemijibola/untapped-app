import { Action } from "@ngrx/store";
import { UserFilterCategory, ReportType } from "src/app/interfaces";

export const FETCH_ALL_TALENT_HIGHEST_COMMENT =
  "FETCH_ALL_TALENT_HIGHEST_COMMENT";
export const FETCH_ALL_TALENT_HIGHEST_COMMENT_SUCCESS =
  "FETCH_ALL_TALENT_HIGHEST_COMMENT_SUCCESS";
export const FETCH_TALENT_WITH_HIGHEST_COMMENT =
  "FETCH_TALENT_WITH_HIGHEST_COMMENT";

export class FetchAllTalentHighestComment implements Action {
  readonly type = FETCH_ALL_TALENT_HIGHEST_COMMENT;
  constructor(public payload: ReportType) {}
}

export class FetchTalentWithHighestComment implements Action {
  readonly type = FETCH_TALENT_WITH_HIGHEST_COMMENT;
  constructor(public payload: { id: string }) {}
}

export class FetchAllTalentHighestCommentSuccess implements Action {
  readonly type = FETCH_ALL_TALENT_HIGHEST_COMMENT_SUCCESS;
  constructor(public payload: { talents: UserFilterCategory[] }) {}
}

export type TalentCategoryActions =
  | FetchAllTalentHighestComment
  | FetchTalentWithHighestComment
  | FetchAllTalentHighestCommentSuccess;
