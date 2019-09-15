import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import {
  MediaAcceptType,
  PortfolioUploadInputConfig,
  MediaUploadType,
  MediaType,
  IMedia
} from 'src/app/interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-portfolio-modal-content',
  templateUrl: './portfolio-modal-content.component.html',
  styleUrls: ['./portfolio-modal-content.component.css']
})
export class PortfolioModalContentComponent implements OnInit, OnChanges {
  @Input() data: IMedia;
  @Input() mediaType: MediaType;
  multiple: boolean;
  accept: string;
  defaultUpload: MediaUploadType.SINGLE;
  selectedUploadType = MediaUploadType.SINGLE;
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
    this.multiple = false;
    this.accept = MediaAcceptType.AUDIO;
    // this.onSelectUploadType(MediaUploadType.SINGLE);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['data']) {
      // console.log(this.data);
    }

    if (simpleChanges['mediaType']) {
      this.accept = MediaAcceptType[this.mediaType];
    }
  }

  onSelectUploadType(uploadType: MediaUploadType) {
    switch (uploadType) {
      case MediaUploadType.MULTIPLE:
        this.uploadTypes[1].selected = false;
        this.uploadTypes[0].selected = !this.uploadTypes[0].selected;
        this.multiple = true;
        break;
      case MediaUploadType.SINGLE:
        this.uploadTypes[1].selected = !this.uploadTypes[1].selected;
        this.uploadTypes[0].selected = false;
        this.multiple = false;
        break;
    }
  }
}
