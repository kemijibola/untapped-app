import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TalentsService } from "src/app/services/talents.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as TalentsActions from "./talents.actions";
import { IResult, TalentPortfolioPreview } from "src/app/interfaces";
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";

@Injectable()
export class TalentsEffect {
  @Effect()
  fetchUserPortfolioPreviewList = this.action$.pipe(
    ofType(TalentsActions.FETCH_TALENT_PORTFOLIO),
    switchMap((action: TalentsActions.FetchTalentPortfolio) =>
      this.talentsService.fetchTalentsPortfolioPreviewList(action.payload).pipe(
        map((resp: IResult<TalentPortfolioPreview[]>) => {
          return {
            type: TalentsActions.SET_TALENT_PORTFOLIO,
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
    private action$: Actions,
    private talentsService: TalentsService,
    private store: Store<fromApp.AppState>
  ) {}
}
