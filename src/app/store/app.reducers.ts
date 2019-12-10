import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "../account/store/auth.reducers";
import * as fromUser from "../account/store/user/user.reducers";
import * as fromUserType from "../user-type/store/user-type.reducers";
import * as fromUpload from "../shared/store/upload/upload.reducers";
import * as fromTab from "../shared/store/tabs/tabs.reducers";
import * as fromCategoryType from "../shared/store/category-type/category-type.reducers";
import * as fromUserProfileImage from "../shared/store/user-profile-image/user-profile-image.reducers";
import * as fromService from "../shared/store/service/service.reducers";
import * as fromModal from "../shared/store/modals/modals.reducers";
import * as fromError from "./global/error/error.reducers";
import * as fromToggle from "../shared/store/slide-toggle/slide-toggle.reducers";

export interface AppState {
  auth: fromAuth.State;
  user: fromUser.State;
  userTypes: fromUserType.State;
  upload: fromUpload.State;
  appTabs: fromTab.State;
  userProfileImage: fromUserProfileImage.State;
  service: fromService.State;
  modals: fromModal.State;
  error: fromError.State;
  toggles: fromToggle.State;
  categories: fromCategoryType.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducers,
  userTypes: fromUserType.userTypeReducer,
  upload: fromUpload.UploadReducers,
  appTabs: fromTab.TabsReducers,
  userProfileImage: fromUserProfileImage.UserProfileImageReducers,
  service: fromService.serviceReducer,
  modals: fromModal.ModalsReducer,
  error: fromError.errorReducer,
  toggles: fromToggle.SlideToggleReducers,
  categories: fromCategoryType.CategoryTypeReducers
};
