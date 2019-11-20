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
        fullName: action.payload.register.fullName,
        email: action.payload.register.email,
        password: action.payload.register.password,
        roles: action.payload.register.roles,
        audience: action.payload.register.audience,
        confirmationUrl: action.payload.register.confirmationUrl
      };
      return this.authService.signUp(newUser);
    })
    .pipe(
      map((res: IResult<boolean>) => {
        return {
          type: AuthActions.SIGNUP_SUCCESS
        };
      })
    );

  @Effect()
  doEmailConfirmation = this.actions$
    .pipe(ofType(AuthActions.DO_EMAIL_CONFIRMATION))
    .switchMap((action: AuthActions.DoEmailConfirmation) => {
      return this.authService.confirmEmail(action.payload);
    })
    .pipe(
      map((resp: IResult<string>) => {
        return {
          type: AuthActions.SUCCESS_EMAIL_CONFIRMATION,
          payload: resp.data
        };
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
      map((resp: IResult<IAuthData>) => {
        return {
          type: AuthActions.SIGNIN_SUCCESS,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchAuthData = this.actions$
    .pipe(ofType(AuthActions.FETCH_AUTHDATA))
    .switchMap((action: AuthActions.FetchAuthData) => {
      return this.authService.fetchUserAuthData('authData');
    })
    .map((resp: IAuthData) => {
      return {
        type: AuthActions.SET_AUTHDATA,
        payload: resp
      };
    });

  @Effect({ dispatch: false })
  signupSuccess = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_SUCCESS),
    tap(() => this.router.navigate(['/account/confirm-email']))
  );

  @Effect({ dispatch: false })
  confirmEmailSuccess = this.actions$.pipe(
    ofType(AuthActions.SUCCESS_EMAIL_CONFIRMATION),
    tap(() => this.router.navigate(['/account/signin']))
  );

  @Effect({ dispatch: false })
  signInSuccess = this.actions$.pipe(
    ofType(AuthActions.SIGNIN_SUCCESS),
    map((action: AuthActions.SignInSuccess) => {
      action.payload.authenticated = true;
      return action.payload;
    }),
    map((authData: IAuthData) => {
      this.store.dispatch(new AuthActions.SetAuthData(authData));
      this.authService.setItem('authData', authData);
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
        this.store.dispatch(new AuthActions.DeleteAutData());
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
