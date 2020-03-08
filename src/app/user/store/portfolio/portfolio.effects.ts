import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducers";
import { PortfolioService } from "src/app/services/portfolio.service";
import * as PortfolioActions from "./portfolio.actions";
import * as UploadActions from "../../../shared/store/upload/upload.actions";
import { map, mergeMap } from "rxjs/operators";
import {
  IResult,
  IAudio,
  IVideo,
  IImage,
  IGeneralMedia,
  IMedia,
  MediaPreview
} from "src/app/interfaces";

@Injectable()
export class PortfolioEffect {
  @Effect()
  createPortfolioMedia = this.action$
    .pipe(ofType(PortfolioActions.CREATE_PORTFOLIO_MEDIA))
    .switchMap((action: PortfolioActions.CreatePortfolioMedia) => {
      const { uploadType, data } = action.payload;
      return this.portfolioService.createPortfolioMedia(uploadType, data);
    })
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
      })
    );

  @Effect()
  updatePortfolioMedia = this.action$
    .pipe(ofType(PortfolioActions.UPDATE_PORTFOLIO_MEDIA))
    .switchMap((action: PortfolioActions.UpdatePortfolioMedia) => {
      const { uploadType, data } = action.payload;
      return this.portfolioService.updatePortfolioMedia(uploadType, data);
    })
    .pipe(
      map((resp: IResult<IMedia>) => {
        return {
          type: PortfolioActions.UPDATE_PORTFOLIO_MEDIA_SUCCESS,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioPreviewList = this.action$
    .pipe(ofType(PortfolioActions.FETCH_USER_MEDIA_LIST_PREVIEW))
    .switchMap((action: PortfolioActions.FetchUserMediaListPreview) => {
      return this.portfolioService.fetchUserPortfolioPreviewList(
        action.payload
      );
    })
    .pipe(
      map((resp: IResult<MediaPreview[]>) => {
        return {
          type: PortfolioActions.SET_USER_MEDIA_LIST_PREVIEW,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioList = this.action$
    .pipe(ofType(PortfolioActions.FETCH_USER_MEDIA_LIST))
    .switchMap((action: PortfolioActions.FetchUserMediaList) => {
      return this.portfolioService.fetchUserPortfolioList(action.payload);
    })
    .pipe(
      map((resp: IResult<IMedia[]>) => {
        return {
          type: PortfolioActions.SET_USER_MEDIA_LIST,
          payload: resp.data
        };
      })
    );

  @Effect()
  deleteMediaItem = this.action$
    .pipe(ofType(PortfolioActions.DELETE_MEDIA_ITEM_BY_ID))
    .switchMap((action: PortfolioActions.DeleteMediaItemById) => {
      const { id, itemId } = action.payload;
      return this.portfolioService.deleteMediaItem(id, itemId);
    })
    .pipe(
      map((resp: IResult<boolean>) => {
        return {
          type: PortfolioActions.DELETE_MEDIA_ITEM_BY_ID_SUCCESS
        };
      })
    );

  @Effect()
  deleteImage = this.action$
    .pipe(ofType(PortfolioActions.DELETE_IMAGE_BY_ID))
    .switchMap((action: PortfolioActions.DeleteImageById) => {
      return this.portfolioService.deleteMedia(action.payload);
    })
    .pipe(
      map((resp: IResult<boolean>) => {
        return {
          type: PortfolioActions.DELETE_IMAGE_BY_ID_SUCCESS
        };
      })
    );

  @Effect()
  deleteAudio = this.action$
    .pipe(ofType(PortfolioActions.DELETE_AUDIO_BY_ID))
    .switchMap((action: PortfolioActions.DeleteAudioById) => {
      return this.portfolioService.deleteMedia(action.payload);
    })
    .pipe(
      map((resp: IResult<boolean>) => {
        return {
          type: PortfolioActions.DELETE_AUDIO_BY_ID_SUCCESS
        };
      })
    );

  @Effect()
  deleteVideo = this.action$
    .pipe(ofType(PortfolioActions.DELETE_VIDEO_BY_ID))
    .switchMap((action: PortfolioActions.DeleteVideoById) => {
      return this.portfolioService.deleteMedia(action.payload);
    })
    .pipe(
      map((resp: IResult<boolean>) => {
        return {
          type: PortfolioActions.DELETE_VIDEO_BY_ID_SUCCESS
        };
      })
    );

  @Effect()
  fetchMedia = this.action$
    .pipe(ofType(PortfolioActions.FETCH_MEDIA_BY_ID))
    .switchMap((action: PortfolioActions.FetchMediaById) => {
      return this.portfolioService.fetchPortfolioMedia(action.payload);
    })
    .pipe(
      map((resp: IResult<IMedia>) => {
        return {
          type: PortfolioActions.SET_MEDIA_BY_ID,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchAllPortfolioList = this.action$
    .pipe(ofType(PortfolioActions.FETCH_ALL_MEDIA))
    .switchMap((action: PortfolioActions.FetchAllMedia) => {
      return this.portfolioService.fetchPortfolioList(action.payload);
    })
    .pipe(
      map((resp: IResult<IMedia[]>) => {
        return {
          type: PortfolioActions.SET_ALL_MEDIA,
          payload: resp.data
        };
      })
    );
  constructor(
    private action$: Actions,
    private portfolioService: PortfolioService,
    private store: Store<fromApp.AppState>
  ) {}
}
