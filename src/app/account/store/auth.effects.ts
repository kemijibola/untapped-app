import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { IResult, IRegister, IAuthData, ILogin } from 'src/app/interfaces';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
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
      const newUser: IRegister = {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        roles: action.payload.roles,
        audience: action.payload.audience
      };
      return this.authService.signUp(newUser);
    })
    .pipe(
      map((res: IResult<boolean>) => {
        if (res.data) {
          return {
            type: AuthActions.SIGNUP_SUCCESS
          };
        } else {
          return {
            type: AuthActions.SIGNUP_FAILURE,
            payload: res.error
          };
        }
      }),
      catchError(error =>
        of({
          type: ErrorActions.ERROR_OCCURRED,
          payload: error
        })
      )
    );

  @Effect()
  authSignIn = this.actions$
    .pipe(ofType(AuthActions.DO_SIGNIN))
    .switchMap((action: AuthActions.DoSignIn) => {
      const userLogin: ILogin = {
        email: action.payload.email,
        password: action.payload.password,
        audience: action.payload.audience
      };
      return this.authService.signin(userLogin);
    })
    .pipe(
      mergeMap(res => {
        // call actions set token and signin success
        if (res.isSuccessful) {
          this.localStorage.setItem('authData', res.data);
          this.router.navigate(['/']);
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
            payload: res.error
          }
        ];
      }),
      catchError((error, caught) => {
        this.store.dispatch(new ErrorActions.ExceptionOccurred(error));
        return caught;
      })
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    protected localStorage: LocalStorage,
    private router: Router
  ) {}
}
