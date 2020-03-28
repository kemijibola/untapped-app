import { MediaQueryParams, MediaPreview } from "src/app/interfaces";
import { Action } from "@ngrx/store";

export const FETCH_USER_MEDIA_LIST_PREVIEW = "FETCH_USER_MEDIA_LIST_PREVIEW";
export const SET_USER_MEDIA_LIST_PREVIEW = "SET_USER_MEDIA_LIST_PREVIEW";

export class FetchUserMediaListPreview implements Action {
  readonly type = FETCH_USER_MEDIA_LIST_PREVIEW;
  constructor(public payload: MediaQueryParams) {}
}

export class SetUserMediaListPreview implements Action {
  readonly type = SET_USER_MEDIA_LIST_PREVIEW;
  constructor(public payload: MediaPreview[]) {}
}

export type MediaPreviewActions =
  | FetchUserMediaListPreview
  | SetUserMediaListPreview;
