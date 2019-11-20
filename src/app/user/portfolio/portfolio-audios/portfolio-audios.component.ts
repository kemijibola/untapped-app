import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import { IAudio, AppModal } from 'src/app/interfaces';
import { selectUserAudioList } from '../../store/portfolio/portfolio.selectors';
import * as fromApp from '../../../store/app.reducers';
import * as ModalsActions from '../../../shared/store/modals/modals.actions';

@Component({
  selector: 'app-portfolio-audios',
  templateUrl: './portfolio-audios.component.html',
  styleUrls: ['./portfolio-audios.component.css']
})
export class PortfolioAudiosComponent implements OnInit {
  portfolioAudios: Observable<fromPortfolio.PortfolioFeatureState>;
  userId = '';
  userAudios: IAudio[] = [];
  userAudiosLength = 0;
  constructor(
    private store: Store<fromApp.AppState>,
    private featureStore: Store<fromPortfolio.PortfolioFeatureState>
  ) {}

  ngOnInit() {
    this.featureStore
      .pipe(select(selectUserAudioList))
      .subscribe((audios: IAudio[]) => {
        this.userAudios = audios;
        this.userAudiosLength = audios.length;
      });
  }
  onClickAddUploadBtn() {
    console.log('clicked');
    this.store.dispatch(new ModalsActions.SetModalId(AppModal.Portfolio));
  }
}
