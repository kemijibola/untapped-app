import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import * as PortfolioActions from '../../store/portfolio/portfolio.actions';
import {
  MediaAcceptType,
  PortfolioUploadInputConfig,
  MediaUploadType,
  MediaType,
  IMedia
} from 'src/app/interfaces';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { selectUserAudioList } from '../../store/portfolio/portfolio.selectors';

@Component({
  selector: 'app-portfolio-modal-content',
  templateUrl: './portfolio-modal-content.component.html',
  styleUrls: ['./portfolio-modal-content.component.css']
})
export class PortfolioModalContentComponent implements OnInit {
  @Input() data: any;
  @Input() mediaType: MediaType;
  portfolioUploadConfig: PortfolioUploadInputConfig = {
    isMultiple: false,
    mediaAccept: MediaAcceptType.IMAGE
  };
  uploadTypes = [
    {
      index: 0,
      value: 'Single Upload',
      type: MediaUploadType.SINGLE,
      selected: true
    },
    {
      index: 1,
      value: 'Multiple Upload',
      type: MediaUploadType.MULTIPLE,
      selected: false
    }
  ];
  isMediaUploaded: boolean;
  constructor(
    private featureStore: Store<fromPortfolio.PortfolioFeatureState>
  ) {}

  ngOnInit() {
    // console.log(this.data);
    // this.onSelectUploadType(MediaUploadType.SINGLE);
  }

  // ngOnChanges(simpleChanges: SimpleChanges) {
  //   if (simpleChanges['mediaType']) {
  //     const mediaType = this.mediaType;
  //     switch (mediaType) {
  //       case MediaType.AUDIO:
  //         this.featureStore
  //           .pipe(select(selectUserAudioList))
  //           .subscribe((audios: IMedia[]) => {
  //             console.log('audio', audios);
  //           });
  //         return;
  //       case MediaType.IMAGE:
  //         return;
  //     }
  //   }
  // }

  onSelectUploadType(uploadType: MediaUploadType) {
    switch (uploadType) {
      case MediaUploadType.MULTIPLE:
        this.uploadTypes[1].selected = false;
        this.uploadTypes[0].selected = !this.uploadTypes[0].selected;
        this.portfolioUploadConfig.isMultiple = true;
        break;
      case MediaUploadType.SINGLE:
        this.uploadTypes[1].selected = !this.uploadTypes[1].selected;
        this.uploadTypes[0].selected = false;
        this.portfolioUploadConfig.isMultiple = false;
        break;
    }

    // this.featureStore.dispatch(
    //   new PortfolioActions.SetPortfolioUpdateInputConfig(
    //     this.portfolioUploadConfig
    //   )
    // );
  }
}
