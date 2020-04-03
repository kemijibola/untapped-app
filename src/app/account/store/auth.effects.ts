import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
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
  concatMap,
  take,
  scan
} from "rxjs/operators";
import { of, Observable, throwError, empty, pipe } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import * as ErrorActions from "../../store/global/error/error.actions";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { isAfter, getTime, getDate } from "date-fns";
import * as fromAuthReducer from "./auth.reducers";

@Injectable()
export class AuthEffects {
  authSignUp = createEffect(() =>
    this.actions$.pipe(
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
            catchError((respError: HttpErrorResponse) =>
              of(
                new AuthActions.SignUpFailure({
                  errorCode: respError.error.response_code,
                  errorMessage: !navigator.onLine
                    ? respError.error.response_message
                    : "No internet connection. Please connect to the internet and try again."
                })
              )
            )
          )
      )
    )
  );

  doEmailConfirmation = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.DO_EMAIL_CONFIRMATION),
      switchMap((action: AuthActions.DoEmailConfirmation) =>
        this.authService.confirmEmail(action.payload.confirmEmailData).pipe(
          map((resp: IResult<string>) => {
            return {
              type: AuthActions.SUCCESS_EMAIL_CONFIRMATION,
              payload: resp.data
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new AuthActions.FailureEmailConfirmation({
                errorCode: respError.error.response_message,
                errorMessage: !navigator.onLine
                  ? respError.error.response_message
                  : "No internet connection. Please connect to the internet and try again."
              })
            )
          )
        )
      )
    )
  );

  authSignIn = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.DO_SIGNIN),
      concatMap((action: AuthActions.DoSignIn) =>
        this.authService
          .signin({
            email: action.payload.loginData.email,
            password: action.payload.loginData.password
          })
          .pipe(
            map(
              (resp: IResult<IAuthData>) =>
                new AuthActions.SetAuthData(resp.data)
            ),
            tap(data => this.authService.setItem("userData", data.payload)),
            tap(
              () => this.router.navigate(["/"]),
              catchError((respError: HttpErrorResponse) =>
                of(
                  new AuthActions.SignInFailure({
                    errorCode: respError.error.response_message,
                    errorMessage: !navigator.onLine
                      ? respError.error.response_message
                      : "No internet connection. Please connect to the internet and try again."
                  })
                )
              )
            )
          )
      )
    )
  );

  signupSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_SUCCESS),
      pipe(tap(() => this.router.navigate(["/account/confirm-email"])))
    )
  );

  confirmEmailSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SUCCESS_EMAIL_CONFIRMATION),
      pipe(tap(() => this.router.navigate(["/account/signin"])))
    )
  );

  proceedToRoute = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.PROCEED_TO_ROUTE),
        pipe(
          map((action: AuthActions.ProceedToRoute) => action.payload.routeUrl),
          tap(routeUrl => this.router.navigate([routeUrl]))
        )
      ),
    { dispatch: false }
  );

  tokenExpired = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.CHECK_TOKEN_EXPIRED),
      pipe(
        map(
          (action: AuthActions.CheckTokenExpired) => action.payload.tokenData
        ),
        map(payload => {
          let tokenExpiration =
            payload !== null ? new Date(payload.token_expires).getTime() : 0;
          if (!isAfter(Date.now(), tokenExpiration)) {
            return {
              type: AuthActions.SET_AUTHDATA,
              payload: payload
            };
          }
          // show pop up to
          this.store.dispatch(
            new AuthActions.SignInFailure({
              errorCode: 10,
              errorMessage: "Session expired. Please login to app to continue."
            })
          );

          return {
            type: AuthActions.LOGOUT
          };
        })
      )
    )
  );

  fetchAuthData = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.FETCH_AUTHDATA),
      pipe(
        switchMap(() =>
          this.authService.fetchUserData("userData").pipe(
            map(resp =>
              resp !== null
                ? new AuthActions.CheckTokenExpired({ tokenData: resp })
                : new AuthActions.ProceedToRoute({
                    routeUrl: location.pathname
                  })
            )
          )
        )
      )
    )
  );

  logOut = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      pipe(
        switchMap(() =>
          this.authService.removeItem("userData").pipe(
            map(isDeleted =>
              isDeleted === true
                ? new AuthActions.DeleteAutData()
                : new AuthActions.LogOut()
            ),
            tap(() => this.router.navigate(["/account/signin"]))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}
}
