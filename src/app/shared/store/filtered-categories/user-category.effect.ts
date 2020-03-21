import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as UserCategoryActions from "./user-category.action";
import { UserCategoryService } from "src/app/services/user-category.service";
import { map } from "rxjs/operators";
import { IResult, UserFilterCategory } from "src/app/interfaces";

@Injectable()
export class UserCategoryEffect {
  @Effect()
  fetchHighestTalents = this.actions$
    .pipe(ofType(UserCategoryActions.FETCH_ALL_TALENT_HIGHEST_COMMENT))
    .switchMap((action: UserCategoryActions.FetchAllTalentHighestComment) => {
      return this.userCategoryService.getAllTalentsByHighestComment(
        action.payload
      );
    })
    .pipe(
      map((resp: IResult<UserFilterCategory[]>) => {
        return {
          type: UserCategoryActions.SET_ALL_TALENT_HIGHEST_COMMENT,
          payload: resp.data
        };
      })
    );

  constructor(
    private actions$: Actions,
    private userCategoryService: UserCategoryService,
    private store: Store<fromApp.AppState>
  ) {}
}
