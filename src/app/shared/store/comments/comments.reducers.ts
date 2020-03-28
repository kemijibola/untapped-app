import { IComment } from "src/app/interfaces";
import * as CommentsActions from "./comments.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<IComment> {
  talentMediaComments: IComment[];
  talentMediaComment: IComment;
}

export const commentAdapter: EntityAdapter<IComment> = createEntityAdapter<
  IComment
>();

const initialState: State = commentAdapter.getInitialState({
  talentMediaComments: [],
  talentMediaComment: {
    media: "",
    comment: ""
  }
});

export function commentsReducer(
  state = initialState,
  action: CommentsActions.CommentsActions
): State {
  switch (action.type) {
    case CommentsActions.SET_MEDIA_COMMENTS:
      return commentAdapter.setAll(action.payload.talentMediaComments, state);
    case CommentsActions.SUCCESS_POST_MEDIA_COMMENT: {
      return commentAdapter.upsertOne(action.payload.talentMediaComment, state);
    }
    default:
      return state;
  }
}
