import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as UserProfileImageActions from "./user-profile-image.actions";
import { IResult, IUser, IUserImage } from "src/app/interfaces";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";
import { map, switchMap, catchError, mergeMap } from "rxjs/operators";

@Injectable()
export class UserProfileImageEffects {
  @Effect()
  fetchUserProfileImage = this.actions$.pipe(
    ofType(UserProfileImageActions.FETCH_USER_PROFILE_IMAGE),
    switchMap((action: UserProfileImageActions.FetchUserProfileImage) =>
      this.userService
        .fetchUserProfile(action.payload.key, action.payload.editParams)
        .pipe(
          map((resp: IResult<string>) => {
            console.log(resp);
            const data: IUserImage = {
              imagePath: resp.data,
              isDefault: false
            };
            return {
              type: UserProfileImageActions.SET_PROFILEIMAGE_PATH,
              payload: data
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
  updateUserProfileImage = this.actions$.pipe(
    ofType(UserProfileImageActions.UPDATE_USER_PROFILEIMAGE),
    switchMap((action: UserProfileImageActions.UpdateUserProfileImage) =>
      this.userService
        .updateUserProfileImage(action.payload.profileImagePath)
        .pipe(
          map((resp: IResult<IUser>) => {
            return {
              type: UserProfileImageActions.UPDATE_USER_PROFILEIMAGE_SUCCESS,
              payload: true
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
    private actions$: Actions,
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}
}
