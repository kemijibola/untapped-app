import * as TalentCategoryActions from "./talent-category.action";
import { UserFilterCategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import * as fromAdapter from "./talent-category.adapter";
import { AppError } from "src/app/store/global/error/error.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TalentFilterState extends EntityState<UserFilterCategory> {
  selectedTalentFilterId: string | number | null;
  talentCategoryError: AppError | null;
}

const initialState: TalentFilterState = fromAdapter.adapter.getInitialState({
  selectedTalentFilterId: null,
  talentCategoryError: null,
});

export function reducer(
  state = initialState,
  action: TalentCategoryActions.TalentCategoryActions
): TalentFilterState {
  switch (action.type) {
    case TalentCategoryActions.FETCH_ALL_TALENT_HIGHEST_COMMENT_SUCCESS:
      return fromAdapter.adapter.setAll(action.payload.talents, state);
    case TalentCategoryActions.FETCH_TALENT_WITH_HIGHEST_COMMENT:
      return Object.assign({
        ...state,
        selectedTalentFilterId: action.payload.id,
      });
    default: {
      return state;
    }
  }
}

export const getselectedTalentWithHighestCommentId = (
  state: TalentFilterState
) => state.selectedTalentFilterId;

const getTalentWithHighestCommentsError = (state: TalentFilterState) =>
  state.talentCategoryError;

export const getTalentWithHighestCommentState = createFeatureSelector<
  TalentFilterState
>("talentFilterState");

export const selectTalentWithHighestCommentIds = createSelector(
  getTalentWithHighestCommentState,
  fromAdapter.selectTalentWithHighestCommentIds
);

export const selectTalentWithHighestCommentEntities = createSelector(
  getTalentWithHighestCommentState,
  fromAdapter.selectTalentWithHighestCommentEntities
);

export const selectTalentWithHighestComments = createSelector(
  getTalentWithHighestCommentState,
  fromAdapter.selectAllTalentWithHighestComments
);
export const talentWithHighestCommentCount = createSelector(
  getTalentWithHighestCommentState,
  fromAdapter.talentWithHighestCommentCount
);

export const selectCurrentTalentWithHighestCommentId = createSelector(
  getTalentWithHighestCommentState,
  getselectedTalentWithHighestCommentId
);

export const selectTalentWithHighestCommentError = createSelector(
  getTalentWithHighestCommentState,
  getTalentWithHighestCommentsError
);
export const selectCurrentTalentWithHighestComment = createSelector(
  selectTalentWithHighestCommentEntities,
  selectCurrentTalentWithHighestCommentId,
  (talentWithHighestCommentEntities, talentWithHighestCommentId) =>
    talentWithHighestCommentEntities[talentWithHighestCommentId]
);
