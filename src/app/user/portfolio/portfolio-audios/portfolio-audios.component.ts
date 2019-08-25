import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import { IAudio } from 'src/app/interfaces';
import { selectUserAudioList } from '../../store/portfolio/portfolio.selectors';

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
}
