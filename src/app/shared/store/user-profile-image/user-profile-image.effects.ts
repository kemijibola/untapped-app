import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as UserProfileImageActions from './user-profile-image.actions';
import { map } from 'rxjs/operators';
import { IResult, IUser, IUserImage } from 'src/app/interfaces';

@Injectable()
export class UserProfileImageEffects {
  @Effect()
  updateUserProfileImage = this.actions$
    .pipe(ofType(UserProfileImageActions.UPDATE_USER_PROFILEIMAGE))
    .switchMap((action: UserProfileImageActions.UpdateUserProfileImage) => {
      const { id, profileImagePath } = action.payload;
      return this.userService.updateUserProfileImage(id, profileImagePath);
    })
    .pipe(
      map((resp: IResult<IUser>) => {
        console.log(resp);
        const data: IUserImage = {
          imagePath: resp.data.profileImagePath,
          isDefault: false
        };
        return {
          type: UserProfileImageActions.SET_PROFILEIMAGE_PATH,
          payload: data
        };
      })
    );
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}
}
