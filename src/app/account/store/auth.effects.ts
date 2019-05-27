import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';

import { AuthService } from 'src/app/services/auth.service';
import { User, Result, Register, Error } from 'src/app/models';
import { map, filter, mergeMap, tap, catchError } from 'rxjs/operators';
import { Observable, pipe, of } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectError } from 'src/app/store/global/error/error.actions';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignUp = this.actions$
        .pipe(ofType(AuthActions.DO_SIGNUP))
        .switchMap((action: AuthActions.DoSignUp) => {
            const { name, email, password, user_type, audience } = action.payload;
            return this.authService.signUp(name, email, password, user_type, audience);
        })
        .pipe(
            map((res: Result) => {
                if (res.status) {
                    return {
                        type: AuthActions.SIGNUP_SUCCESS
                    };
                }
            }),
            catchError(error => of(new EffectError(error)))
        );

    @Effect({dispatch: false})
    authSignUpSuccess = this.actions$
        .pipe(ofType(AuthActions.SIGNUP_SUCCESS))
        .do(() => {
            this.router.navigate(['/auth/signup-success']);
        });

    constructor(private actions$: Actions,
        private authService: AuthService,
        protected localStorage: LocalStorage,
        private router: Router) {}
}

