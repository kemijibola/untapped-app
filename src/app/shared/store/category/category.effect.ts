import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as CategoryActions from "./category.action";
import * as fromApp from "../../../store/app.reducers";
import { CategoryService } from "src/app/services/category.service";
import { map } from "rxjs/operators";
import { IResult, ICategory } from "src/app/interfaces";

@Injectable()
export class CategoryEffect {
  @Effect()
  fetchCategories = this.actions$
    .pipe(ofType(CategoryActions.FETCH_CATEGORIES))
    .switchMap((action: CategoryActions.FetchCategories) => {
      return this.categoryService.getCategories();
    })
    .pipe(
      map((res: IResult<ICategory[]>) => {
        return {
          type: CategoryActions.SET_CATEGORIES,
          payload: res.data
        };
      })
    );

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private store: Store<fromApp.AppState>
  ) {}
}
