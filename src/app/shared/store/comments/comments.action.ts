import { Action } from "@ngrx/store";
import { IComment, Reply, LikeViewModel } from "../../../interfaces";

export const FETCH_MEDIA_COMMENTS = "FETCH_MEDIA_COMMENTS";
export const FETCH_MEDIA_COMMENTS_SUCCESS = "FETCH_MEDIA_COMMENTS_SUCCESS";
export const FETCH_MEDIA_COMMENTS_ERROR = "FETCH_MEDIA_COMMENTS_ERROR";

export const ADD_MEDIA_COMMENT = "ADD_MEDIA_COMMENT";
export const ADD_MEDIA_COMMENT_ERROR = "ADD_MEDIA_COMMENT_ERROR";
export const ADD_MEDIA_COMMENT_SUCCESS = "ADD_MEDIA_COMMENT_SUCCESS";
export const UPDATE_MEDIA_COMMENT = "UPDATE_MEDIA_COMMENT";

export const ADD_COMMENT_REPLY = "ADD_COMMENT_REPLY";
export const ADD_COMMENT_REPLY_SUCCESS = "ADD_COMMENT_REPLY_SUCCESS";
export const ADD_COMMENT_REPLY_ERROR = "ADD_COMMENT_REPLY_ERROR";

export const ADD_COMMENT_LIKE = "ADD_COMMENT_LIKE";
export const ADD_COMMENT_LIKE_SUCCESS = "ADD_COMMENT_LIKE_SUCCESS";
export const ADD_COMMENT_LIKE_ERROR = "ADD_COMMENT_LIKE_ERROR";
export const UPDATE_COMMENT_LIKE = "UPDATE_COMMENT_LIKE";

export const REMOVE_COMMENT_LIKE = "REMOVE_COMMENT_LIKE";
export const REMOVE_COMMENT_LIKE_SUCCESS = "REMOVE_COMMENT_LIKE_SUCCESS";
export const REMOVE_COMMENT_LIKE_ERROR = "REMOVE_COMMENT_LIKE_ERROR";
export const UPDATE_REMOVE_COMMENT_LIKE = "UPDATE_REMOVE_COMMENT_LIKE";

export class FetchMediaComments implements Action {
  readonly type = FETCH_MEDIA_COMMENTS;
  constructor(public payload: { mediaId: string }) {}
}

export class FetchMediaCommentsSuccess implements Action {
  readonly type = FETCH_MEDIA_COMMENTS_SUCCESS;
  constructor(public payload: { mediaComments: IComment[] }) {}
}

export class FetchMediaCommentsError implements Action {
  readonly type = FETCH_MEDIA_COMMENTS_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class AddMediaComment implements Action {
  readonly type = ADD_MEDIA_COMMENT;
  constructor(public payload: { mediaComment: IComment }) {}
}

export class AddCommentReply implements Action {
  readonly type = ADD_COMMENT_REPLY;
  constructor(public payload: { reply: Reply; commentId: string }) {}
}

export class AddCommentLike implements Action {
  readonly type = ADD_COMMENT_LIKE;
  constructor(public payload: { comment: IComment; likedBy: LikeViewModel }) {}
}

export class AddCommentLikeSuccess implements Action {
  readonly type = ADD_COMMENT_LIKE_SUCCESS;
  constructor(public payload: { comment: IComment }) {}
}

export class AddCommentLikeError implements Action {
  readonly type = ADD_COMMENT_LIKE_ERROR;
  constructor(
    public payload: {
      comment: IComment;
      likedBy: LikeViewModel;
    }
  ) {}
}

export class RemoveCommentLike implements Action {
  readonly type = REMOVE_COMMENT_LIKE;
  constructor(
    public payload: { comment: IComment; unLikedBy: LikeViewModel }
  ) {}
}

export class RemoveCommentLikeSuccess implements Action {
  readonly type = REMOVE_COMMENT_LIKE_SUCCESS;
  constructor(public payload: { comment: IComment }) {}
}

export class RemoveCommentLikeError implements Action {
  readonly type = REMOVE_COMMENT_LIKE_ERROR;
  constructor(
    public payload: {
      comment: IComment;
      likedBy: LikeViewModel;
    }
  ) {}
}
export class UpdateRemoveCommentLike implements Action {
  readonly type = UPDATE_REMOVE_COMMENT_LIKE;
  constructor(public payload: { comment: IComment }) {}
}

export class AddCommentReplySuccess implements Action {
  readonly type = ADD_COMMENT_REPLY_SUCCESS;
}

export class AddCommentReplyError implements Action {
  readonly type = ADD_COMMENT_REPLY_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class AddMediaCommentSuccess implements Action {
  readonly type = ADD_MEDIA_COMMENT_SUCCESS;
  constructor(public payload: { key: string }) {}
}

export class UpdateMediaComment implements Action {
  readonly type = UPDATE_MEDIA_COMMENT;
  constructor(public payload: { comment: IComment }) {}
}

export class UpdateCommentLike implements Action {
  readonly type = UPDATE_COMMENT_LIKE;
  constructor(public payload: { comment: IComment }) {}
}

export class AddMediaCommentError implements Action {
  readonly type = ADD_MEDIA_COMMENT_ERROR;
  constructor(public payload: { key: string }) {}
}

export type CommentsActions =
  | FetchMediaComments
  | FetchMediaCommentsSuccess
  | FetchMediaCommentsError
  | AddMediaComment
  | AddCommentReply
  | AddCommentLike
  | AddCommentLikeSuccess
  | AddCommentLikeError
  | AddCommentReplySuccess
  | AddCommentReplyError
  | AddMediaCommentSuccess
  | AddMediaCommentError
  | UpdateMediaComment
  | UpdateCommentLike
  | RemoveCommentLike
  | RemoveCommentLikeSuccess
  | RemoveCommentLikeError
  | UpdateRemoveCommentLike;
