import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as CategoryTypeActions from "./category-type.actions";
import * as fromApp from "../../../store/app.reducers";
import { CategoryTypeService } from "src/app/services/category-type.service";
import { IResult, CategoryType } from "src/app/interfaces";
import { map } from "rxjs/operators";

@Injectable()
export class CategoryTypeEffects {
  @Effect()
  fetchCategoryTypes = this.actions$
    .pipe(ofType(CategoryTypeActions.FETCH_CATEGORIES))
    .switchMap((action: CategoryTypeActions.FetchCategories) => {
      return this.categoryTypeService.getCategoryTypes();
    })
    .pipe(
      map((res: IResult<CategoryType[]>) => {
        return {
          type: CategoryTypeActions.SET_CATEGORIES,
          payload: res.data
        };
      })
    );

  constructor(
    private actions$: Actions,
    private categoryTypeService: CategoryTypeService,
    private store: Store<fromApp.AppState>
  ) {}
}
