import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CommentsService } from "src/app/services/comments.service";
import * as CommentsAction from "./comments.action";
import { map } from "rxjs/operators";
import { IResult, IComment } from "src/app/interfaces";

@Injectable()
export class CommentsEffects {
  @Effect()
  fetchMediaComments = this.action$
    .pipe(ofType(CommentsAction.FETCH_MEDIA_COMMENTS))
    .switchMap((action: CommentsAction.FetchMediaComments) => {
      return this.commentsService.fetchMediaComments(action.payload);
    })
    .pipe(
      map((resp: IResult<IComment[]>) => {
        return {
          type: CommentsAction.SET_MEDIA_COMMENTS,
          payload: resp.data
        };
      })
    );

  @Effect()
  postMediaComment = this.action$
    .pipe(ofType(CommentsAction.POST_MEDIA_COMMENT))
    .switchMap((action: CommentsAction.PostMediaComment) => {
      return this.commentsService.postMediaComment(action.payload);
    })
    .pipe(
      map((res: IResult<IComment>) => {
        return {
          type: CommentsAction.SUCCESS_POST_MEDIA_COMMENT,
          payload: res.data
        };
      })
    );

  @Effect()
  postCommentReply = this.action$
    .pipe(ofType(CommentsAction.POST_COMMENT_REPLY))
    .switchMap((action: CommentsAction.PostCommentReply) => {
      const { commentId, reply } = action.payload;
      return this.commentsService.postCommentReply(commentId, reply);
    })
    .pipe(
      map((res: IResult<IComment>) => {
        return {
          type: CommentsAction.SET_MEDIA_COMMENT,
          payload: res.data
        };
      })
    );

  @Effect()
  postCommentLike = this.action$
    .pipe(ofType(CommentsAction.POST_COMMENT_LIKE))
    .switchMap((action: CommentsAction.PostCommentLike) => {
      return this.commentsService.postCommentLike(action.payload);
    })
    .pipe(
      map((res: IResult<IComment>) => {
        return {
          type: CommentsAction.SET_MEDIA_COMMENT,
          payload: res.data
        };
      })
    );

  constructor(
    private action$: Actions,
    private commentsService: CommentsService,
    private store: Store<fromApp.AppState>
  ) {}
}
