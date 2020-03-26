import { IComment } from "src/app/interfaces";
import * as CommentsActions from "./comments.action";

export interface State {
  talentMediaComments: IComment[];
  talentMediaComment: IComment;
}

const initialState: State = {
  talentMediaComments: [],
  talentMediaComment: {
    media: "",
    comment: ""
  }
};

export function commentsReducer(
  state = initialState,
  action: CommentsActions.CommentsActions
) {
  switch (action.type) {
    case CommentsActions.SET_MEDIA_COMMENTS:
      return {
        ...state,
        talentMediaComments: [...action.payload]
      };
    case CommentsActions.SUCCESS_POST_MEDIA_COMMENT: {
      const existing = [...state.talentMediaComments];
      existing.unshift(action.payload);
      return {
        ...state,
        talentMediaComments: [...existing]
      };
    }
    case CommentsActions.SET_MEDIA_COMMENT:
      return {
        ...state,
        talentMediaComment: { ...action.payload }
      };
    default:
      return state;
  }
}
