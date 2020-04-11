import { IComment } from "src/app/interfaces";
import * as CommentsActions from "./comments.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { AppError } from "src/app/store/global/error/error.reducers";
import * as fromAdapter from "./comments.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CommentState extends EntityState<IComment> {
  selectedCommentId: string | number | null;
  commentError: AppError | null;
}

const initialState: CommentState = fromAdapter.adapter.getInitialState({
  selectedCommentId: null,
  commentError: null,
});

export function reducer(
  state = initialState,
  action: CommentsActions.CommentsActions
): CommentState {
  switch (action.type) {
    case CommentsActions.ADD_MEDIA_COMMENT:
      return fromAdapter.adapter.setOne(action.payload.mediaComment, state);
    case CommentsActions.ADD_COMMENT_LIKE:
      const commentObj = { ...action.payload.comment };
      commentObj.likedBy = [...commentObj.likedBy, action.payload.likedBy];
      return fromAdapter.adapter.upsertOne(commentObj, state);
    case CommentsActions.UPDATE_COMMENT_LIKE:
      return fromAdapter.adapter.upsertOne(action.payload.comment, state);
    case CommentsActions.ADD_COMMENT_LIKE_SUCCESS:
      return fromAdapter.adapter.upsertOne(action.payload.comment, state);
    case CommentsActions.ADD_COMMENT_LIKE_ERROR:
      const commentToUpdate = { ...action.payload.comment };
      commentToUpdate.likedBy = commentToUpdate.likedBy.filter(
        (x) => x._id !== action.payload.likedBy._id
      );
      return fromAdapter.adapter.upsertOne(commentToUpdate, state);
    case CommentsActions.ADD_MEDIA_COMMENT_SUCCESS:
      return fromAdapter.adapter.removeOne(action.payload.key, state);
    case CommentsActions.UPDATE_MEDIA_COMMENT:
      return fromAdapter.adapter.setOne(action.payload.comment, state);
    case CommentsActions.FETCH_MEDIA_COMMENTS_SUCCESS:
      console.log(action.payload.mediaComments);
      return fromAdapter.adapter.setAll(action.payload.mediaComments, state);
    case CommentsActions.ADD_MEDIA_COMMENT_ERROR:
      return fromAdapter.adapter.removeOne(action.payload.key, state);
    case CommentsActions.FETCH_MEDIA_COMMENTS_ERROR:
      return Object.assign({
        ...state,
        commentError: Object.assign({
          errorCode: action.payload.errorCode,
          errorMessage: action.payload.errorMessage,
        }),
      });
    default: {
      return state;
    }
  }
}

const getSelectedCommentId = (state: CommentState) => state.selectedCommentId;

const getCommentError = (state: CommentState) => state.commentError;

export const getCommentState = createFeatureSelector<CommentState>(
  "commentState"
);

export const selectCommentIds = createSelector(
  getCommentState,
  fromAdapter.selectCommentIds
);

export const selectCommentEntities = createSelector(
  getCommentState,
  fromAdapter.selectCommentEntities
);

export const selectAllComments = createSelector(
  getCommentState,
  fromAdapter.selectAllComments
);
export const commentCount = createSelector(
  getCommentState,
  fromAdapter.commentCount
);

export const selectCurrentCommentId = createSelector(
  getCommentState,
  getSelectedCommentId
);

export const selectCommentError = createSelector(
  getCommentState,
  getCommentError
);

export const selectCurrentComment = createSelector(
  selectCommentEntities,
  selectCurrentCommentId,
  (commentEntities, commentId) => commentEntities[commentId]
);
