import { Injectable } from "@angular/core";
import * as ProfileActions from "./profile.actions";
import {
  IProfile,
  IResult,
  AppNotificationKey,
  IUser,
  IAuthData,
} from "src/app/interfaces";
import { ProfileService } from "src/app/services/profile.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { of, pipe } from "rxjs";
import { map, catchError, mergeMap, concatMap } from "rxjs/operators";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import * as AuthActions from "../../../account/store/auth.actions";

@Injectable()
export class ProfileEffect {
  fetchUserProfile = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.FETCH_USERPROFILE),
      concatMap(() =>
        this.profileService.fetchUserProfile().pipe(
          map((resp: IResult<IProfile>) => {
            return {
              type: ProfileActions.SET_USERPROFILE,
              payload: resp.data,
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  createProfile = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.CREATE_USERPROFILE),
      concatMap((action: ProfileActions.CreateUserProfile) =>
        this.profileService.createProfile(action.payload).pipe(
          mergeMap((resp: IResult<IProfile>) => {
            return [
              new ProfileActions.SetUserProfile({ userProfile: resp.data }),
              new NotificationActions.AddSuccess({
                key: AppNotificationKey.success,
                code: 200,
                message: "Profile successfully updated",
              }),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new ProfileActions.CreateUserProfileError()
            )
          )
        )
      )
    )
  );

  updateProfile = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.UPDATE_USERPROFILE),
      concatMap((action: ProfileActions.UpdateUserProfile) =>
        this.profileService.updateProfile(action.payload).pipe(
          mergeMap((resp: IResult<IProfile>) => {
            return [
              new ProfileActions.SetUserProfile({ userProfile: resp.data }),
              new NotificationActions.AddSuccess({
                key: AppNotificationKey.success,
                code: 200,
                message: "Profile successfully updated",
              }),
            ];
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new ProfileActions.UpdateUserProfileError()
            )
          )
        )
      )
    )
  );

  updateUserSettings = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.UPDATE_USER_SETTINGS_PREFERENCE),
      concatMap((action: ProfileActions.UpdateUserSettingsPreference) =>
        this.userService.patchUser(action.payload.userSettings).pipe(
          mergeMap((resp: IResult<IUser>) => [
            new ProfileActions.UpdateUserSettingsPreferenceSuccess({
              userSettings: resp.data,
            }),
            new NotificationActions.AddSuccess({
              key: AppNotificationKey.success,
              code: 200,
              message: "Email settings successfully updated",
            }),
          ]),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  suspendUserAccount = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.SUSPEND_USER_ACCOUNT),
      concatMap((action: ProfileActions.SuspendUserAccount) =>
        this.userService.suspendUserAccount().pipe(
          mergeMap((resp: IResult<boolean>) => [
            new NotificationActions.AddSuccess({
              key: AppNotificationKey.success,
              code: 200,
              message:
                "Your account has been suspended.Sign in to re-activate your account",
            }),
            new AuthActions.LogOut(),
          ]),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  updateUserSettingsInCache = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.UPDATE_USER_SETTINGS_PREFERENCE_SUCCESS),
      pipe(
        concatMap(
          (action: ProfileActions.UpdateUserSettingsPreferenceSuccess) =>
            this.authService.fetchUserData("userData").pipe(
              map((resp: IAuthData) => {
                resp.user_data.email_notification =
                  action.payload.userSettings.emailNotification;
                resp.user_data.tap_notification =
                  action.payload.userSettings.tapNotification;
                resp.user_data.profile_visibility =
                  action.payload.userSettings.profileVisibility;
                this.authService.updateData("userData", resp);
                return {
                  type: AuthActions.SET_AUTHDATA,
                  payload: resp,
                };
              })
            )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private profileService: ProfileService,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}
}
