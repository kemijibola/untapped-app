import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as UserTypeActions from './user-type.actions';
import { UserTypeService } from '../../services/user-type.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserTypeEffects {
    @Effect()
    userTypeFetch = this.actions$
        .pipe(ofType(UserTypeActions.FETCH_USERTYPES))
        .switchMap((action: UserTypeActions.FetchUserTypes) => {
            return this.userTypeService.getUserTypes();
        })
        .map((userTypes) => {
            return {
                type: UserTypeActions.SET_USERTYPES,
                payload: userTypes
            };
        });

    constructor(private actions$: Actions, private userTypeService: UserTypeService) {}
}


