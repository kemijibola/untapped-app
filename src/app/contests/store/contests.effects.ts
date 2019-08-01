import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as ContestsActions from './contests.action';
import { ContestService } from 'src/app/services/contest.service';
import { map, mergeMap, tap } from 'rxjs/operators';
import {
  IResult,
  IContestList,
  IUserContest,
  IContest
} from 'src/app/interfaces';
import { Router } from '@angular/router';
import { filter } from 'minimatch';

@Injectable()
export class ContestsEffect {
  @Effect()
  fetchAllContests = this.action$
    .pipe(ofType(ContestsActions.FETCH_CONTESTS))
    .switchMap((action: ContestsActions.FetchContests) => {
      return this.contestsService.fetchContests();
    })
    .pipe(
      map((resp: IResult<IContestList[]>) => {
        return {
          type: ContestsActions.SET_CONTESTS,
          data: resp.data
        };
      })
    );

  fetchUserContests = this.action$
    .pipe(ofType(ContestsActions.FETCH_USER_CONTESTS))
    .switchMap((action: ContestsActions.FetchUserContests) => {
      return this.contestsService.fetchUserContests(action.payload);
    })
    .pipe(
      map((resp: IResult<IUserContest[]>) => {
        return {
          type: ContestsActions.SET_USER_CONTESTS,
          payload: resp.data
        };
      })
    );

  fetchContest = this.action$
    .pipe(ofType(ContestsActions.FETCH_CONTEST))
    .switchMap((action: ContestsActions.FetchContest) => {
      return this.contestsService.fetchContest(action.payload);
    })
    .pipe(
      map((resp: IResult<IContest>) => {
        return {
          type: ContestsActions.SET_CONTEST,
          payload: resp.data
        };
      })
    );

  createContest = this.action$
    .pipe(ofType(ContestsActions.CREATE_CONTEST))
    .switchMap((action: ContestsActions.CreateContest) => {
      return this.contestsService.createContest(action.payload);
    })
    .pipe(
      mergeMap((resp: IResult<IContest>) => {
        return [
          {
            type: ContestsActions.CREATE_CONTEST_SUCCESS
          },
          {
            type: ContestsActions.SET_USER_CONTEST,
            payload: resp.data
          }
        ];
      })
    );

  @Effect({ dispatch: false })
  createContestSuccess = this.action$
    .pipe(ofType(ContestsActions.CREATE_CONTEST_SUCCESS))
    .do((action: ContestsActions.CreateContestSuccess) => {
      this.router.navigate(['/new-contest/success/overview']);
    });

  constructor(
    private action$: Actions,
    private router: Router,
    private contestsService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
