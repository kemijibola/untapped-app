import {
  MediaUploadType,
  PortfolioQueryParams,
  MediaQueryParams
} from "./../../../interfaces/user/portfolio";
import { Component, OnInit } from "@angular/core";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import * as fromApp from "../../../store/app.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as MediaPreviewActions from "../../store/portfolio/media/media-preview.actions";
import * as AuthActions from "../../../account/store/auth.actions";
import { Store, select } from "@ngrx/store";
import { MediaType, IAuthData } from "src/app/interfaces";
import { selectUserData } from "../../../account/store/auth.selectors";
import * as fromUser from "../../user.reducers";

@Component({
  selector: "app-portfolio-item-container",
  templateUrl: "./portfolio-item-container.component.html",
  styleUrls: ["./portfolio-item-container.component.css"]
})
export class PortfolioItemContainerComponent implements OnInit {
  userId = "";
  selectedMediaType: MediaType;
  constructor(
    public store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {}

  ngOnInit() {
    this.selectedMediaType = MediaType.AUDIO;
    this.store.pipe(select(selectUserData)).subscribe((val: IAuthData) => {
      this.userId = val.user_data._id;
    });

    this.triggerFetchUserMediaList();
  }

  triggerFetchUserMediaList(): void {
    const queryParams: MediaQueryParams = {
      type: MediaType.ALL,
      uploadType: MediaUploadType.ALL
    };
    this.userStore.dispatch(
      new MediaPreviewActions.FetchUserMediaListPreview(queryParams)
    );
  }
}
