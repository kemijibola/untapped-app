import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as SnackBarActions from "./snackbar.action";
import { pipe } from "rxjs";
import { tap, map, delay } from "rxjs/operators";
import { SnackBarData } from "src/app/interfaces";

@Injectable()
export class SnackBarEffect {
  closeSnackBar = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SnackBarActions.SNACKBAR_CLOSE),
        pipe(tap(() => this.matSnackBar.dismiss()))
      ),
    { dispatch: false }
  );

  openSnackBar = createEffect(() =>
    this.actions$.pipe(
      ofType(SnackBarActions.SNACKBAR_OPEN),
      pipe(
        map((action: SnackBarActions.SnackBarOpen) => action.payload),
        map((payload) =>
          this.matSnackBar.open(payload.message, payload.action, payload.config)
        ),
        delay(20000),
        map(() => new SnackBarActions.SnackBarClose())
      )
    )
  );
  constructor(private actions$: Actions, private matSnackBar: MatSnackBar) {}
}
