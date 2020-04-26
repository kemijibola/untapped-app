import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { CommentsService } from "src/app/services/comments.service";
import * as CommentsAction from "./comments.action";
import {
  map,
  switchMap,
  catchError,
  concatMap,
  mergeMap,
} from "rxjs/operators";
import { IResult, IComment, AppNotificationKey } from "src/app/interfaces";
import { of } from "rxjs";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CommentsEffects {
  fetchMediaComments = createEffect(() =>
    this.action$.pipe(
      ofType(CommentsAction.FETCH_MEDIA_COMMENTS),
      concatMap((action: CommentsAction.FetchMediaComments) =>
        this.commentsService.fetchMediaComments(action.payload.mediaId).pipe(
          map(
            (resp: IResult<IComment[]>) =>
              new CommentsAction.FetchMediaCommentsSuccess({
                mediaComments: resp.data,
              })
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  postMediaComment = createEffect(() =>
    this.action$.pipe(
      ofType(CommentsAction.ADD_MEDIA_COMMENT),
      concatMap((action: CommentsAction.AddMediaComment) =>
        this.commentsService.postMediaComment(action.payload.mediaComment).pipe(
          mergeMap((resp: IResult<IComment>) => {
            return [
              new CommentsAction.AddMediaCommentSuccess({
                key: action.payload.mediaComment._id,
              }),
              new CommentsAction.UpdateMediaComment({ comment: resp.data }),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new CommentsAction.AddMediaCommentError({
                key: action.payload.mediaComment._id,
              })
            )
          )
        )
      )
    )
  );

  postCommentReply = createEffect(() =>
    this.action$.pipe(
      ofType(CommentsAction.ADD_COMMENT_REPLY),
      concatMap((action: CommentsAction.AddCommentReply) =>
        this.commentsService
          .postCommentReply(action.payload.commentId, action.payload.reply)
          .pipe(
            map(() => new CommentsAction.AddCommentReplySuccess()),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                })
              )
            )
          )
      )
    )
  );

  postCommentUnLike = createEffect(() =>
    this.action$.pipe(
      ofType(CommentsAction.REMOVE_COMMENT_LIKE),
      concatMap((action: CommentsAction.RemoveCommentLike) =>
        this.commentsService.postCommentUnLike(action.payload.comment._id).pipe(
          mergeMap((resp: IResult<IComment>) => {
            const commentObj = { ...action.payload.comment };
            commentObj.likedBy = commentObj.likedBy.filter(
              (x) => x._id !== action.payload.unLikedBy._id
            );
            return [
              new CommentsAction.RemoveCommentLikeSuccess({
                comment: commentObj,
              }),
              new CommentsAction.UpdateRemoveCommentLike({
                comment: resp.data,
              }),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new CommentsAction.RemoveCommentLikeError({
                comment: action.payload.comment,
                likedBy: action.payload.unLikedBy,
              })
            )
          )
        )
      )
    )
  );

  postCommentLike = createEffect(() =>
    this.action$.pipe(
      ofType(CommentsAction.ADD_COMMENT_LIKE),
      concatMap((action: CommentsAction.AddCommentLike) =>
        this.commentsService.postCommentLike(action.payload.comment._id).pipe(
          mergeMap((resp: IResult<IComment>) => {
            const commentObj = { ...action.payload.comment };
            commentObj.likedBy = commentObj.likedBy.filter(
              (x) => x._id !== action.payload.likedBy._id
            );
            console.log("removing optimistic update from store", commentObj);
            return [
              new CommentsAction.AddCommentLikeSuccess({
                comment: commentObj,
              }),
              new CommentsAction.UpdateCommentLike({ comment: resp.data }),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new CommentsAction.AddCommentLikeError({
                comment: action.payload.comment,
                likedBy: action.payload.likedBy,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private commentsService: CommentsService,
    private store: Store<fromApp.AppState>
  ) {}
}
