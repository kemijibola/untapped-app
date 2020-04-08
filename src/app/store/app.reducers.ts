import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import * as fromAuthReducer from "../account/store/auth.reducers";
import * as fromAuth from "../account/store/auth.reducers";
import * as fromUser from "../account/store/user/user.reducers";
import * as fromUserType from "../user-type/store/user-type.reducers";
import * as fromUserTypeReducer from "../user-type/store/user-type.reducers";

import * as fromUpload from "../shared/store/upload/upload.reducers";
import * as fromTabReducer from "../shared/store/tabs/tabs.reducers";
import * as fromSnackBar from "../shared/notifications/snackbar/snackbar.reducer";
import * as fromCategoryTypeReducer from "../shared/store/category-type/category-type.reducers";
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
  uploadState: fromUpload.UploadState;
  tabState: fromTabReducer.TabState;
  userProfileImage: fromUserProfileImage.State;
  service: fromService.State;
  modalState: fromModal.ModalState;
  error: fromError.State;
  toggleState: fromToggle.ToggleState;
  categoryTypeState: fromCategoryTypeReducer.CategoryTypeState;
  categoryState: fromCategory.CategoryState;
  userCategories: fromUserCategory.State;
  talents: fromTalents.State;
  comments: fromComments.State;
  snackBarState: fromSnackBar.SnackBarState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: fromAuthReducer.reducer,
  user: fromUser.userReducers,
  userTypeState: fromUserTypeReducer.reducer,
  uploadState: fromUpload.reducer,
  tabState: fromTabReducer.reducer,
  userProfileImage: fromUserProfileImage.UserProfileImageReducers,
  service: fromService.serviceReducer,
  modalState: fromModal.reducer,
  error: fromError.errorReducer,
  toggleState: fromToggle.reducer,
  categoryTypeState: fromCategoryTypeReducer.reducer,
  categoryState: fromCategory.reducer,
  userCategories: fromUserCategory.UserCategoryReducers,
  talents: fromTalents.talentsReducer,
  comments: fromComments.commentsReducer,
  snackBarState: fromSnackBar.reducer,
};

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
