import { Injectable } from "@angular/core";
import * as ProfileActions from "./profile.actions";
import { IProfile, IResult } from "src/app/interfaces";
import { ProfileService } from "src/app/services/profile.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ProfileEffect {
  fetchUserProfile = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActions.FETCH_USERPROFILE),
      switchMap(() =>
        this.profileService.fetchUserProfile().pipe(
          map((resp: IResult<IProfile>) => {
            return {
              type: ProfileActions.SET_USERPROFILE,
              payload: resp.data,
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new ProfileActions.FetchUserProfileError({
                errorCode: respError.error.response_code || -1,
                errorMessage:
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
      switchMap((action: ProfileActions.CreateUserProfile) =>
        this.profileService.createProfile(action.payload).pipe(
          map((res: IResult<IProfile>) => {
            return {
              type: ProfileActions.SET_USERPROFILE,
              payload: res.data,
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new ProfileActions.CreateUserProfileError({
                errorCode: respError.error.response_code || -1,
                errorMessage:
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
      switchMap((action: ProfileActions.UpdateUserProfile) =>
        this.profileService.updateProfile(action.payload).pipe(
          map((res: IResult<IProfile>) => {
            return {
              type: ProfileActions.SET_USERPROFILE,
              payload: res.data,
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new ProfileActions.UpdateUserProfileError({
                errorCode: respError.error.response_code || -1,
                errorMessage:
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
