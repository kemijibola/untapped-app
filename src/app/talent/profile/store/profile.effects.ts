import { switchMap, catchError, map } from 'rxjs/operators/';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';
import * as ProfileTypeActions from './profile.actions';
import { IProfile, Result } from 'src/app/models';
import { ProfileService } from 'src/app/services/profile.service';

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
            map((res: Result) => {
                return {
                    type: ProfileTypeActions.SET_PROFILE,
                    payload: res.data
                };
            })
            // catchError(error => of(new EffectError(error)))
        );

    constructor(private action$: Actions, private profileService: ProfileService) {}
}
