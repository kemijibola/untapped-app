import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as NewContestActions from "./new-contest.actions";
import { ContestService } from "src/app/services/contest.service";
import {
  map,
  switchMap,
  mergeMap,
  catchError,
  concatMap,
} from "rxjs/operators";
import {
  IResult,
  IUserContest,
  IContest,
  AppNotificationKey,
} from "src/app/interfaces";
import { Router } from "@angular/router";
import { of } from "rxjs";
import * as NotificationActions from "../../../store/global/notification/notification.action";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class NewUserContestEffect {
  @Effect()
  createContest = this.action$.pipe(
    ofType(NewContestActions.CREATE_CONTEST),
    concatMap((action: NewContestActions.CreateContest) =>
      this.contestsService.createContest(action.payload.newContest).pipe(
        mergeMap((resp: IResult<IContest>) => {
          return [
            new NewContestActions.SetContest({
              contest: resp.data,
            }),
            new NotificationActions.AddSuccess({
              key: AppNotificationKey.success,
              code: 200,
              message: "Contest successfully created",
            }),
          ];
        }),
        catchError((respError: HttpErrorResponse) =>
          of(
            new NotificationActions.AddError({
              key: AppNotificationKey.error,
              code: respError.error.response_code || -1,
              message:
                respError.error.response_message || "No Internet connection",
            })
          )
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private router: Router,
    private contestsService: ContestService,
    private store: Store<fromApp.AppState>
  ) {}
}
