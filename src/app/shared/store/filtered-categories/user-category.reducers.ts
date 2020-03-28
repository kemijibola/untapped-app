import * as UserCategoryActions from "./user-category.action";
import { UserFilterCategory } from "src/app/interfaces";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<UserFilterCategory> {
  talents: UserFilterCategory[];
  selectedTalent: UserFilterCategory;
}

export const talentFilterAdapter: EntityAdapter<UserFilterCategory> = createEntityAdapter<
  UserFilterCategory
>();

const initialState: State = talentFilterAdapter.getInitialState({
  talents: [],
  selectedTalent: Object.assign({})
});

export function UserCategoryReducers(
  state = initialState,
  action: UserCategoryActions.UserCategoryActions
) {
  switch (action.type) {
    case UserCategoryActions.SET_ALL_TALENT_HIGHEST_COMMENT:
      return talentFilterAdapter.setAll(action.payload.talents, state);
    case UserCategoryActions.SET_SELECTED_USER:
      return talentFilterAdapter.setOne(action.payload.selectedTalent, state);
    default:
      return state;
  }
}
