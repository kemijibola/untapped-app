import { Effect, Actions, ofType } from '@ngrx/effects';
import * as ErrorActions from './error.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorEffects {

    @Effect()
    onError = this.actions$
        .pipe(
            ofType(ErrorActions.EFFECT_ERROR))
            .switchMap((action: ErrorActions.EffectError) => {
                console.log(action.payload);
            // handle errors here
            // check the payload here to show different messages
            // like if error.statusCode === 501 etc.

            // this.snackBar.open('Error', 'Ok', {
            // duration: 2500
            // });

            // remap to noop Action if no state needs to be updated.
            // or for example on 401 Errors dispach a re-login action etc.

            return of({ type: 'idontknowyet'});
        });

    constructor(private actions$: Actions) {}
}
