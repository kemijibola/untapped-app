import { environment } from "./../../../../environments/environment.dev";
import {
  MediaUploadType,
  PortfolioQueryParams,
  MediaQueryParams,
} from "./../../../interfaces/user/portfolio";
import { Component, OnInit } from "@angular/core";
import * as fromPortfolio from "../../store/portfolio/portfolio.reducers";
import * as fromApp from "../../../store/app.reducers";
import * as PortfolioActions from "../../store/portfolio/portfolio.actions";
import * as MediaPreviewActions from "../../store/portfolio/media/media-preview.actions";
import * as AuthActions from "../../../account/store/auth.actions";
import { Store, select } from "@ngrx/store";
import { MediaType, IAuthData } from "src/app/interfaces";
import * as fromAuth from "src/app/account/store/auth.reducers";
import * as fromUser from "../../user.reducers";
import * as fromMediaPreview from "../../store/portfolio/media/media-preview.reducers";

@Component({
  selector: "app-portfolio-item-container",
  templateUrl: "./portfolio-item-container.component.html",
  styleUrls: ["./portfolio-item-container.component.css"],
})
export class PortfolioItemContainerComponent implements OnInit {
  userId = "";
  selectedMediaType: MediaType;
  userMediaListCount: number;
  noMediaImg: string = environment.NO_MEDIA_IMG;
  constructor(
    public store: Store<fromApp.AppState>,
    private userStore: Store<fromUser.UserState>
  ) {}

  ngOnInit() {
    this.triggerFetchUserMediaList();
    this.triggerFetchUserGeneralList();
  }

  triggerFetchUserMediaList(): void {
    const queryParams: MediaQueryParams = {
      type: MediaType.ALL,
      uploadType: MediaUploadType.all,
    };
    this.userStore.dispatch(
      new MediaPreviewActions.FetchUserMediaListPreview(queryParams)
    );
  }

  triggerFetchUserGeneralList(): void {
    const queryParams: MediaQueryParams = {
      type: MediaType.ALL,
      uploadType: MediaUploadType.single,
    };
    this.userStore.dispatch(
      new MediaPreviewActions.FetchUserGeneralListPreview(queryParams)
    );
  }
}
