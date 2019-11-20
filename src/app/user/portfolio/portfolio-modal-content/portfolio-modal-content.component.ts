import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as fromSlideToggle from '../../../shared/store/slide-toggle/slide-toggle.reducers';
import * as ToggleStateActions from '../../../shared/store/slide-toggle/slide-toggle.actions';
import * as fromApp from '../../../store/app.reducers';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import {
  MediaAcceptType,
  PortfolioUploadInputConfig,
  MediaUploadType,
  MediaType,
  IMedia,
  IToggle,
  ToggleList
} from 'src/app/interfaces';
import { Store, select } from '@ngrx/store';
import { selectToggleList } from 'src/app/shared/store/slide-toggle/slide.toggle.selectors';
import { selectMediaAccept } from '../../store/portfolio/portfolio.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-modal-content',
  templateUrl: './portfolio-modal-content.component.html',
  styleUrls: ['./portfolio-modal-content.component.css']
})
export class PortfolioModalContentComponent implements OnInit {
  @Input() data: IMedia;
  @Input() mediaType: MediaType;
  multiple: boolean;
  accept: string;
  defaultUpload: MediaUploadType.SINGLE;
  toggleState: IToggle;
  toggleName = ToggleList.UploadTypeToggle;
  selectedUploadType = MediaUploadType.SINGLE;
  portfolioUploadConfig: PortfolioUploadInputConfig = {
    isMultiple: false,
    mediaAccept: MediaAcceptType.IMAGE
  };
  mediaUploaded: boolean;
  pageSlideToggles: IToggle[];
  defaultImageSet: boolean;
  constructor(
    private store: Store<fromApp.AppState>,
    private toggleStore: Store<fromSlideToggle.State>,
    private portfolioFeatureStore: Store<fromPortfolio.PortfolioFeatureState>
  ) {
    this.pageSlideToggles = [
      { index: 0, name: ToggleList.UploadTypeToggle, state: false }
    ];
    this.toggleStore.dispatch(
      new ToggleStateActions.AddPageToggles({ toggles: this.pageSlideToggles })
    );
  }

  ngOnInit() {
    this.store.pipe(select(selectToggleList)).subscribe((val: IToggle[]) => {
      this.toggleState = val.filter(
        x => x.name === ToggleList.UploadTypeToggle
      )[0];
      this.multiple = this.toggleState.state;
    });

    // select accept

    this.portfolioFeatureStore
      .pipe(select(selectMediaAccept))
      .subscribe((val: string) => {
        this.accept = val;
      });
  }
}
