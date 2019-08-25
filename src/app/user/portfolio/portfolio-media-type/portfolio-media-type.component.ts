import { Component, OnInit } from '@angular/core';
import {
  MediaAcceptType,
  Modal,
  AppModal,
  MediaType,
  IMedia
} from 'src/app/interfaces';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import * as fromUser from '../../user.reducers';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import * as PortfolioActions from '../../store/portfolio/portfolio.actions';
import * as ModalsActions from '../../../shared/store/modals/modals.actions';
import {
  selectUserAudioList,
  selectUserVideoList,
  selectUserImageList
} from '../../store/portfolio/portfolio.selectors';

@Component({
  selector: 'app-portfolio-media-type',
  templateUrl: './portfolio-media-type.component.html',
  styleUrls: ['./portfolio-media-type.component.css']
})
export class PortfolioMediaTypeComponent implements OnInit {
  svgs = [];
  selectedMediaType: MediaType;
  constructor(
    private featureStore: Store<fromPortfolio.PortfolioFeatureState>,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.svgs = [
      {
        name: 'AUDIO',
        selected: true
      },
      {
        name: 'IMAGE',
        selected: false
      },
      {
        name: 'VIDEO',
        selected: false
      }
    ];
    this.selectedMediaType = this.svgs[0].name;
  }

  onSelect(index: number): void {
    if (index === 0) {
      this.svgs[0].selected = !this.svgs[0].selected;
      this.svgs[1].selected = false;
      this.svgs[2].selected = false;
      this.selectedMediaType = this.svgs[0].name;
    } else if (index === 1) {
      this.svgs[0].selected = false;
      this.svgs[1].selected = !this.svgs[1].selected;
      this.svgs[2].selected = false;
      this.selectedMediaType = this.svgs[1].name;
    } else if (index === 2) {
      this.svgs[0].selected = false;
      this.svgs[1].selected = false;
      this.svgs[2].selected = !this.svgs[2].selected;
      this.selectedMediaType = this.svgs[2].name;
    } else {
    }
  }

  onClickAddUploadBtn(): void {
    // user media items  are fetched after modal is popped up
    this.onMediaTypeSelected(this.selectedMediaType);
    this.store.dispatch(new ModalsActions.SetModalId(AppModal.Portfolio));
  }

  onMediaTypeSelected(type: MediaType): void {
    console.log(type);
    switch (type) {
      case MediaType.AUDIO:
        this.featureStore
          .pipe(select(selectUserAudioList))
          .subscribe((audios: IMedia[]) => {
            console.log('audio', audios);
          });
        return;
      case MediaType.VIDEO:
        this.featureStore
          .pipe(select(selectUserVideoList))
          .subscribe((videos: IMedia[]) => {
            console.log('videos', videos);
          });
        return;
      case MediaType.VIDEO:
        this.featureStore
          .pipe(select(selectUserImageList))
          .subscribe((images: IMedia[]) => {
            console.log('images', images);
          });
        return;
    }
  }
}
