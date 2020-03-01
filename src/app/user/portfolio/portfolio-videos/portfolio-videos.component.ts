import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromUser from "../../user.reducers";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import { IVideo, IMedia } from "src/app/interfaces";
import { selectUserVideoList } from "../../store/portfolio/portfolio.selectors";

@Component({
  selector: "app-portfolio-videos",
  templateUrl: "./portfolio-videos.component.html",
  styleUrls: ["./portfolio-videos.component.css"]
})
export class PortfolioVideosComponent implements OnInit {
  userVideos: IMedia[] = [];
  userVideosLength = 0;
  constructor(private userStore: Store<fromUser.UserState>) {}

  ngOnInit() {
    // this.portfolioVideos = this.userState.select("portfolio");
    this.userStore
      .pipe(select(selectUserVideoList))
      .subscribe((val: IVideo[]) => {
        console.log("user video albums", val);
        this.userVideos = val;
        this.userVideosLength = val.length;
      });
  }
}
