import { Injectable } from "@angular/core";
import * as ProfileActions from "./profile.actions";
import { IProfile, IResult, AppNotificationKey } from "src/app/interfaces";
import { ProfileService } from "src/app/services/profile.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { of } from "rxjs";
import { map, catchError, mergeMap, concatMap } from "rxjs/operators";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";

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
              })
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
              })
            )
          )
        )
      )
    )
  );
  constructor(
    private action$: Actions,
    private profileService: ProfileService,
    private store: Store<fromApp.AppState>
  ) {}
}
