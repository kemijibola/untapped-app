import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { TalentsService } from "src/app/services/talents.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import * as TalentsActions from "./talents.actions";
import {
  IResult,
  TalentPortfolioPreview,
  MediaType,
  AppNotificationKey,
} from "src/app/interfaces";
import { map, catchError, concatMap, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import * as TalentAudioPreviewActions from "./audio-preview/audio-preview.action";
import * as TalentImagePreviewActions from "./image-preview/image-preview.action";
import * as TalentVideoPreviewActions from "./video-preview/video-preview.action";
import * as GeneralPreviewActions from "./general-preview/general-preview.action";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../store/global/notification/notification.action";

@Injectable()
export class TalentsEffect {
  fetchUserPortfolioPreviewList = createEffect(() =>
    this.action$.pipe(
      ofType(TalentsActions.FETCH_TALENT_PORTFOLIO),
      concatMap((action: TalentsActions.FetchTalentPortfolio) =>
        this.talentsService
          .fetchTalentsPortfolioPreviewList(action.payload)
          .pipe(
            mergeMap((resp: IResult<TalentPortfolioPreview[]>) => {
              const audioPortfolio = resp.data.filter(
                (x) => x.mediaType === MediaType.AUDIO.toLowerCase()
              );
              const imagePortfolio = resp.data.filter(
                (x) => x.mediaType === MediaType.IMAGE.toLowerCase()
              );
              const videoPortfolio = resp.data.filter(
                (x) => x.mediaType === MediaType.VIDEO.toLowerCase()
              );
              return [
                new TalentAudioPreviewActions.FetchTalentAudioPortfolioPreviewsSuccess(
                  { audioPreviews: audioPortfolio }
                ),
                new TalentImagePreviewActions.FetchTalentImagePortfolioPreviewsSuccess(
                  { imagePreviews: imagePortfolio }
                ),
                new TalentVideoPreviewActions.FetchTalentVideoPortfolioPreviewsSuccess(
                  { videoPreviews: videoPortfolio }
                ),
              ];
            }),
            catchError((respError: HttpErrorResponse) =>
              of(new NotificationActions.Noop())
            )
          )
      )
    )
  );

  fetchUserGeneralPreviewList = createEffect(() =>
    this.action$.pipe(
      ofType(TalentsActions.FETCH_TALENT_GENERAL_MEDIA),
      concatMap((action: TalentsActions.FetchTalentGeneralMedia) =>
        this.talentsService
          .fetchTalentsPortfolioPreviewList(action.payload)
          .pipe(
            map(
              (resp: IResult<TalentPortfolioPreview[]>) =>
                new GeneralPreviewActions.FetchTalentGeneralPreviewsSuccess({
                  generalPreviews: resp.data,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(new NotificationActions.Noop())
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
