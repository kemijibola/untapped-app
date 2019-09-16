import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import { PortfolioService } from 'src/app/services/portfolio.service';
import * as PortfolioActions from './portfolio.actions';
import { map } from 'rxjs/operators';
import {
  IResult,
  IAudio,
  IVideo,
  IImage,
  IGeneralMedia
} from 'src/app/interfaces';

@Injectable()
export class PortfolioEffect {
  @Effect()
  fetchUserPortfolioAudios = this.action$
    .pipe(ofType(PortfolioActions.FETCH_PORTFOLIO_AUDIOS))
    .switchMap((action: PortfolioActions.FetchPortfolioAudios) => {
      return this.portfolioService.fetchUserPortfolioMedias(action.payload);
    })
    .pipe(
      map((resp: IResult<IAudio[]>) => {
        return {
          type: PortfolioActions.SET_PORTFOLIO_AUDIOS,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioVideos = this.action$
    .pipe(ofType(PortfolioActions.FETCH_PORTFOLIO_VIDEOS))
    .switchMap((action: PortfolioActions.FetchPortfolioVideos) => {
      return this.portfolioService.fetchUserPortfolioMedias(action.payload);
    })
    .pipe(
      map((resp: IResult<IVideo[]>) => {
        return {
          type: PortfolioActions.SET_PORTFOLIO_VIDEOS,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioImages = this.action$
    .pipe(ofType(PortfolioActions.FETCH_PORTFOLIO_IMAGES))
    .switchMap((action: PortfolioActions.FetchPortfolioImages) => {
      return this.portfolioService.fetchUserPortfolioMedias(action.payload);
    })
    .pipe(
      map((resp: IResult<IImage[]>) => {
        return {
          type: PortfolioActions.SET_PORTFOLIO_IMAGES,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioItems = this.action$
    .pipe(ofType(PortfolioActions.FETCH_PORTFOLIO_GENERALS))
    .switchMap((action: PortfolioActions.FetchPortfolioGenerals) => {
      return this.portfolioService.fetchUserPortfolioItems(action.payload);
    })
    .pipe(
      map((resp: IResult<IGeneralMedia[]>) => {
        return {
          type: PortfolioActions.SET_PORTFOLIO_GENERALS,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioAudio = this.action$
    .pipe(ofType(PortfolioActions.FETCH_PORTFOLIO_AUDIO))
    .switchMap((action: PortfolioActions.FetchPortfolioAudio) => {
      return this.portfolioService.fetchUserPortfolioMedia(action.payload.id);
    })
    .pipe(
      map((resp: IResult<IAudio>) => {
        return {
          type: PortfolioActions.SET_PORTFOLIO_AUDIO,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioVideo = this.action$
    .pipe(ofType(PortfolioActions.FETCH_PORTFOLIO_VIDEO))
    .switchMap((action: PortfolioActions.FetchPortfolioVideo) => {
      return this.portfolioService.fetchUserPortfolioMedia(action.payload.id);
    })
    .pipe(
      map((resp: IResult<IVideo>) => {
        return {
          type: PortfolioActions.SET_PORTFOLIO_VIDEO,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioImage = this.action$
    .pipe(ofType(PortfolioActions.FETCH_PORTFOLIO_IMAGE))
    .switchMap((action: PortfolioActions.FetchPortfolioImage) => {
      return this.portfolioService.fetchUserPortfolioMedia(action.payload.id);
    })
    .pipe(
      map((resp: IResult<IImage>) => {
        return {
          type: PortfolioActions.SET_PORTFOLIO_IMAGE,
          payload: resp.data
        };
      })
    );

  @Effect()
  fetchUserPortfolioItem = this.action$
    .pipe(ofType(PortfolioActions.FETCH_PORTFOLIO_GENERAL))
    .switchMap((action: PortfolioActions.FetchPortfolioGeneral) => {
      return this.portfolioService.fetchUserPortfolioItem(action.payload.id);
    })
    .pipe(
      map((resp: IResult<IGeneralMedia>) => {
        return {
          type: PortfolioActions.SET_PORTFOLIO_GENERAL,
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
