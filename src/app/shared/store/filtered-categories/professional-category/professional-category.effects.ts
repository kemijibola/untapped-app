import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducers";
import * as ProfessionalCategoryActions from "./professional-category.actions";
import { UserCategoryService } from "src/app/services/user-category.service";
import { map, catchError, concatMap } from "rxjs/operators";
import {
  IResult,
  UserFilterCategory,
  AppNotificationKey,
} from "src/app/interfaces";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../../store/global/notification/notification.action";

@Injectable()
export class ProfessionalCategoryEffect {
  fetchHighestTalents = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfessionalCategoryActions.FETCH_ALL_PROFESSIONAL),
      concatMap((action: ProfessionalCategoryActions.FetchAllProfessional) =>
        this.userCategoryService
          .getUserFilterCategoryByReportType(action.payload)
          .pipe(
            map(
              (resp: IResult<UserFilterCategory[]>) =>
                new ProfessionalCategoryActions.FetchAllProfessionalSuccess({
                  professionals: resp.data,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(new NotificationActions.Noop())
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userCategoryService: UserCategoryService,
    private store: Store<fromApp.AppState>
  ) {}
}
