import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from '../../user.reducers';
import { Observable } from 'rxjs';
import * as fromPortfolio from '../../store/portfolio/portfolio.reducers';

@Component({
  selector: 'app-portfolio-audios',
  templateUrl: './portfolio-audios.component.html',
  styleUrls: ['./portfolio-audios.component.css']
})
export class PortfolioAudiosComponent implements OnInit {
  portfolioAudios: Observable<fromPortfolio.State>;
  constructor(private userState: Store<fromUser.UserState>) {}

  ngOnInit() {
    // TODO:: Fetch user audios
    this.portfolioAudios = this.userState.select('portfolio');
  }
}
