import { Action } from "@ngrx/store";
import { IAuthData, UserImage, CacheKeyValue } from "src/app/interfaces";

export const UPDATE_USER_PROFILE_IMAGE = "UPDATE_USER_PROFILE_IMAGE";
export const UPDATE_USER_PROFILE_IMAGE_ERROR =
  "UPDATE_USER_PROFILE_IMAGE_ERROR";

export const UPDATE_USER_BANNER_IMAGE = "UPDATE_USER_BANNER_IMAGE";
export const UPDATE_USER_BANNER_IMAGE_ERROR = "UPDATE_USER_BANNER_IMAGE_ERROR";

export const UPDATE_PROFILE_IMAGE_IN_CACHE = "UPDATE_PROFILE_IMAGE_IN_CACHE";
export const UPDATE_BANNER_IMAGE_IN_CACHE = "UPDATE_BANNER_IMAGE_IN_CACHE";

export class UpdateUserBannerImage implements Action {
  readonly type = UPDATE_USER_BANNER_IMAGE;
  constructor(public payload: { imageKey: string }) {}
}

export class UpdateProfileImageInCache implements Action {
  readonly type = UPDATE_PROFILE_IMAGE_IN_CACHE;
  constructor(public payload: { value: string }) {}
}

export class UpdateBannerImageInCache implements Action {
  readonly type = UPDATE_BANNER_IMAGE_IN_CACHE;
  constructor(public payload: { value: string }) {}
}

export class UpdateUserProfileImage implements Action {
  readonly type = UPDATE_USER_PROFILE_IMAGE;
  constructor(public payload: { imageKey: string }) {}
}

export class UpdateUserBannerImageError implements Action {
  readonly type = UPDATE_USER_BANNER_IMAGE_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export class UpdateUserProfileImageError implements Action {
  readonly type = UPDATE_USER_PROFILE_IMAGE_ERROR;
  constructor(public payload: { errorCode: number; errorMessage: string }) {}
}

export type UserImageActions =
  | UpdateUserProfileImage
  | UpdateUserProfileImageError
  | UpdateUserBannerImage
  | UpdateUserBannerImageError
  | UpdateProfileImageInCache
  | UpdateBannerImageInCache;
