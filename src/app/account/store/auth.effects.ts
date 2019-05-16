import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';

import { AuthService } from 'src/app/services/auth.service';
import { User, Result } from 'src/app/models';
import { map, filter } from 'rxjs/operators';


@Injectable()
export class AuthEffects {
    @Effect()
        @Effect()
        loadUser$ = this.actions$
            .pipe(ofType(AuthActions.FETCH_USER_BY_EMAIL))
            .switchMap((action: AuthActions.FetchUserByEmail) =>
                this.authService.findUserByEmail(action.payload)
                    .pipe(map(user => new AuthActions.SetEmailAvailability(user['data'][0] === undefined ? true : false))
            ));

    constructor(private actions$: Actions, private authService: AuthService) {}
}

