import { Effect, Actions, ofType } from '@ngrx/effects';
import * as ErrorActions from './error.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMap, map, concatMap, mapTo } from 'rxjs/operators';
import { STATUSCODE} from '../../../lib/constants';
import * as fromError from './error.reducers';

@Injectable()
export class ErrorEffects {
    @Effect()
    onGlobalError = this.actions$
        .pipe(ofType(ErrorActions.EXCEPTION_OCCURRED))
        .switchMap((error) => {
            return of({
                type: ErrorActions.SET_EXCEPTION,
                payload: error
            });
        });
    constructor(private actions$: Actions) {}
}
