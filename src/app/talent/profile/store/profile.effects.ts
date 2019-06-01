import { switchMap, catchError } from 'rxjs/operators/';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { pipe, of } from 'rxjs';
import * as ProfileTypeActions from './profile.actions';
import { IProfile, Result } from 'src/app/models';
import { EffectError } from 'src/app/store/global/error/error.actions';

@Injectable()
export class ProfileEffect {
    @Effect()
    updateProfile = this.action$
        .pipe(ofType(ProfileTypeActions.UPDATE_PROFILE))
        .switchMap((action: ProfileTypeActions.UpdateProfile) => {
            return 
        })
        .pipe(
            map((res: Result) => {

            }),
            catchError(error => of(new EffectError(error)))
        );

    constructor(private action$: Actions) {}
}
