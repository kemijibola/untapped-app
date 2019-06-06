import { IAppConfigList, IConfig } from './../../../models/shared/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as InitActions from './init.actions';
import { exhaustMap, take, withLatestFrom, filter, catchError, mergeMap } from 'rxjs/operators';
// import { map } from 'rxjs/operator/map';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs-compat/operator/switchMap';
import { pipe, of } from 'rxjs';
import { ErrorEffects } from '../error/error-effects';

@Injectable()
export class InitEffects {
    @Effect()
    init = this.actions$
        .pipe(ofType(InitActions.FETCH_CONFIGS))
        .switchMap(() => {
            console.log('here effects');
            return this.http.get('../../assets/config.json');
        })
        .pipe(
            map((res: string) => {
                console.log('setting in effects');
                return {
                    type: InitActions.SET_BASE_URL,
                    payload: res
                };
            }),
            catchError(error => of(new ErrorEffects(error)))
        );

    constructor(private actions$: Actions, private http: HttpClient) {}
}
