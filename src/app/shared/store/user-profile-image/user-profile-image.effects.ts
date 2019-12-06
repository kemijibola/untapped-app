import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as UserProfileImageActions from "./user-profile-image.actions";
import { map } from "rxjs/operators";
import { IResult, IUser, IUserImage } from "src/app/interfaces";

@Injectable()
export class UserProfileImageEffects {
  @Effect()
  fetchUserProfileImage = this.actions$
    .pipe(ofType(UserProfileImageActions.FETCH_USER_PROFILE_IMAGE))
    .switchMap((action: UserProfileImageActions.FetchUserProfileImage) => {
      const { key, editParams } = action.payload;
      return this.userService.fetchUserProfile(key, editParams);
    })
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
      })
    );

  @Effect()
  updateUserProfileImage = this.actions$
    .pipe(ofType(UserProfileImageActions.UPDATE_USER_PROFILEIMAGE))
    .switchMap((action: UserProfileImageActions.UpdateUserProfileImage) => {
      const { profileImagePath } = action.payload;
      return this.userService.updateUserProfileImage(profileImagePath);
    })
    .pipe(
      map((resp: IResult<IUser>) => {
        return {
          type: UserProfileImageActions.UPDATE_USER_PROFILEIMAGE_SUCCESS,
          payload: true
        };
      })
    );
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}
}
