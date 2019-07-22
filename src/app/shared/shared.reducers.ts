import { ActionReducerMap } from '@ngrx/store';
import * as fromTab from './store/tabs/tabs.reducers';
import * as fromUpload from './store/upload/upload.reducers';
import * as fromUserProfileImage from './store/user-profile-image/user-profile-image.reducers';

export interface SharedState {
  tabs: fromTab.State;
  upload: fromUpload.State;
  userProfileImage: fromUserProfileImage.State;
}

export const sharedReducers: ActionReducerMap<SharedState> = {
  tabs: fromTab.TabsReducers,
  upload: fromUpload.UploadReducers,
  userProfileImage: fromUserProfileImage.UserProfileImageReducers
};
