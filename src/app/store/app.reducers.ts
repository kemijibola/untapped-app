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
import * as fromTalentFilter from "../shared/store/filtered-categories/talent-category.reducers";
import * as fromUserProfileImage from "../shared/store/user-profile-image/user-profile-image.reducers";
import * as fromService from "../shared/store/service/service.reducers";
import * as fromModal from "../shared/store/modals/modals.reducers";
import * as fromError from "./global/error/error.reducers";
import * as fromToggle from "../shared/store/slide-toggle/slide-toggle.reducers";
import * as fromComments from "../shared/store/comments/comments.reducers";
import { EntityState, EntityMap } from "@ngrx/entity";
import { environment } from "src/environments/environment";
import * as fromTalentPorfolio from "../shared/store/talents/talents.reducers";
import * as fromTalentAudioPortfolio from "../shared/store/talents/audio-preview/audio-preview.reducer";
import * as fromTalentVideoPorfolio from "../shared/store/talents/video-preview/video-preview.reducer";
import * as fromTalentImagePorfolio from "../shared/store/talents/image-preview/image-preview.reducer";

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
  talentFilterState: fromTalentFilter.TalentFilterState;
  talentPortfolioState: fromTalentPorfolio.TalentPortfolioState;
  audioPortfolioPreviewState: fromTalentAudioPortfolio.AudioPortfolioPreviewState;
  imagePortfolioPreviewState: fromTalentImagePorfolio.ImagePortfolioPreviewState;
  videoPortfolioPreviewState: fromTalentVideoPorfolio.VideoPortfolioPreviewState;
  commentState: fromComments.CommentState;
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
  talentFilterState: fromTalentFilter.reducer,
  talentPortfolioState: fromTalentPorfolio.reducer,
  audioPortfolioPreviewState: fromTalentAudioPortfolio.reducer,
  imagePortfolioPreviewState: fromTalentImagePorfolio.reducer,
  videoPortfolioPreviewState: fromTalentVideoPorfolio.reducer,
  commentState: fromComments.reducer,
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
