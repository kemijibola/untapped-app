import { switchMap, catchError, map } from 'rxjs/operators/';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';
import * as ProfileTypeActions from './profile.actions';
import { IProfile, IResult } from 'src/app/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as ErrorActions from '../../../store/global/error/error.actions';

@Injectable()
export class ProfileEffect {
  @Effect()
  updateProfile = this.action$
    .pipe(ofType(ProfileTypeActions.UPDATE_PROFILE))
    .switchMap((action: ProfileTypeActions.UpdateProfile) => {
      const { profile } = action.payload;
      return this.profileService.updateProfile(profile);
    })
    .pipe(
      map((res: IResult<IProfile>) => {
        return {
          type: ProfileTypeActions.SET_PROFILE,
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
