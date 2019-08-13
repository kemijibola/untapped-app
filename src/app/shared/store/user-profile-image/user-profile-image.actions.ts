import { Action } from '@ngrx/store';
import { IUserImage } from 'src/app/interfaces';

export const UPDATE_USER_PROFILEIMAGE = 'UPDATE_USER_PROFILEIMAGE';
export const SET_PROFILEIMAGE_PATH = 'SET_PROFILEIMAGE_PATH';
export const RESET_PROFILEIMAGE_PATH = 'RESET_PROFILEIMAGE_PATH';

export class UpdateUserProfileImage implements Action {
  readonly type = UPDATE_USER_PROFILEIMAGE;
  constructor(public payload: { id: string; profileImagePath: string }) {}
}
export class SetProfileImagePath implements Action {
  readonly type = SET_PROFILEIMAGE_PATH;
  constructor(public payload: { userImage: IUserImage }) {}
}

export class ResetProfileImagePath implements Action {
  readonly type = RESET_PROFILEIMAGE_PATH;
  constructor(public payload: { userImage: IUserImage }) {}
}

export type UserProfileImageActions =
  | SetProfileImagePath
  | ResetProfileImagePath
  | UpdateUserProfileImage;
