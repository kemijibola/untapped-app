import {
  MediaUploadType,
  PortfolioQueryParams
} from './../../../interfaces/user/portfolio';
import { Component, OnInit } from '@angular/core';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import * as fromApp from '../../../store/app.reducers';
import * as PortfolioActions from '../../store/portfolio/portfolio.actions';
import * as AuthActions from '../../../account/store/auth.actions';
import { Store, select } from '@ngrx/store';
import { MediaType, IAuthData } from 'src/app/interfaces';
import { selectUserData } from '../../../account/store/auth.selectors';

@Component({
  selector: 'app-portfolio-item-container',
  templateUrl: './portfolio-item-container.component.html',
  styleUrls: ['./portfolio-item-container.component.css']
})
export class PortfolioItemContainerComponent implements OnInit {
  userId = '';
  selectedMediaType: MediaType;
  constructor(
    public store: Store<fromApp.AppState>,
    private featureStore: Store<fromPortfolio.PortfolioFeatureState>
  ) {}

  ngOnInit() {
    this.selectedMediaType = MediaType.AUDIO;
    this.store.pipe(select(selectUserData)).subscribe((val: IAuthData) => {
      this.userId = val.user_data._id;
    });

    this.triggerUserAudioItemsFetch();
    this.triggerUserVideoItemsFetch();
    this.triggerUserImageItemsFetch();
  }

  triggerUserAudioItemsFetch(): void {
    const queryParams: PortfolioQueryParams = {
      user: this.userId,
      type: MediaType.AUDIO,
      upload: MediaUploadType.MULTIPLE
    };
    this.featureStore.dispatch(
      new PortfolioActions.FetchPortfolioAudios(queryParams)
    );
  }

  triggerUserVideoItemsFetch(): void {
    const queryParams: PortfolioQueryParams = {
      user: this.userId,
      type: MediaType.VIDEO,
      upload: MediaUploadType.MULTIPLE
    };
    this.featureStore.dispatch(
      new PortfolioActions.FetchPortfolioVideos(queryParams)
    );
  }

  triggerUserImageItemsFetch(): void {
    const queryParams: PortfolioQueryParams = {
      user: this.userId,
      type: MediaType.IMAGE,
      upload: MediaUploadType.MULTIPLE
    };
    this.featureStore.dispatch(
      new PortfolioActions.FetchPortfolioImages(queryParams)
    );
  }
}
