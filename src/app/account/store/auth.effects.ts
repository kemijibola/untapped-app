import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { IResult, IRegister, IAuthData, ILogin } from 'src/app/interfaces';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
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
        username: action.payload.register.username,
        email: action.payload.register.email,
        password: action.payload.register.password,
        roles: action.payload.register.roles,
        audience: action.payload.register.audience
      };
      return this.authService.signUp(newUser);
    })
    .pipe(
      map((res: IResult<boolean>) => {
        if (res.error) {
          return {
            type: AuthActions.SIGNIN_FAILURE,
            payload: res.error
          };
        }
        return {
          type: AuthActions.SIGNUP_SUCCESS
        };
      }),
      catchError(error => {
        return of({
          type: ErrorActions.EXCEPTION_OCCURED,
          payload: error
        });
      })
    );

  @Effect()
  authSignIn = this.actions$
    .pipe(ofType(AuthActions.DO_SIGNIN))
    .switchMap((action: AuthActions.DoSignIn) => {
      const { email, password, audience } = action.payload.loginParam;
      return this.authService.signin({ email, password, audience });
    })
    .pipe(
      mergeMap((resp: IResult<IAuthData>) => {
        if (!resp.error) {
          return [
            {
              type: AuthActions.SIGNIN_SUCCESS,
              payload: resp.data
            },
            {
              type: AuthActions.FETCH_AUTHDATA
            }
          ];
        }
        return [
          {
            type: AuthActions.SIGNIN_FAILURE,
            payload: resp.error
          }
        ];
      }),
      catchError((error, caught) => {
        this.store.dispatch(new ErrorActions.ExceptionOccurred(error));
        return caught;
      })
    );

  @Effect()
  fetchAuthData = this.actions$
    .pipe(ofType(AuthActions.FETCH_AUTHDATA))
    .switchMap((action: AuthActions.FetchAuthData) => {
      return this.authService.fetchUserAuthData('authData');
    })
    .map((resp: IAuthData) => {
      if (resp !== null) {
        return {
          type: AuthActions.SET_AUTHDATA,
          payload: resp
        };
      } else {
        const defaultUserData: IAuthData = {
          _id: '',
          token: '',
          email: '',
          fullName: '',
          roles: [],
          authenticated: false
        };
        return {
          type: AuthActions.SET_AUTHDATA,
          payload: defaultUserData
        };
      }
    });

  @Effect({ dispatch: false })
  signInSuccess = this.actions$.pipe(
    ofType(AuthActions.SIGNIN_SUCCESS),
    map((action: AuthActions.SignInSuccess) => {
      action.payload.authenticated = true;
      return action.payload;
    }),
    map((authData: IAuthData) => {
      return this.authService.setItem('authData', authData);
    }),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  // @Effect()
  // signInSuccess = this.actions$.pipe(ofType(AuthActions.SIGNIN_SUCCESS)).pipe(
  //   map((action: AuthActions.SignInSuccess) => {
  //     action.payload.authenticated = true;
  //     return action.payload;
  //   }),
  //   tap((authData: IAuthData) => {
  //     this.localStorage.setItem('authData', authData);
  //     this.router.navigate(['/']);
  //   })
  // );

  @Effect({ dispatch: false })
  logOut = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    switchMap(() => {
      return this.authService.removeUserAuthData('authData');
    }),
    tap((isDeleted: boolean) => {
      if (isDeleted) {
        this.router.navigate(['/']);
      }
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
