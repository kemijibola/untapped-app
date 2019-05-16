import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models';


@Injectable()
export class AuthEffects {
    @Effect()
    findUserByProperty = this.actions$
        .pipe(ofType(AuthActions.DO_EMAIL_CHECK))
        .switchMap((action: AuthActions.DoEmailCheck) => {
            return this.authService.findUserByEmail(action.payload);
        })
        .map((user: User) => {
            let canUseEmail = true;
            if (user['data'][0]) {
                canUseEmail = false;
            }
            return {
                type: AuthActions.SET_EMAIL_AVAILABILITY,
                payload: canUseEmail
            };
        });

    constructor(private actions$: Actions, private authService: AuthService) {}
}

