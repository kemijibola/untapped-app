import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as AuthActions from "../store/auth.actions";
import { AuthService } from "src/app/services/auth.service";
import { IResult, IRegister, IAuthData, ILogin } from "src/app/interfaces";
import {
  map,
  mergeMap,
  catchError,
  tap,
  switchMap,
  finalize,
  concatMap
} from "rxjs/operators";
import { of, Observable, throwError, empty } from "rxjs";
import { Router } from "@angular/router";
import * as ErrorActions from "../../store/global/error/error.actions";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as GlobalErrorActions from "../../store/global/error/error.actions";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.DO_SIGNUP),
    switchMap((action: AuthActions.DoSignUp) =>
      this.authService
        .signUp({
          fullName: action.payload.registerData.fullName,
          email: action.payload.registerData.email,
          password: action.payload.registerData.password,
          roles: action.payload.registerData.roles
        })
        .pipe(
          map((res: IResult<boolean>) => {
            return {
              type: AuthActions.SIGNUP_SUCCESS
            };
          }),
          catchError(error =>
            of(
              new GlobalErrorActions.AddGlobalError({
                errorMessage: error.response_message,
                errorCode: error.response_code
              })
            )
          )
        )
    )
  );

  @Effect()
  doEmailConfirmation = this.actions$.pipe(
    ofType(AuthActions.DO_EMAIL_CONFIRMATION),
    switchMap((action: AuthActions.DoEmailConfirmation) =>
      this.authService.confirmEmail(action.payload.confirmEmailData).pipe(
        map((resp: IResult<string>) => {
          return {
            type: AuthActions.SUCCESS_EMAIL_CONFIRMATION,
            payload: resp.data
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  @Effect()
  authSignIn = this.actions$.pipe(
    ofType(AuthActions.DO_SIGNIN),
    concatMap((action: AuthActions.DoSignIn) =>
      this.authService
        .signin({
          email: action.payload.loginData.email,
          password: action.payload.loginData.password
        })
        .pipe(
          map((resp: IResult<IAuthData>) => {
            return {
              type: AuthActions.SIGNIN_SUCCESS,
              payload: resp.data
            };
          }),
          catchError(
            (err, caught) =>
              of(
                new AuthActions.SignInFailure({
                  errorMessage: err.error.response_code,
                  errorCode: err.error.response_message
                })
              )

            // catchError(
            //   (httpError: HttpErrorResponse) =>
            //     of(
            //       new GlobalErrorActions.AddGlobalError({
            //         errorMessage: httpError.error.response_code,
            //         errorCode: httpError.error.response_message
            //       })
            //     )
            // )
          )
        )
    )
  );

  @Effect()
  fetchAuthData = this.actions$.pipe(
    ofType(AuthActions.FETCH_AUTHDATA),
    switchMap((action: AuthActions.FetchAuthData) =>
      this.authService.fetchItem("authData").pipe(
        map((resp: IAuthData) => {
          return {
            type: AuthActions.SET_AUTHDATA,
            payload: resp
          };
        }),
        catchError(error =>
          of(
            new GlobalErrorActions.AddGlobalError({
              errorMessage: error.response_message,
              errorCode: error.response_code
            })
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  signupSuccess = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_SUCCESS),
    tap(() => this.router.navigate(["/account/confirm-email"]))
  );

  @Effect({ dispatch: false })
  confirmEmailSuccess = this.actions$.pipe(
    ofType(AuthActions.SUCCESS_EMAIL_CONFIRMATION),
    tap(() => this.router.navigate(["/account/signin"]))
  );

  @Effect({ dispatch: false })
  signInSuccess = this.actions$.pipe(
    ofType(AuthActions.SIGNIN_SUCCESS),
    map((action: AuthActions.SignInSuccess) => {
      const authData: IAuthData = Object.assign(action.payload);
      this.store.dispatch(new AuthActions.SetAuthData({ authData }));
      this.authService.setItem("authData", action.payload);
    }),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  @Effect({ dispatch: false })
  logOut = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    switchMap(() => {
      return this.authService.removeItem("authData");
    }),
    tap((isDeleted: boolean) => {
      if (isDeleted) {
        this.store.dispatch(new AuthActions.DeleteAutData());
        this.router.navigate(["/"]);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}
}
