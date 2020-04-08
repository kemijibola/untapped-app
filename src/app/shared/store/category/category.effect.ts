import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as CategoryActions from "./category.action";
import * as fromApp from "../../../store/app.reducers";
import { CategoryService } from "src/app/services/category.service";
import { of } from "rxjs";
import { IResult, ICategory } from "src/app/interfaces";
import { map, switchMap, catchError, concatMap } from "rxjs/operators";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CategoryEffect {
  fetchCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.FETCH_CATEGORIES),
      concatMap((action: CategoryActions.FetchCategories) =>
        this.categoryService.getCategories().pipe(
          map(
            (resp: IResult<ICategory[]>) =>
              new CategoryActions.FetchCategoriesSuccess({
                categories: resp.data,
              })
          ),
          catchError((respError: HttpErrorResponse) =>
            of(
              new CategoryActions.FetchCategoriesError({
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
    private categoryService: CategoryService,
    private store: Store<fromApp.AppState>
  ) {}
}
