import { map } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as UserActions from './user.actions';
import { UserService } from 'src/app/services/user.service';
import { IResult, IUser } from 'src/app/interfaces';

@Injectable()
export class UserEffects {
  @Effect()
  fetchUser = this.actions$
    .pipe(ofType(UserActions.FETCH_USER))
    .switchMap((action: UserActions.FetchUser) => {
      return this.userService.findUserById(action.payload.id);
    })
    .pipe(
      map((resp: IResult<IUser>) => {
        return {
          type: UserActions.SET_USER,
          payload: resp.data
        };
      })
    );
  constructor(private actions$: Actions, private userService: UserService) {}
}
