import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as NewContestActions from './new-contest.actions';
import { ContestService } from 'src/app/services/contest.service';
import { map, mergeMap } from 'rxjs/operators';
import { IResult, IUserContest, IContest } from 'src/app/interfaces';
import { Router } from '@angular/router';

@Injectable()
export class UserContestEffect {
  @Effect()
  createContest = this.action$
    .pipe(ofType(NewContestActions.CREATE_CONTEST))
    .switchMap((action: NewContestActions.CreateContest) => {
      return this.contestsService.createContest(action.payload);
    })
    .pipe(
      mergeMap((resp: IResult<IContest>) => {
        return [
          {
            type: NewContestActions.SET_CONTEST_SUCCESS
          },
          {
            type: NewContestActions.SET_NEW_CONTEST,
            payload: resp.data
          }
        ];
      })
    );

  @Effect({ dispatch: false })
  createContestSuccess = this.action$
    .pipe(ofType(NewContestActions.SET_CONTEST_SUCCESS))
    .do((action: NewContestActions.SetContestSuccess) => {
      this.router.navigate(['/new-contest/success/overview']);
    });

  constructor(
    private action$: Actions,
    private router: Router,
    private contestsService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
