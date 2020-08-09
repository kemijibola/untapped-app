import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import * as AuthActions from "../store/auth.actions";
import { AuthService } from "src/app/services/auth.service";
import {
  IResult,
  IRegister,
  IAuthData,
  ILogin,
  AppNotificationKey,
} from "src/app/interfaces";
import {
  map,
  mergeMap,
  catchError,
  tap,
  finalize,
  concatMap,
  take,
  scan,
  filter,
} from "rxjs/operators";
import { of, Observable, throwError, empty, pipe, scheduled } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { HttpErrorResponse } from "@angular/common/http";
import { isAfter, getTime, getDate } from "date-fns";
import * as fromAuthReducer from "./auth.reducers";
import * as NotificationActions from "../../store/global/notification/notification.action";

@Injectable()
export class AuthEffects {
  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.DO_SIGNUP),
      concatMap((action: AuthActions.DoSignUp) =>
        this.authService
          .signUp({
            fullName: action.payload.registerData.fullName,
            email: action.payload.registerData.email,
            password: action.payload.registerData.password,
            userType: action.payload.registerData.userType,
          })
          .pipe(
            map((res: IResult<boolean>) => new AuthActions.SignUpSuccess()),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                }),
                new AuthActions.SignUpFailure()
              )
            )
          )
      )
    )
  );

  createNewPassword = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.CREATE_NEW_PASSWORD),
      concatMap((action: AuthActions.CreateNewPassword) =>
        this.authService
          .createNewPassword(action.payload.email, action.payload.newPassword)
          .pipe(
            mergeMap((resp: IResult<string>) => [
              new NotificationActions.AddSuccess({
                key: AppNotificationKey.success,
                code: 200,
                message: "Password reset was successful",
              }),
              new AuthActions.CreateNewPasswordSuccess(),
            ]),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                })
              )
            )
          )
      )
    )
  );

  doPasswordRequest = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.REQUEST_PASSWORD_RESET),
      concatMap((action: AuthActions.RequestPasswordReset) =>
        this.authService
          .requestPasswordReset(
            action.payload.email,
            action.payload.redirectUrl
          )
          .pipe(
            mergeMap((resp: IResult<string>) => [
              new NotificationActions.AddSuccess({
                key: AppNotificationKey.success,
                code: 200,
                message: resp.data,
              }),
              new AuthActions.RequsetPasswordResetSuccess(),
            ]),

            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                }),
                new AuthActions.RequsetPasswordResetFailed()
              )
            )
          )
      )
    )
  );

  doEmailChange = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.CHANGE_EMAIL_ADDRESS),
      concatMap((action: AuthActions.ChangeEmailAddress) =>
        this.authService
          .changeEmailAddress(
            action.payload.newEmail,
            action.payload.emailChangeVerificationUri
          )
          .pipe(
            map(
              (resp: IResult<boolean>) =>
                new NotificationActions.AddSuccess({
                  key: AppNotificationKey.success,
                  code: 200,
                  message: `Verification link has been sent to ${action.payload.newEmail.toLowerCase()}.`,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
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
      concatMap((action: AuthActions.DoEmailConfirmation) =>
        this.authService.confirmEmail(action.payload.confirmEmailData).pipe(
          map(
            (resp: IResult<string>) =>
              new AuthActions.SuccessEmailConfirmation({ response: resp.data })
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  resendConfirmationLink = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.RESEND_CONFIRMATION_MAIL),
      concatMap((action: AuthActions.ResendConfirmationMail) =>
        this.authService.resendVerificationLink(action.payload.email).pipe(
          map(
            (resp: IResult<boolean>) =>
              new AuthActions.ResendConfirmationMailSuccess()
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              }),
              new AuthActions.ResendConfirmationMailFailed()
            )
          )
        )
      )
    )
  );

  doEmailChangeConfirmation = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.VERIFY_EMAIL_CHANGE),
      concatMap((action: AuthActions.VerifyEmailChange) =>
        this.authService
          .confirmEmailChange(action.payload.confirmEmailData)
          .pipe(
            map(
              (resp: IResult<string>) =>
                new AuthActions.VerifyEmailChangeSuccess({
                  changedEmail: action.payload.confirmEmailData.email,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                })
              )
            )
          )
      )
    )
  );

  doResetPasswordConfirmation = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.VERIFY_RESET_PASSWORD),
      concatMap((action: AuthActions.VerifyRestPassword) =>
        this.authService
          .verifyPasswordReset(action.payload.verifyPasswordReq)
          .pipe(
            map(
              (resp: IResult<string>) =>
                new AuthActions.VerifyRestPasswordSuccess({
                  email: action.payload.verifyPasswordReq.email,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
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
            password: action.payload.loginData.password,
          })
          .pipe(
            mergeMap((resp: IResult<IAuthData>) => [
              new AuthActions.SetAuthData(resp.data),
            ]),
            tap((data) => this.authService.setItem("userData", data.payload)),
            tap(() => this.router.navigate(["/"])),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                }),
                new AuthActions.SignInFailure()
                // new NotificationActions.AddSuccess({
                //   key: AppNotificationKey.success,
                //   code: 200,
                //   message: "Show me!",
                // })
              )
            )
          )
      )
    )
  );

  signupSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.SIGNUP_SUCCESS),
        pipe(tap(() => this.router.navigate(["/account/confirm-email"])))
      ),
    { dispatch: false }
  );

  createNewPasswordSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.CREATE_NEW_PASSWORD_SUCCESS),
        pipe(tap(() => this.router.navigate(["/account/login"])))
      ),
    { dispatch: false }
  );

  resetPasswordRequestSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.VERIFY_RESET_PASSWORD_SUCCESS),
        pipe(
          map(
            (action: AuthActions.VerifyRestPasswordSuccess) =>
              action.payload.email
          ),
          tap((email) =>
            this.router.navigate(["/account/new-password/", email])
          )
        )
      ),
    { dispatch: false }
  );

  changeEmailSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.CHANGE_EMAIL_ADDRESS_SUCCESS),
        pipe(tap(() => this.router.navigate(["/account/confirm-email"])))
      ),
    { dispatch: false }
  );

  confirmEmailSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.SUCCESS_EMAIL_CONFIRMATION),
        pipe(tap(() => this.router.navigate(["/account/login"])))
      ),
    { dispatch: false }
  );

  proceedToRoute = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.PROCEED_TO_ROUTE),
        pipe(
          map((action: AuthActions.ProceedToRoute) => action.payload.routeUrl),
          tap((routeUrl) => this.router.navigate([routeUrl]))
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
        map((payload) => {
          let tokenExpiration =
            payload !== null ? new Date(payload.token_expires).getTime() : 0;
          if (!isAfter(Date.now(), tokenExpiration)) {
            return {
              type: AuthActions.SET_AUTHDATA,
              payload: payload,
            };
          }
          // show pop up to
          this.store.dispatch(
            new NotificationActions.AddError({
              key: AppNotificationKey.error,
              code: 400,
              message: "You have been logged out. Please login to continue.",
            })
          );

          return {
            type: AuthActions.LOGOUT,
          };
        })
      )
    )
  );

  verifyEmailChangeSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.VERIFY_EMAIL_CHANGE_SUCCESS),
      pipe(
        concatMap((action: AuthActions.VerifyEmailChangeSuccess) =>
          this.authService.fetchUserData("userData").pipe(
            map((resp) => {
              const newAuthData: IAuthData = resp;
              newAuthData.user_data.email = action.payload.changedEmail;
              this.authService.updateData("userData", newAuthData);
              return {
                type: NotificationActions.ADD_SUCCESS,
                payload: {
                  key: AppNotificationKey.success,
                  code: 200,
                  message: "Email changed successfully",
                },
              };
            })
          )
        )
      )
    )
  );

  fetchAuthData = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.FETCH_AUTHDATA),
      pipe(
        concatMap(() =>
          this.authService.fetchUserData("userData").pipe(
            map((resp) =>
              resp !== null
                ? new AuthActions.CheckTokenExpired({ tokenData: resp })
                : new AuthActions.ProceedToRoute({
                    routeUrl: location.pathname,
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
        concatMap(() =>
          this.authService.removeItem("userData").pipe(
            map((isDeleted) =>
              isDeleted === true
                ? new AuthActions.DeleteAutData()
                : new AuthActions.LogOut()
            ),
            tap(() => this.router.navigate(["/account/login"]))
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
