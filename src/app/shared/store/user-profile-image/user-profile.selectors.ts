import { createSelector } from '@ngrx/store';
import * as fromUserProfileImage from './user-profile-image.reducers';
import * as fromApp from '../../../store/app.reducers';

const userProfileImage = (state: fromApp.AppState) => state.userProfileImage;

export const selectUserProfileImage = createSelector(
  userProfileImage,
  (state: fromUserProfileImage.State) => state.userImage
);
