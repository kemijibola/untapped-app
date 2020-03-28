import { Router } from "@angular/router";
import { Injectable, Injector, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as GlobalErrorActions from "./error.actions";
import { AppError } from "./error.reducers";
import { of } from "rxjs";
import { mergeMap, catchError, switchMap, map } from "rxjs/operators";

@Injectable()
export class ErrorEffects {
  constructor(
    public snackBar: MatSnackBar,
    private action$: Actions,
    private router: Router
  ) {}

  @Effect({ dispatch: false })
  onLoadError$ = this.action$.pipe(
    ofType(GlobalErrorActions.ADD_GLOBAL_ERROR),
    switchMap((error: AppError) => {
      console.log("error sighted", error);
      // ... you can check the payload here to show different messages
      // like if error.statusCode === 501 etc.

      if ([400, 403, 404, 409, 422].includes(error.errorCode)) {
        this.snackBar.open(error.errorMessage, "X", {
          panelClass: ["error-snackbar"],
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 5000
        });
      }
      // if (error.errorCode === 400 || error.errorCode === 403 || error.errorCode === ) {
      //   // this.snackBar.open(error.errorMessage, "Ok", {
      //   //   duration: 2500
      //   // });
      // }

      if (error.errorCode === 500) {
        // navigate to internal server error page
        console.log("internal server error");
      }

      if (error.errorCode === 401) {
        console.log("not logged in");
        return of(() => this.router.navigate(["/account/signin"]));
      }
      // remap to noop Action if no state needs to be updated.
      // or for example on 401 Errors dispach a re-login action etc.
    })
  );
}
