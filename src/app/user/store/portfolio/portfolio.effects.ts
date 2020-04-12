import { Injectable } from "@angular/core";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Store, Action, select } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { PortfolioService } from "src/app/services/portfolio.service";
import * as PortfolioActions from "./portfolio.actions";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import {
  map,
  switchMap,
  catchError,
  mergeMap,
  withLatestFrom,
  concatMap,
  tap,
} from "rxjs/operators";
import {
  IResult,
  IAudio,
  IVideo,
  IImage,
  IGeneralMedia,
  IMedia,
  MediaPreview,
  MediaType,
  AppNotificationKey,
} from "src/app/interfaces";
import { of, Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import * as fromPortfolio from "./portfolio.reducers";
import * as NotificationActions from "../../../store/global/notification/notification.action";

@Injectable()
export class PortfolioEffect {
  createPortfolioMedia = createEffect(() =>
    this.action$.pipe(
      ofType(PortfolioActions.CREATE_PORTFOLIO_MEDIA),
      switchMap((action: PortfolioActions.CreatePortfolioMedia) =>
        this.portfolioService
          .createPortfolioMedia(action.payload.uploadType, action.payload.data)
          .pipe(
            mergeMap((resp: IResult<IMedia>) => {
              return [
                {
                  type: PortfolioActions.CREATE_PORTFOLIO_MEDIA_SUCCESS,
                  payload: resp.data,
                },
                {
                  type: UploadActions.RESET_UPLOADED_ITEMS,
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
                    "No Internet connection",
                })
              )
            )
          )
      )
    )
  );

  updatePortfolioMedia = createEffect(() =>
    this.action$.pipe(
      ofType(PortfolioActions.UPDATE_PORTFOLIO_MEDIA),
      switchMap((action: PortfolioActions.UpdatePortfolioMedia) =>
        this.portfolioService
          .updatePortfolioMedia(action.payload.uploadType, action.payload.data)
          .pipe(
            map(() => {
              return {
                type: PortfolioActions.UPDATE_PORTFOLIO_MEDIA_SUCCESS,
                payload: action.payload.data,
              };
            }),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                })
              )
            )
          )
      )
    )
  );

  fetchUserPortfolioList = createEffect(() =>
    this.action$.pipe(
      ofType(PortfolioActions.FETCH_USER_MEDIA_LIST),
      switchMap((action: PortfolioActions.FetchUserMediaList) =>
        this.portfolioService.fetchUserPortfolioList(action.payload).pipe(
          mergeMap((resp: IResult<IMedia[]>) => {
            const userAudios = resp.data.filter(
              (x) => x.mediaType === MediaType.AUDIO.toLowerCase()
            );
            const userImages = resp.data.filter(
              (x) => x.mediaType === MediaType.IMAGE.toLowerCase()
            );
            const userVideos = resp.data.filter(
              (x) => x.mediaType === MediaType.VIDEO.toLowerCase()
            );
            return [
              {
                type: PortfolioActions.SET_USER_MEDIA_LIST,
                payload: resp.data,
              },
              {
                type: PortfolioActions.SET_USER_AUDIO_LIST,
                payload: userAudios,
              },
              {
                type: PortfolioActions.SET_USER_IMAGE_LIST,
                payload: userImages,
              },
              {
                type: PortfolioActions.SET_USER_VIDEO_LIST,
                payload: userVideos,
              },
            ];
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

  deleteMediaItem = createEffect(() =>
    this.action$.pipe(
      ofType(PortfolioActions.DELETE_MEDIA_ITEM_BY_ID),
      switchMap((action: PortfolioActions.DeleteMediaItemById) =>
        this.portfolioService
          .deleteMediaItem(action.payload.id, action.payload.itemId)
          .pipe(
            map(
              () =>
                new PortfolioActions.DeleteMediaItemByIdSuccess({
                  itemId: action.payload.itemId,
                })
            ),
            catchError((respError: HttpErrorResponse) =>
              of(
                new NotificationActions.AddError({
                  key: AppNotificationKey.error,
                  code: respError.error.response_code || -1,
                  message:
                    respError.error.response_message ||
                    "No Internet connection",
                })
              )
            )
          )
      )
    )
  );

  fetchMedia = createEffect(() =>
    this.action$.pipe(
      ofType(PortfolioActions.FETCH_MEDIA_BY_ID),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(fromPortfolio.selectCurrentMediaId))
          )
        )
      ),
      switchMap(([action, id]) =>
        this.portfolioService.fetchPortfolioMedia(id).pipe(
          map(
            (resp: IResult<IMedia>) =>
              new PortfolioActions.SetMediaById(resp.data)
          ),
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

  fetchAllPortfolioList = createEffect(() =>
    this.action$.pipe(
      ofType(PortfolioActions.FETCH_ALL_MEDIA),
      switchMap((action: PortfolioActions.FetchAllMedia) =>
        this.portfolioService.fetchPortfolioList(action.payload).pipe(
          map((resp: IResult<IMedia[]>) => {
            return {
              type: PortfolioActions.SET_ALL_MEDIA,
              payload: resp.data,
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
