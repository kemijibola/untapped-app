import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as CategoryTypeActions from "./category-type.actions";
import * as fromApp from "../../../store/app.reducers";
import { CategoryTypeService } from "src/app/services/category-type.service";
import { IResult, CategoryType } from "src/app/interfaces";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";

@Injectable()
export class CategoryTypeEffects {
  @Effect()
  fetchCategoryTypes = this.actions$.pipe(
    ofType(CategoryTypeActions.FETCH_CATEGORY_TYPES),
    switchMap((action: CategoryTypeActions.FetchCategoryTypes) =>
      this.categoryTypeService.getCategoryTypes().pipe(
        map((res: IResult<CategoryType[]>) => {
          return {
            type: CategoryTypeActions.SET_CATEGORY_TYPES,
            payload: res.data
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
    private categoryTypeService: CategoryTypeService,
    private store: Store<fromApp.AppState>
  ) {}
}
