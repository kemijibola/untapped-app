import { Store, select } from "@ngrx/store";
import * as fromUser from "../../user.reducers";
import { Component, OnInit } from "@angular/core";
import * as fromMediaPreview from "../../store/portfolio/media/media-preview.reducers";
import { GeneralPreview } from "src/app/interfaces";

@Component({
  selector: "app-portfolio-general",
  templateUrl: "./portfolio-general.component.html",
  styleUrls: ["./portfolio-general.component.css"],
})
export class PortfolioGeneralComponent implements OnInit {
  generalPreviews: GeneralPreview[] = [];

  constructor(private userStore: Store<fromUser.UserState>) {}
  ngOnInit() {
    this.userStore
      .pipe(select(fromMediaPreview.selectUserAudioPreviews))
      .subscribe((val: GeneralPreview[]) => {
        console.log(val);
        this.generalPreviews = val;
        // this.userAudiosLength = val.length;
        // if (val.length > 0) {
        //   this.setAlbumCovers();
        // }
      });
  }
}
