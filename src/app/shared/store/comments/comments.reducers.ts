import { OutboundState } from "./../../Util";
import { IComment } from "src/app/interfaces";
import * as CommentsActions from "./comments.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./comments.adapter";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface CommentState extends EntityState<IComment> {
  selectedCommentId: string | number | null;
  fetchCommentStatus: OutboundState | null;
}

const initialState: CommentState = fromAdapter.adapter.getInitialState({
  selectedCommentId: null,
  fetchCommentStatus: OutboundState.initiated,
});

export function reducer(
  state = initialState,
  action: CommentsActions.CommentsActions
): CommentState {
  switch (action.type) {
    case CommentsActions.FETCH_MEDIA_COMMENTS:
      return Object.assign({
        ...state,
        fetchCommentStatus: OutboundState.inprogress,
      });
    case CommentsActions.FETCH_MEDIA_COMMENTS_SUCCESS:
      return Object.assign({
        ...state,
        fetchCommentStatus: OutboundState.completed,
      });
    case CommentsActions.FETCH_MEDIA_COMMENTS_ERROR:
      return Object.assign({
        ...state,
        fetchCommentStatus: OutboundState.failed,
      });
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
    case CommentsActions.REMOVE_COMMENT_LIKE:
      const commentToRemoveLike = { ...action.payload.comment };
      commentToRemoveLike.likedBy = commentToRemoveLike.likedBy.filter(
        (x) => x._id !== action.payload.unLikedBy._id
      );
      return fromAdapter.adapter.upsertOne(commentToRemoveLike, state);
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
    case CommentsActions.SET_MEDIA_COMMENTS:
      return fromAdapter.adapter.setAll(action.payload.mediaComments, state);
    case CommentsActions.ADD_MEDIA_COMMENT_ERROR:
      return fromAdapter.adapter.removeOne(action.payload.key, state);
    default: {
      return state;
    }
  }
}

const getSelectedCommentId = (state: CommentState) => state.selectedCommentId;

export const getCommentState = createFeatureSelector<CommentState>(
  "commentState"
);

const getCommentsCompleted = (state: CommentState): boolean =>
  state.fetchCommentStatus === OutboundState.completed;

const getCommentsInProgress = (state: CommentState): boolean =>
  state.fetchCommentStatus === OutboundState.inprogress;

const getCommentsInitiated = (state: CommentState): boolean =>
  state.fetchCommentStatus === OutboundState.initiated;

const getCommentsFailure = (state: CommentState): boolean =>
  state.fetchCommentStatus === OutboundState.failed;

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

export const selectCommentsInProgressStatus = createSelector(
  getCommentState,
  getCommentsInProgress
);

export const selectCommentsCompletedStatus = createSelector(
  getCommentState,
  getCommentsCompleted
);

export const selectCommentsInitiatedStatus = createSelector(
  getCommentState,
  getCommentsInitiated
);

export const selectCommentsFailedStatus = createSelector(
  getCommentState,
  getCommentsFailure
);

export const commentCount = createSelector(
  getCommentState,
  fromAdapter.commentCount
);

export const selectCurrentCommentId = createSelector(
  getCommentState,
  getSelectedCommentId
);

export const selectCurrentComment = createSelector(
  selectCommentEntities,
  selectCurrentCommentId,
  (commentEntities, commentId) => commentEntities[commentId]
);
