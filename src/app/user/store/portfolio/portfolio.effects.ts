import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { PortfolioService } from "src/app/services/portfolio.service";
import * as PortfolioActions from "./portfolio.actions";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import { map, switchMap, catchError, mergeMap } from "rxjs/operators";
import {
  IResult,
  IAudio,
  IVideo,
  IImage,
  IGeneralMedia,
  IMedia,
  MediaPreview
} from "src/app/interfaces";
import { of } from "rxjs";
import * as GlobalErrorActions from "../../../store/global/error/error.actions";

@Injectable()
export class PortfolioEffect {
  @Effect()
  createPortfolioMedia = this.action$.pipe(
    ofType(PortfolioActions.CREATE_PORTFOLIO_MEDIA),
    switchMap((action: PortfolioActions.CreatePortfolioMedia) =>
      this.portfolioService
        .createPortfolioMedia(action.payload.uploadType, action.payload.data)
        .pipe(
          mergeMap((resp: IResult<IMedia>) => {
            return [
              {
                type: PortfolioActions.CREATE_PORTFOLIO_MEDIA_SUCCESS,
                payload: resp.data
              },
              {
                type: UploadActions.RESET_UPLOADED_ITEMS
              }
            ];
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

  @Effect()
  updatePortfolioMedia = this.action$.pipe(
    ofType(PortfolioActions.UPDATE_PORTFOLIO_MEDIA),
    switchMap((action: PortfolioActions.UpdatePortfolioMedia) =>
      this.portfolioService
        .updatePortfolioMedia(action.payload.uploadType, action.payload.data)
        .pipe(
          map((resp: IResult<IMedia>) => {
            return {
              type: PortfolioActions.UPDATE_PORTFOLIO_MEDIA_SUCCESS,
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

  @Effect()
  fetchUserPortfolioList = this.action$.pipe(
    ofType(PortfolioActions.FETCH_USER_MEDIA_LIST),
    switchMap((action: PortfolioActions.FetchUserMediaList) =>
      this.portfolioService.fetchUserPortfolioList(action.payload).pipe(
        map((resp: IResult<IMedia[]>) => {
          return {
            type: PortfolioActions.SET_USER_MEDIA_LIST,
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

  @Effect()
  deleteMediaItem = this.action$.pipe(
    ofType(PortfolioActions.DELETE_MEDIA_ITEM_BY_ID),
    switchMap((action: PortfolioActions.DeleteMediaItemById) =>
      this.portfolioService
        .deleteMediaItem(action.payload.id, action.payload.itemId)
        .pipe(
          map((resp: IResult<boolean>) => {
            return {
              type: PortfolioActions.DELETE_MEDIA_ITEM_BY_ID_SUCCESS
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

  @Effect()
  deleteImage = this.action$.pipe(
    ofType(PortfolioActions.DELETE_IMAGE_BY_ID),
    switchMap((action: PortfolioActions.DeleteImageById) =>
      this.portfolioService.deleteMedia(action.payload).pipe(
        map((resp: IResult<boolean>) => {
          return {
            type: PortfolioActions.DELETE_IMAGE_BY_ID_SUCCESS
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

  @Effect()
  deleteAudio = this.action$.pipe(
    ofType(PortfolioActions.DELETE_AUDIO_BY_ID),
    switchMap((action: PortfolioActions.DeleteAudioById) =>
      this.portfolioService.deleteMedia(action.payload).pipe(
        map((resp: IResult<boolean>) => {
          return {
            type: PortfolioActions.DELETE_AUDIO_BY_ID_SUCCESS
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

  @Effect()
  deleteVideo = this.action$.pipe(
    ofType(PortfolioActions.DELETE_VIDEO_BY_ID),
    switchMap((action: PortfolioActions.DeleteVideoById) =>
      this.portfolioService.deleteMedia(action.payload).pipe(
        map((resp: IResult<boolean>) => {
          return {
            type: PortfolioActions.DELETE_VIDEO_BY_ID_SUCCESS
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

  @Effect()
  fetchMedia = this.action$.pipe(
    ofType(PortfolioActions.FETCH_MEDIA_BY_ID),
    switchMap((action: PortfolioActions.FetchMediaById) =>
      this.portfolioService.fetchPortfolioMedia(action.payload).pipe(
        map((resp: IResult<IMedia>) => {
          return {
            type: PortfolioActions.SET_MEDIA_BY_ID,
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

  @Effect()
  fetchAllPortfolioList = this.action$.pipe(
    ofType(PortfolioActions.FETCH_ALL_MEDIA),
    switchMap((action: PortfolioActions.FetchAllMedia) =>
      this.portfolioService.fetchPortfolioList(action.payload).pipe(
        map((resp: IResult<IMedia[]>) => {
          return {
            type: PortfolioActions.SET_ALL_MEDIA,
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
