import { createSelector } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as fromComments from "./comments.reducers";

const talentMediaComments = (state: fromApp.AppState) => state.comments;
const talentMediaComment = (state: fromApp.AppState) => state.comments;

export const selectTalentMediaComments = createSelector(
  talentMediaComments,
  (state: fromComments.State) => state.talentMediaComments
);

export const selectTalentMediaComment = createSelector(
  talentMediaComment,
  (state: fromComments.State) => state.talentMediaComment
);
