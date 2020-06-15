import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";
import { EffectsModule } from "@ngrx/effects";
import { UploadEffect } from "../shared/store/upload/upload.effects";
import { ProfileComponent } from "./profile/profile.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { SettingsComponent } from "./settings/settings.component";
// import { userReducers } from './user.reducers';
import { PortfolioAudiosComponent } from "./portfolio/portfolio-audios/portfolio-audios.component";
import { PortfolioVideosComponent } from "./portfolio/portfolio-videos/portfolio-videos.component";
import { PortfolioImagesComponent } from "./portfolio/portfolio-images/portfolio-images.component";
import { PortfolioEffect } from "./store/portfolio/portfolio.effects";
import { ProfileEffect } from "./store/profile/profile.effects";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { PortfolioUploadComponent } from "./portfolio/portfolio-upload/portfolio-upload.component";
import { PortfolioMediaTypeComponent } from "./portfolio/portfolio-media-type/portfolio-media-type.component";
import { portfolioReducer } from "./store/portfolio/portfolio.reducers";
import { PortfolioModalContentComponent } from "./portfolio/portfolio-modal-content/portfolio-modal-content.component";
import { PortfolioItemContainerComponent } from "./portfolio/portfolio-item-container/portfolio-item-container.component";
import { PortfolioBrowseComponent } from "./portfolio/portfolio-browse/portfolio-browse.component";
import { CompleteProfileComponent } from "./complete-profile/complete-profile.component";
import { ChangeProfilePictureComponent } from "./profile/change-profile-picture/change-profile-picture.component";
import { profileReducer } from "./store/profile/profile.reducers";
import { ChangeProfessionalBannerComponent } from "./profile/change-professional-banner/change-professional-banner.component";
import { PortfolioGeneralComponent } from "./portfolio/portfolio-general/portfolio-general.component";

import { VgCoreModule } from "ngx-videogular";
import { VgControlsModule } from "ngx-videogular";
import { VgOverlayPlayModule } from "ngx-videogular";
import { VgBufferingModule } from "ngx-videogular";
import { mediaPreviewReducer } from "./store/portfolio/media/media-preview.reducers";
import { MediaPreviewEffect } from "./store/portfolio/media/media-preview.effects";
import { AddMoreImageComponent } from "./portfolio/add-more-image/add-more-image.component";
import { AddMoreAudioComponent } from "./portfolio/add-more-audio/add-more-audio.component";
import { AddMoreVideoComponent } from "./portfolio/add-more-video/add-more-video.component";
import { userLocationReducer } from "../shared/store/user-location/user-location.reducer";
import { TalentContestComponent } from "./talent-contest/talent-contest.component";

import { LazyLoadImageModule } from "ng-lazyload-image";

@NgModule({
  declarations: [
    ProfileComponent,
    PortfolioComponent,
    SettingsComponent,
    PortfolioAudiosComponent,
    PortfolioVideosComponent,
    PortfolioImagesComponent,
    UserComponent,
    PortfolioUploadComponent,
    PortfolioMediaTypeComponent,
    PortfolioModalContentComponent,
    PortfolioItemContainerComponent,
    PortfolioBrowseComponent,
    CompleteProfileComponent,
    ChangeProfilePictureComponent,
    ChangeProfessionalBannerComponent,
    PortfolioGeneralComponent,
    AddMoreImageComponent,
    AddMoreAudioComponent,
    AddMoreVideoComponent,
    TalentContestComponent,
  ],
  imports: [
    SharedModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    UserRoutingModule,
    StoreModule.forFeature("profileState", profileReducer),
    StoreModule.forFeature("mediaPreviewState", mediaPreviewReducer),
    StoreModule.forFeature("portfolioState", portfolioReducer),
    StoreModule.forFeature("userLocationState", userLocationReducer),
    EffectsModule.forFeature([
      ProfileEffect,
      PortfolioEffect,
      MediaPreviewEffect,
    ]),
  ],
  exports: [UserRoutingModule],
})
export class UserModule {}
