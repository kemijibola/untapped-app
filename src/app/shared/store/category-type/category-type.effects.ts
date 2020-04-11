import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as CategoryTypeActions from "./category-type.actions";
import * as fromApp from "../../../store/app.reducers";
import { CategoryTypeService } from "src/app/services/category-type.service";
import { IResult, CategoryType } from "src/app/interfaces";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CategoryTypeEffects {
  fetchCategoryTypes = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryTypeActions.FETCH_CATEGORY_TYPES),
      switchMap((action: CategoryTypeActions.FetchCategoryTypes) =>
        this.categoryTypeService.getCategoryTypes().pipe(
          map((res: IResult<CategoryType[]>) => {
            return {
              type: CategoryTypeActions.SET_CATEGORY_TYPES,
              payload: res.data,
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new CategoryTypeActions.FetchCategoryTypeError({
                errorCode: respError.error.response_code || -1,
                errorMessage:
                  respError.error.response_message || "No Internet connection",
              })
            )
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
