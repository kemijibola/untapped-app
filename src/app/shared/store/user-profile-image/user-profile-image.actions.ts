import { Action } from '@ngrx/store';
import { IUserImage } from 'src/app/interfaces';

export const SET_PROFILEIMAGE_PATH = 'SET_PROFILEIMAGE_PATH';
export const SET_UPLOADBUTTON = 'SET_UPLOADBUTTON';
export const RESET_PROFILEIMAGE_PATH = 'RESET_PROFILEIMAGE_PATH';
export const RESET_UPLOADBUTTON = 'RESET_UPLOADBUTTON';

export class SetProfileImagePath implements Action {
  readonly type = SET_PROFILEIMAGE_PATH;
  constructor(public payload: IUserImage) {}
}

export class SetUploadButton implements Action {
  readonly type = SET_UPLOADBUTTON;
  constructor(public payload: boolean) {}
}

export class ResetProfileImagePath implements Action {
  readonly type = RESET_PROFILEIMAGE_PATH;
  constructor(public payload: IUserImage) {}
}

export class ResetUploadButton implements Action {
  readonly type = RESET_UPLOADBUTTON;
}

export type UserProfileImageActions =
  | SetProfileImagePath
  | SetUploadButton
  | ResetProfileImagePath
  | ResetUploadButton;
