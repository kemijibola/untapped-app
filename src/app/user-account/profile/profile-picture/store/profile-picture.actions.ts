import { Action } from '@ngrx/store';
import { IFileModel } from 'src/app/interfaces';

export const UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE';
export const GET_PROFILE_IMAGE_SIGNEDURL = 'GET_PROFILE_IMAGE_SIGNEDURL';

export class UpdateProfileImage implements Action {
  readonly type = UPDATE_PROFILE_IMAGE;
  constructor(public payload: { image: string }) {}
}

export class GetProfileImageSignedUrl implements Action {
  readonly type = GET_PROFILE_IMAGE_SIGNEDURL;
  constructor(public payload: { file: IFileModel }) {}
}

export type ProfilePictureActions =
  | UpdateProfileImage
  | GetProfileImageSignedUrl;
