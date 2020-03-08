import { Action } from "@ngrx/store";
import { IUserImage } from "src/app/interfaces";
import { ImageEditRequest } from "src/app/interfaces/media/image";

export const UPDATE_USER_PROFILEIMAGE = "UPDATE_USER_PROFILEIMAGE";
export const UPDATE_USER_PROFILEIMAGE_SUCCESS =
  "UPDATE_USER_PROFILEIMAGE_SUCCESS";
export const SET_PROFILEIMAGE_PATH = "SET_PROFILEIMAGE_PATH";
export const RESET_PROFILEIMAGE_PATH = "RESET_PROFILEIMAGE_PATH";
export const FETCH_USER_PROFILE_IMAGE = "FETCH_USER_PROFILE_IMAGE";

export class UpdateUserProfileImage implements Action {
  readonly type = UPDATE_USER_PROFILEIMAGE;
  constructor(public payload: { profileImagePath: string }) {}
}

export class UpdateUserProfileImageSuccess implements Action {
  readonly type = UPDATE_USER_PROFILEIMAGE_SUCCESS;
}

export class FetchUserProfileImage implements Action {
  readonly type = FETCH_USER_PROFILE_IMAGE;
  constructor(public payload: { key: string; editParams: ImageEditRequest }) {}
}
export class SetProfileImagePath implements Action {
  readonly type = SET_PROFILEIMAGE_PATH;
  constructor(public payload: IUserImage) {}
}

export class ResetProfileImagePath implements Action {
  readonly type = RESET_PROFILEIMAGE_PATH;
  constructor(public payload: { userImage: IUserImage }) {}
}

export type UserProfileImageActions =
  | SetProfileImagePath
  | ResetProfileImagePath
  | UpdateUserProfileImage
  | FetchUserProfileImage
  | UpdateUserProfileImageSuccess;
