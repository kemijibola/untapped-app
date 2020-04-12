import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import * as fromApp from "../../../store/app.reducers";
import { UserService } from "src/app/services/user.service";
import * as UserImageActions from "./user-image.action";
import { concatMap, switchMap, tap, map, catchError } from "rxjs/operators";
import {
  IResult,
  IAuthData,
  CacheKeyValue,
  IUser,
  AppNotificationKey,
} from "src/app/interfaces";
import * as AuthActions from "../../../account/store/auth.actions";
import { AuthService } from "src/app/services/auth.service";
import { pipe, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";

@Injectable()
export class UserImageEffect {
  updateUserProfileImage = createEffect(() =>
    this.actions$.pipe(
      ofType(UserImageActions.UPDATE_USER_PROFILE_IMAGE),
      concatMap((action: UserImageActions.UpdateUserProfileImage) =>
        this.userService.updateUserProfileImage(action.payload.imageKey).pipe(
          map(
            (resp: IResult<IUser>) =>
              new UserImageActions.UpdateProfileImageInCache({
                value: resp.data.profileImagePath,
              })
          ),
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

  updateUserBannerImage = createEffect(() =>
    this.actions$.pipe(
      ofType(UserImageActions.UPDATE_USER_BANNER_IMAGE),
      concatMap((action: UserImageActions.UpdateUserBannerImage) =>
        this.userService.updateUserBannerImage(action.payload.imageKey).pipe(
          map(
            (resp: IResult<IUser>) =>
              new UserImageActions.UpdateBannerImageInCache({
                value: resp.data.bannerImagePath,
              })
          ),
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

  updateProfileImage = createEffect(() =>
    this.actions$.pipe(
      ofType(UserImageActions.UPDATE_PROFILE_IMAGE_IN_CACHE),
      pipe(
        concatMap((action: UserImageActions.UpdateProfileImageInCache) =>
          this.authService.fetchUserData("userData").pipe(
            map((resp: IAuthData) => {
              resp.user_data.profile_image_path = action.payload.value;
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

  updateBannerImage = createEffect(() =>
    this.actions$.pipe(
      ofType(UserImageActions.UPDATE_BANNER_IMAGE_IN_CACHE),
      pipe(
        concatMap((action: UserImageActions.UpdateBannerImageInCache) =>
          this.authService.fetchUserData("userData").pipe(
            map((resp: IAuthData) => {
              resp.user_data.banner_image_path = action.payload.value;
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
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}
}
