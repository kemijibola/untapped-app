import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../account/store/auth.reducers';
import * as fromUser from '../account/store/user/user.reducers';
import * as fromRole from '../role/store/role.reducers';
import * as fromUpload from '../shared/store/upload/upload.reducers';
import * as fromTab from '../shared/store/tabs/tabs.reducers';
import * as fromUserProfileImage from '../shared/store/user-profile-image/user-profile-image.reducers';
import * as fromService from '../shared/store/service/service.reducers';

export interface AppState {
  auth: fromAuth.State;
  user: fromUser.State;
  roles: fromRole.State;
  upload: fromUpload.State;
  appTabs: fromTab.State;
  userProfileImage: fromUserProfileImage.State;
  service: fromService.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducers,
  roles: fromRole.roleReducer,
  upload: fromUpload.UploadReducers,
  appTabs: fromTab.TabsReducers,
  userProfileImage: fromUserProfileImage.UserProfileImageReducers,
  service: fromService.serviceReducer
};
