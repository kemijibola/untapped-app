import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import * as fromAuthReducer from "../account/store/auth.reducers";
import * as fromAuth from "../account/store/auth.reducers";
import * as fromUser from "../account/store/user/user.reducers";
import * as fromUserType from "../user-type/store/user-type.reducers";
import * as fromUserTypeReducer from "../user-type/store/user-type.reducers";

import * as fromUpload from "../shared/store/upload/upload.reducers";
import * as fromTab from "../shared/store/tabs/tabs.reducers";
import * as fromSnackBar from "../shared/notifications/snackbar/snackbar.reducer";
import * as fromCategoryType from "../shared/store/category-type/category-type.reducers";
import * as fromCategory from "../shared/store/category/category.reducers";
import * as fromUserCategory from "../shared/store/filtered-categories/user-category.reducers";
import * as fromUserProfileImage from "../shared/store/user-profile-image/user-profile-image.reducers";
import * as fromService from "../shared/store/service/service.reducers";
import * as fromModal from "../shared/store/modals/modals.reducers";
import * as fromError from "./global/error/error.reducers";
import * as fromToggle from "../shared/store/slide-toggle/slide-toggle.reducers";
import * as fromTalents from "../shared/store/talents/talents.reducers";
import * as fromComments from "../shared/store/comments/comments.reducers";
import { EntityState, EntityMap } from "@ngrx/entity";
import { environment } from "src/environments/environment";

export interface AppState {
  authState: fromAuth.AuthState;
  user: fromUser.State;
  userTypeState: fromUserType.UserTypeState;
  upload: fromUpload.State;
  appTabs: fromTab.State;
  userProfileImage: fromUserProfileImage.State;
  service: fromService.State;
  modals: fromModal.State;
  error: fromError.State;
  toggles: fromToggle.State;
  categoryTypes: fromCategoryType.State;
  categories: fromCategory.State;
  userCategories: fromUserCategory.State;
  talents: fromTalents.State;
  comments: fromComments.State;
  snackBarState: fromSnackBar.SnackBarState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: fromAuthReducer.reducer,
  user: fromUser.userReducers,
  userTypeState: fromUserTypeReducer.reducer,
  upload: fromUpload.UploadReducers,
  appTabs: fromTab.TabsReducers,
  userProfileImage: fromUserProfileImage.UserProfileImageReducers,
  service: fromService.serviceReducer,
  modals: fromModal.ModalsReducer,
  error: fromError.errorReducer,
  toggles: fromToggle.SlideToggleReducers,
  categoryTypes: fromCategoryType.CategoryTypeReducers,
  categories: fromCategory.CategoryReducers,
  userCategories: fromUserCategory.UserCategoryReducers,
  talents: fromTalents.talentsReducer,
  comments: fromComments.commentsReducer,
  snackBarState: fromSnackBar.reducer
};

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
