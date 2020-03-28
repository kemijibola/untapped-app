import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducers";
import { PortfolioService } from "src/app/services/portfolio.service";
import * as MediaPreviewActions from "./media-preview.actions";
import { map, switchMap, catchError, mergeMap } from "rxjs/operators";
import { IResult, MediaPreview } from "src/app/interfaces";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../../store/global/error/error.actions";

@Injectable()
export class MediaPreviewEffect {
  @Effect()
  fetchUserPortfolioPreviewList = this.action$.pipe(
    ofType(MediaPreviewActions.FETCH_USER_MEDIA_LIST_PREVIEW),
    switchMap((action: MediaPreviewActions.FetchUserMediaListPreview) =>
      this.portfolioService.fetchUserPortfolioPreviewList(action.payload).pipe(
        map((resp: IResult<MediaPreview[]>) => {
          return {
            type: MediaPreviewActions.SET_USER_MEDIA_LIST_PREVIEW,
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
    private portfolioService: PortfolioService,
    private store: Store<fromApp.AppState>
  ) {}
}
