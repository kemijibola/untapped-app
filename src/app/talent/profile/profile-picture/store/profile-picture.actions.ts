import { Action } from '@ngrx/store';
import { FileModel } from 'src/app/models/shared/file';

export const UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE';
export const GET_PROFILE_IMAGE_SIGNEDURL = 'GET_PROFILE_IMAGE_SIGNEDURL';

export class UpdateProfileImage implements Action {
    readonly type = UPDATE_PROFILE_IMAGE;
    constructor(public payload: { image: string}) {}
}

export class GetProfileImageSignedUrl implements Action {
    readonly type = GET_PROFILE_IMAGE_SIGNEDURL;
    constructor(public payload: { file: FileModel}) {}
}

export type ProfilePictureActions =
UpdateProfileImage | GetProfileImageSignedUrl;
