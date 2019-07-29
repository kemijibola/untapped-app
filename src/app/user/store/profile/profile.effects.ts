import { catchError, map } from 'rxjs/operators/';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as ProfileActions from './profile.actions';
import { IProfile, IResult } from 'src/app/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as ErrorActions from '../../../store/global/error/error.actions';

@Injectable()
export class ProfileEffect {
  @Effect()
  fetchUserProfile = this.action$
    .pipe(ofType(ProfileActions.FETCH_USERPROFILE))
    .switchMap(() => {
      return this.profileService.fetchUserProfile();
    })
    .pipe(
      map((resp: IResult<IProfile>) => {
        return {
          type: ProfileActions.SET_USERPROFILE,
          payload: resp.data
        };
      })
    );

  @Effect()
  updateProfile = this.action$
    .pipe(ofType(ProfileActions.UPDATE_USERPROFILE))
    .switchMap((action: ProfileActions.UpdateUserProfile) => {
      return this.profileService.updateProfile(action.payload);
    })
    .pipe(
      map((res: IResult<IProfile>) => {
        return {
          type: ProfileActions.SET_USERPROFILE,
          payload: res.data
        };
      }),
      catchError((error, caught) => {
        this.store.dispatch(new ErrorActions.ExceptionOccurred(error));
        return caught;
      })
    );
  constructor(
    private action$: Actions,
    private profileService: ProfileService,
    private store: Store<fromApp.AppState>
  ) {}
}
