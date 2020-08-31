import { ActionReducerMap, ActionReducer, MetaReducer } from "@ngrx/store";
import * as fromAuthReducer from "../account/store/auth.reducers";
import * as fromAuth from "../account/store/auth.reducers";
import * as fromUser from "../account/store/user/user.reducers";
import * as fromUserType from "../user-type/store/user-type.reducers";
import * as fromUserTypeReducer from "../user-type/store/user-type.reducers";
import * as fromNotification from "../store/global/notification/notification.reducer";
import * as fromUpload from "../shared/store/upload/upload.reducers";
import * as fromTabReducer from "../shared/store/tabs/tabs.reducers";
import * as fromSnackBar from "../shared/notifications/snackbar/snackbar.reducer";
import * as fromCategoryTypeReducer from "../shared/store/category-type/category-type.reducers";
import * as fromCategory from "../shared/store/category/category.reducers";
import * as fromTalentFilter from "../shared/store/filtered-categories/talent-category.reducers";
import * as fromUserImage from "../shared/store/user-image/user-image.reducer";
import * as fromService from "../shared/store/service/service.reducers";
import * as fromModal from "../shared/store/modals/modals.reducers";
import * as fromToggle from "../shared/store/slide-toggle/slide-toggle.reducers";
import * as fromComments from "../shared/store/comments/comments.reducers";
import { environment } from "src/environments/environment.prod";
import * as fromTalentPorfolio from "../shared/store/talents/talents.reducers";
import * as fromTalentAudioPortfolio from "../shared/store/talents/audio-preview/audio-preview.reducer";
import * as fromTalentVideoPorfolio from "../shared/store/talents/video-preview/video-preview.reducer";
import * as fromTalentImagePorfolio from "../shared/store/talents/image-preview/image-preview.reducer";
import * as fromTalentGeneral from "../shared/store/talents/general-preview/general-preview.reducer";
import * as fromOrder from "../shared/store/order/order.reducers";
import * as fromContests from "../contests/store/contests.reducers";
import * as fromContestEntry from "../contests/store/contest-entry/contest-entry.reducer";
import * as fromContest from "../contests/store/contest/contest.reducer";
import * as fromProfessionalFilter from "../shared/store/filtered-categories/professional-category/professional-category.reducer";
import * as fromDashboard from "../shared/store/dashboard/dashboard.reducer";
import * as fromUserFilter from "../shared/store/filtered-categories/user-filter/user-filter.reducer";

export interface AppState {
  authState: fromAuth.AuthState;
  user: fromUser.State;
  userTypeState: fromUserType.UserTypeState;
  uploadState: fromUpload.UploadState;
  tabState: fromTabReducer.TabState;
  userImageState: fromUserImage.UserImageState;
  serviceState: fromService.ServiceState;
  modalState: fromModal.ModalState;
  toggleState: fromToggle.ToggleState;
  categoryTypeState: fromCategoryTypeReducer.CategoryTypeState;
  categoryState: fromCategory.CategoryState;
  talentFilterState: fromTalentFilter.TalentFilterState;
  talentPortfolioState: fromTalentPorfolio.TalentPortfolioState;
  audioPortfolioPreviewState: fromTalentAudioPortfolio.AudioPortfolioPreviewState;
  imagePortfolioPreviewState: fromTalentImagePorfolio.ImagePortfolioPreviewState;
  videoPortfolioPreviewState: fromTalentVideoPorfolio.VideoPortfolioPreviewState;
  generalPreviewState: fromTalentGeneral.GeneralPreviewState;
  commentState: fromComments.CommentState;
  snackBarState: fromSnackBar.SnackBarState;
  notificationState: fromNotification.NotificationState;
  orderState: fromOrder.OrderState;
  contestsState: fromContests.ContestsState;
  contestEntryState: fromContestEntry.ContestEntryState;
  contestState: fromContest.ContestState;
  professionalFilterState: fromProfessionalFilter.ProfessionalFilterState;
  dashboadState: fromDashboard.DashboadState;
  userFilterState: fromUserFilter.UserFilterState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: fromAuthReducer.reducer,
  user: fromUser.userReducers,
  userTypeState: fromUserTypeReducer.reducer,
  uploadState: fromUpload.reducer,
  tabState: fromTabReducer.reducer,
  userImageState: fromUserImage.reducer,
  serviceState: fromService.reducer,
  modalState: fromModal.reducer,
  toggleState: fromToggle.reducer,
  categoryTypeState: fromCategoryTypeReducer.reducer,
  categoryState: fromCategory.reducer,
  talentFilterState: fromTalentFilter.reducer,
  talentPortfolioState: fromTalentPorfolio.reducer,
  audioPortfolioPreviewState: fromTalentAudioPortfolio.reducer,
  imagePortfolioPreviewState: fromTalentImagePorfolio.reducer,
  generalPreviewState: fromTalentGeneral.reducer,
  videoPortfolioPreviewState: fromTalentVideoPorfolio.reducer,
  commentState: fromComments.reducer,
  snackBarState: fromSnackBar.reducer,
  notificationState: fromNotification.reducer,
  orderState: fromOrder.reducer,
  contestsState: fromContests.reducer,
  contestEntryState: fromContestEntry.reducer,
  contestState: fromContest.reducer,
  professionalFilterState: fromProfessionalFilter.reducer,
  dashboadState: fromDashboard.reducer,
  userFilterState: fromUserFilter.reducer,
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
