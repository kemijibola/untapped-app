import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as UserCategoryActions from "./user-category.action";
import { UserCategoryService } from "src/app/services/user-category.service";
import { map, switchMap, catchError } from "rxjs/operators";
import { IResult, UserFilterCategory } from "src/app/interfaces";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";
import { of } from "rxjs";

@Injectable()
export class UserCategoryEffect {
  @Effect()
  fetchHighestTalents = this.actions$.pipe(
    ofType(UserCategoryActions.FETCH_ALL_TALENT_HIGHEST_COMMENT),
    switchMap((action: UserCategoryActions.FetchAllTalentHighestComment) =>
      this.userCategoryService
        .getAllTalentsByHighestComment(action.payload)
        .pipe(
          map((resp: IResult<UserFilterCategory[]>) => {
            return {
              type: UserCategoryActions.SET_ALL_TALENT_HIGHEST_COMMENT,
              payload: resp.data
            };
          }),
          catchError(error =>
            of(
              new GlobalErrorActions.AddGlobalError({
                errorMessage: error.response_message,
                errorCode: error.response_code
              })
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
