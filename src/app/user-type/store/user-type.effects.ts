import { mergeMap } from 'rxjs/operators';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as UserTypeActions from './user-type.actions';
import { UserTypeService } from '../../services/user-type.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { UserType } from 'src/app/models';

@Injectable()
export class UserTypeEffects {
    @Effect()
    userTypeFetch = this.actions$
        .pipe(ofType(UserTypeActions.FETCH_USERTYPES))
        .switchMap(() => {
            return this.userTypeService.getUserTypes();
        })
        .pipe(
            mergeMap((userTypes: UserType[]) => {
                let selectedUserType;
                for (const item in userTypes['data']) {
                    if (userTypes['data'][item]['name'] === 'Talent') {
                        selectedUserType = userTypes['data'][item]['_id'];
                    }
                }
                return [
                    {
                        type: UserTypeActions.SET_USERTYPES,
                        payload: userTypes
                    },
                    {
                        type: UserTypeActions.SET_SELECTEDUSERTYPE,
                        payload: selectedUserType
                    }
                ];
            })
        );

    constructor(private actions$: Actions, private userTypeService: UserTypeService) {}
}


