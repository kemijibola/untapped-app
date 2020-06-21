import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as TalentCategoryActions from "./talent-category.action";
import { UserCategoryService } from "src/app/services/user-category.service";
import { map, catchError, concatMap } from "rxjs/operators";
import {
  IResult,
  UserFilterCategory,
  AppNotificationKey,
} from "src/app/interfaces";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";

@Injectable()
export class UserCategoryEffect {
  fetchHighestTalents = createEffect(() =>
    this.actions$.pipe(
      ofType(TalentCategoryActions.FETCH_ALL_TALENT_HIGHEST_COMMENT),
      concatMap((action: TalentCategoryActions.FetchAllTalentHighestComment) =>
        this.userCategoryService
          .getUserFilterCategoryByReportType(action.payload)
          .pipe(
            map(
              (resp: IResult<UserFilterCategory[]>) =>
                new TalentCategoryActions.FetchAllTalentHighestCommentSuccess({
                  talents: resp.data,
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
