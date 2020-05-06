import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducers";
import { PortfolioService } from "src/app/services/portfolio.service";
import * as MediaPreviewActions from "./media-preview.actions";
import { map, catchError, mergeMap, concatMap } from "rxjs/operators";
import {
  IResult,
  MediaPreview,
  MediaType,
  AppNotificationKey,
} from "src/app/interfaces";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as NotificationActions from "../../../../store/global/notification/notification.action";

@Injectable()
export class MediaPreviewEffect {
  fetchUserPortfolioPreviewList = createEffect(() =>
    this.action$.pipe(
      ofType(MediaPreviewActions.FETCH_USER_MEDIA_LIST_PREVIEW),
      concatMap((action: MediaPreviewActions.FetchUserMediaListPreview) =>
        this.portfolioService
          .fetchUserPortfolioPreviewList(action.payload)
          .pipe(
            mergeMap((resp: IResult<MediaPreview[]>) => {
              const userAudioPreviews = resp.data.filter(
                (x) => x.mediaType === MediaType.AUDIO.toLowerCase()
              );
              const userImagePreviews = resp.data.filter(
                (x) => x.mediaType === MediaType.IMAGE.toLowerCase()
              );
              const userVideoPreviews = resp.data.filter(
                (x) => x.mediaType === MediaType.VIDEO.toLowerCase()
              );
              return [
                {
                  type: MediaPreviewActions.SET_USER_AUDIO_PREVIEWS,
                  payload: userAudioPreviews,
                },
                {
                  type: MediaPreviewActions.SET_USER_IMAGE_PREVIEWS,
                  payload: userImagePreviews,
                },
                {
                  type: MediaPreviewActions.SET_USER_VIDEO_PREVIEWS,
                  payload: userVideoPreviews,
                },
                {
                  type: MediaPreviewActions.SET_USER_MEDIA_LIST_PREVIEW,
                  payload: resp.data,
                },
                {
                  type: MediaPreviewActions.USER_MEDIA_LIST_COUNT,
                  payload: resp.data.length,
                },
              ];
            }),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection.",
                })
              )
            )
          )
      )
    )
  );

  deleteImage = createEffect(() =>
    this.action$.pipe(
      ofType(MediaPreviewActions.DELETE_IMAGE_LIST_BY_ID),
      concatMap((action: MediaPreviewActions.DeleteImageListById) =>
        this.portfolioService.deleteMedia(action.payload.imageId).pipe(
          map(() => {
            return {
              type: MediaPreviewActions.DELETE_IMAGE_LIST_BY_ID_SUCCESS,
              payload: action.payload.imageId,
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  deleteAudio = createEffect(() =>
    this.action$.pipe(
      ofType(MediaPreviewActions.DELETE_AUDIO_LIST_BY_ID),
      concatMap((action: MediaPreviewActions.DeleteAudioListById) =>
        this.portfolioService.deleteMedia(action.payload.audioId).pipe(
          map(() => {
            return {
              type: MediaPreviewActions.DELETE_AUDIO_LIST_BY_ID_SUCCESS,
              payload: action.payload.audioId,
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
          )
        )
      )
    )
  );

  deleteVideo = createEffect(() =>
    this.action$.pipe(
      ofType(MediaPreviewActions.DELETE_VIDEO_LIST_BY_ID),
      concatMap((action: MediaPreviewActions.DeleteVideoListById) =>
        this.portfolioService.deleteMedia(action.payload.videoId).pipe(
          map(() => {
            return {
              type: MediaPreviewActions.DELETE_VIDEO_LIST_BY_ID_SUCCESS,
              payload: action.payload.videoId,
            };
          }),
          catchError((respError: HttpErrorResponse) =>
            of(
              new NotificationActions.AddError({
                key: AppNotificationKey.error,
                code: respError.error.response_code || -1,
                message:
                  respError.error.response_message || "No Internet connection",
              })
            )
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
