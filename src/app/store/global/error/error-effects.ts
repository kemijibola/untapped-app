import { Effect, Actions, ofType } from '@ngrx/effects';
import * as ErrorActions from './error.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorEffects {
  @Effect({ dispatch: false })
  onGlobalError = this.actions$
    .pipe(ofType(ErrorActions.EXCEPTION_OCCURED))
    .map((action: ErrorActions.ExceptionOccurred) => {
      if (action.payload['status'] === 0) {
        // TODO:: display snackbar using this action
        console.log('internal server error');
      }
    });

  constructor(private actions$: Actions) {}
}
