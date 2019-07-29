import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUser from '../../user.reducers';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';

@Component({
  selector: 'app-portfolio-videos',
  templateUrl: './portfolio-videos.component.html',
  styleUrls: ['./portfolio-videos.component.css']
})
export class PortfolioVideosComponent implements OnInit {
  portfolioVideos: Observable<fromPortfolio.State>;
  constructor(private userState: Store<fromUser.UserState>) {}

  ngOnInit() {
    this.portfolioVideos = this.userState.select('portfolio');
  }
}
