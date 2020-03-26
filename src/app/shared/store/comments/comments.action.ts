import { Action } from "@ngrx/store";
import { IComment, Reply } from "../../../interfaces";

export const FETCH_MEDIA_COMMENTS = "FETCH_MEDIA_COMMENTS";
export const SET_MEDIA_COMMENTS = "SET_MEDIA_COMMENTS";
export const POST_MEDIA_COMMENT = "POST_MEDIA_COMMENT";
export const SUCCESS_POST_MEDIA_COMMENT = "SUCCESS_POST_MEDIA_COMMENT";
export const POST_COMMENT_REPLY = "POST_COMMENT_REPLY";
export const POST_COMMENT_LIKE = "POST_COMMENT_LIKE";
export const SET_MEDIA_COMMENT = "SET_MEDIA_COMMENT";

export class FetchMediaComments implements Action {
  readonly type = FETCH_MEDIA_COMMENTS;
  constructor(public payload: string) {}
}

export class SuccessPostMediaComment implements Action {
  readonly type = SUCCESS_POST_MEDIA_COMMENT;
  constructor(public payload: IComment) {}
}

export class SetMediaComments implements Action {
  readonly type = SET_MEDIA_COMMENTS;
  constructor(public payload: IComment[]) {}
}

export class PostMediaComment implements Action {
  readonly type = POST_MEDIA_COMMENT;
  constructor(public payload: IComment) {}
}

export class PostCommentReply implements Action {
  readonly type = POST_COMMENT_REPLY;
  constructor(public payload: { reply: Reply; commentId: string }) {}
}

export class SetMediaComment implements Action {
  readonly type = SET_MEDIA_COMMENT;
  constructor(public payload: IComment) {}
}

export class PostCommentLike implements Action {
  readonly type = POST_COMMENT_LIKE;
  constructor(public payload: string) {}
}

export type CommentsActions =
  | FetchMediaComments
  | SetMediaComments
  | PostMediaComment
  | PostCommentReply
  | SetMediaComment
  | SuccessPostMediaComment;
