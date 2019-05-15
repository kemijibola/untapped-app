import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models';


@Injectable()
export class AuthEffects {
    @Effect()
    findUserByProperty = this.actions$
        .pipe(ofType(AuthActions.FETCH_USER))
        .switchMap((action: AuthActions.FetchUser) => {
            return this.authService.findUserByEmail(action.payload);
        })
        .map((user) => {
            console.log(user);
            return {
                type: AuthActions.SET_EMAIL_AVAILABILITY,
                payload: user
            };
        });

    constructor(private actions$: Actions, private authService: AuthService) {}
}

