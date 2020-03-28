import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as CategoryActions from "./category.action";
import * as fromApp from "../../../store/app.reducers";
import { CategoryService } from "src/app/services/category.service";
import { of } from "rxjs";
import { IResult, ICategory } from "src/app/interfaces";
import { map, switchMap, catchError } from "rxjs/operators";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";

@Injectable()
export class CategoryEffect {
  @Effect()
  fetchCategories = this.actions$.pipe(
    ofType(CategoryActions.FETCH_CATEGORIES),
    switchMap((action: CategoryActions.FetchCategories) =>
      this.categoryService.getCategories().pipe(
        map((res: IResult<ICategory[]>) => {
          return {
            type: CategoryActions.SET_CATEGORIES,
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
    private categoryService: CategoryService,
    private store: Store<fromApp.AppState>
  ) {}
}
