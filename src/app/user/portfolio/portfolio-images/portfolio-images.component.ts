import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../../user.reducers';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import { Observable } from 'rxjs';
import { IImage } from 'src/app/interfaces';
import { selectUserImageList } from '../../store/portfolio/portfolio.selectors';

@Component({
  selector: 'app-portfolio-images',
  templateUrl: './portfolio-images.component.html',
  styleUrls: ['./portfolio-images.component.css']
})
export class PortfolioImagesComponent implements OnInit {
  portfolioImages: Observable<fromPortfolio.PortfolioFeatureState>;
  userImages: IImage[] = [];
  userImagesLength = 0;
  constructor(private userState: Store<fromPortfolio.PortfolioFeatureState>) {}

  ngOnInit() {
    // this.portfolioImages = this.userState.select('portfolio');
    this.userState
      .pipe(select(selectUserImageList))
      .subscribe((val: IImage[]) => {
        this.userImages = val;
        this.userImagesLength = val.length;
      });
  }
}
