import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../account/store/auth.reducers';
import * as fromError from './global/error/error.reducers';
import * as fromRole from '../role/store/role.reducers';
import * as fromUpload from '../shared/store/upload/upload.reducers';
import * as fromTab from '../shared/store/tabs/tabs.reducers';
import * as fromUserProfileImage from '../shared/store/user-profile-image/user-profile-image.reducers';

export interface AppState {
  auth: fromAuth.State;
  exception: fromError.State;
  roles: fromRole.State;
  upload: fromUpload.State;
  appTabs: fromTab.State;
  userProfileImage: fromUserProfileImage.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  exception: fromError.errorReducer,
  roles: fromRole.roleReducer,
  upload: fromUpload.UploadReducers,
  appTabs: fromTab.TabsReducers,
  userProfileImage: fromUserProfileImage.UserProfileImageReducers
};
