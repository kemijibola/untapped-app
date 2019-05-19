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


@Injectable()
export class AuthEffects {
    // @Effect()
    // loadUser$ = this.actions$
    //     .pipe(ofType(AuthActions.FETCH_USER_BY_EMAIL))
    //     .switchMap((action: AuthActions.FetchUserByEmail) =>
    //         this.authService.findUserByEmail(action.payload.email)
    //             .pipe(map(user => new AuthActions.SetEmailAvailability(user['data'][0] === undefined ?
    //             { emailExist: true } : { emailExist: false }))
    //     ));

    @Effect()
    authSignUp = this.actions$
        .pipe(ofType(AuthActions.DO_SIGNUP))
        .switchMap((action: AuthActions.DoSignUp) => {
            const { name, email, password, user_type, audience } = action.payload;
            return this.authService.signUp(name, email, password, user_type, audience);
        })
        .pipe(
            mergeMap((res: Result) => {
                const resp = {
                    token: res['data']['token'],
                    id: res['data']['user'],
                    user_type: res['data']['user_type']
                };
                return [
                    {
                        type: AuthActions.SIGNUP_SUCCESS
                    },
                    {
                        type: AuthActions.SET_TOKEN,
                        payload: resp
                    }
                ];
            }),
            catchError(error => of(new EffectError(error)))
        );

    @Effect({ dispatch: false })
    authSignUpSuccess = this.actions$
        .pipe(
            ofType(AuthActions.SET_TOKEN),
            tap((user) => {
                this.localStorage.setItem('userData', user['payload']);
                // i need user-type to decide where to navigate to on signup
                // talent => complete profile
                // audience | professional => home page '/'
                if (user['payload']['user_type'] === 'Talent') {
                    this.router.navigateByUrl('/complete-profile');
                } else {
                    this.router.navigateByUrl('/');
                }
            })
        );

    // @Effect({ dispatch: false })
    // SignUpFailure: Observable<any> = this.actions$
    // .pipe(
    //     ofType(AuthActions.SIGNUP_FAILURE),
    //     map(action => {
    //         return {
    //             type: AuthActions.SIGNUP_FAILURE,
    //             payload: action.payload.
    //         };
    //     })
    // );
    constructor(private actions$: Actions,
        private authService: AuthService,
        protected localStorage: LocalStorage,
        private router: Router) {}
}

