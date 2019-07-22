import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from '../../user.reducers';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio-images',
  templateUrl: './portfolio-images.component.html',
  styleUrls: ['./portfolio-images.component.css']
})
export class PortfolioImagesComponent implements OnInit {
  portfolioImages: Observable<fromPortfolio.State>;
  constructor(private userState: Store<fromUser.UserState>) {}

  ngOnInit() {
    this.portfolioImages = this.userState.select('portfolio');
  }
}
