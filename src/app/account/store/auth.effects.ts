import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthEffects {
    @Effect()
    authSignUp: Observable<any> = this.actions$.pipe(
        ofType(AuthActions.DO_SIGNUP)
    );
    constructor(private actions$: Actions) {}
}

