import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { Result, Register, Error } from 'src/app/models';
import { map,  mergeMap,  catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {  Router } from '@angular/router';
import * as ErrorActions from '../../store/global/error/error.actions';
import 'rxjs/add/operator/do';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

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
            catchError(error => of({
                type: ErrorActions.ERROR_OCCURRED,
                payload: error
            }))
        );

    @Effect({dispatch: false})
    authSignUpSuccess = this.actions$
        .pipe(ofType(AuthActions.SIGNUP_SUCCESS))
        .do(() => {
            this.router.navigate(['/auth/signup-success']);
        });

    @Effect()
    authSignIn = this.actions$
        .pipe(ofType(AuthActions.DO_SIGNIN))
        .switchMap((action: AuthActions.DoSignIn) => {
            const { email, password, audience } = action.payload;
            return this.authService.signin(email, password, audience);
        })
        .pipe(
            mergeMap((res) => {
                // call actions set token and signin success
                if (res.status) {
                    return [
                        {
                            type: AuthActions.SIGNIN_SUCCESS
                        },
                        {
                            type: AuthActions.SET_TOKEN,
                            payload: res.data
                        }
                    ];
                }
                return [
                    {
                        type: ErrorActions.SET_ERROR,
                        payload: res.message
                    }
                ];
            }),
            catchError((error, caught) => {
                this.store.dispatch(new ErrorActions.ExceptionOccurred(error));
                return caught;
            }
        ));

    constructor(private actions$: Actions,
        private authService: AuthService,
        private store: Store<fromApp.AppState>,
        protected localStorage: LocalStorage,
        private router: Router) {}
}

