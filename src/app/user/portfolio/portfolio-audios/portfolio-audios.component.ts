import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import { IAudio, AppModal, IMedia } from "src/app/interfaces";
import { selectUserAudioList } from "../../store/portfolio/portfolio.selectors";
import * as fromApp from "../../../store/app.reducers";
import * as ModalsActions from "../../../shared/store/modals/modals.actions";
import * as fromUser from "../../user.reducers";

@Component({
  selector: "app-portfolio-audios",
  templateUrl: "./portfolio-audios.component.html",
  styleUrls: ["./portfolio-audios.component.css"]
})
export class PortfolioAudiosComponent implements OnInit {
  userId = "";
  userAudios: IAudio[] = [];
  userAudiosLength = 0;
  constructor(
    private store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {}

  ngOnInit() {
    this.userStore
      .pipe(select(selectUserAudioList))
      .subscribe((val: IMedia[]) => {
        console.log("user audio albums", val);
        this.userAudios = val;
        this.userAudiosLength = val.length;
      });
  }
  onClickAddUploadBtn() {
    // this.store.dispatch(new ModalsActions.SetModal(AppModal.Portfolio));
  }
}
