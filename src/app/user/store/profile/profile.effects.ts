import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as ProfileActions from "./profile.actions";
import { IProfile, IResult } from "src/app/interfaces";
import { ProfileService } from "src/app/services/profile.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";

@Injectable()
export class ProfileEffect {
  @Effect()
  fetchUserProfile = this.action$.pipe(
    ofType(ProfileActions.FETCH_USERPROFILE),
    switchMap(() =>
      this.profileService.fetchUserProfile().pipe(
        map((resp: IResult<IProfile>) => {
          return {
            type: ProfileActions.SET_USERPROFILE,
            payload: resp.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  @Effect()
  createProfile = this.action$.pipe(
    ofType(ProfileActions.CREATE_USERPROFILE),
    switchMap((action: ProfileActions.CreateUserProfile) =>
      this.profileService.createProfile(action.payload).pipe(
        map((res: IResult<IProfile>) => {
          return {
            type: ProfileActions.SET_USERPROFILE,
            payload: res.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  @Effect()
  updateProfile = this.action$.pipe(
    ofType(ProfileActions.UPDATE_USERPROFILE),
    switchMap((action: ProfileActions.UpdateUserProfile) =>
      this.profileService.updateProfile(action.payload).pipe(
        map((res: IResult<IProfile>) => {
          return {
            type: ProfileActions.SET_USERPROFILE,
            payload: res.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
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
