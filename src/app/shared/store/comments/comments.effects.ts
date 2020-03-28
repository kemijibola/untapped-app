import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CommentsService } from "src/app/services/comments.service";
import * as CommentsAction from "./comments.action";
import { map, switchMap, catchError } from "rxjs/operators";
import { IResult, IComment } from "src/app/interfaces";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";

@Injectable()
export class CommentsEffects {
  @Effect()
  fetchMediaComments = this.action$.pipe(
    ofType(CommentsAction.FETCH_MEDIA_COMMENTS),
    switchMap((action: CommentsAction.FetchMediaComments) =>
      this.commentsService.fetchMediaComments(action.payload.mediaId).pipe(
        map((resp: IResult<IComment[]>) => {
          return {
            type: CommentsAction.SET_MEDIA_COMMENTS,
            payload: resp.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  @Effect()
  postMediaComment = this.action$.pipe(
    ofType(CommentsAction.POST_MEDIA_COMMENT),
    switchMap((action: CommentsAction.PostMediaComment) =>
      this.commentsService.postMediaComment(action.payload).pipe(
        map((res: IResult<IComment>) => {
          return {
            type: CommentsAction.SUCCESS_POST_MEDIA_COMMENT,
            payload: res.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  @Effect()
  postCommentReply = this.action$.pipe(
    ofType(CommentsAction.POST_COMMENT_REPLY),
    switchMap((action: CommentsAction.PostCommentReply) =>
      this.commentsService
        .postCommentReply(action.payload.commentId, action.payload.reply)
        .pipe(
          map((res: IResult<IComment>) => {
            return {
              type: CommentsAction.SET_MEDIA_COMMENT,
              payload: res.data
            };
          }),
          catchError(error =>
            of(
              new GlobalErrorActions.AddGlobalError({
                errorMessage: error.response_message,
                errorCode: error.response_code
              })
            )
          )
        )
    )
  );

  @Effect()
  postCommentLike = this.action$.pipe(
    ofType(CommentsAction.POST_COMMENT_LIKE),
    switchMap((action: CommentsAction.PostCommentLike) =>
      this.commentsService.postCommentLike(action.payload).pipe(
        map((res: IResult<IComment>) => {
          return {
            type: CommentsAction.SET_MEDIA_COMMENT,
            payload: res.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
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
