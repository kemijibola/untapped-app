import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UploadComponent } from "./upload/upload.component";
import { TabsComponent } from "./tabs/tabs.component";
import { RouterModule } from "@angular/router";
import { ModalsComponent } from "./modals/modals.component";
import { SlideToggleComponent } from "./slide-toggle/slide-toggle.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { TalentCategoriesComponent } from "./talent-categories/talent-categories.component";
import { MaterialModule } from "../material.module";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { ModalComponent } from "./modal/modal.component";
import { UpSearchComponent } from "./up-search/up-search.component";
import { UpCategerySearchComponent } from "./up-categery-search/up-categery-search.component";
import { UpUserFilterContainerComponent } from "./up-user-filter-container/up-user-filter-container.component";
import { UpUserFilterComponent } from "./up-user-filter/up-user-filter.component";
import { UpUserFilterItemComponent } from "./up-user-filter/up-user-filter-item/up-user-filter-item.component";
import { TruncateTextPipe } from "./utils/pipes/truncate-text.pipe";
import { UpImageComponent } from "./up-image/up-image.component";
import { UpAudioComponent } from "./up-audio/up-audio.component";
import { UpVideoComponent } from "./up-video/up-video.component";
import { LazyLoadImageModule } from "ng-lazyload-image";
// Simport { AudioPayerComponent } from './audio-payer/audio-payer.component';

// import { VgCoreModule } from "videogular2/compiled/core";
// import { VgControlsModule } from "videogular2/compiled/controls";
// import { VgOverlayPlayModule } from "videogular2/compiled/overlay-play";
// import { VgBufferingModule } from "videogular2/compiled/buffering";
// import { VgAPI } from "videogular2/compiled/core";

import { VgCoreModule } from "ngx-videogular";
import { VgControlsModule } from "ngx-videogular";
import { VgOverlayPlayModule } from "ngx-videogular";
import { VgBufferingModule } from "ngx-videogular";

import { UpMediaMagnifierComponent } from "./up-media-magnifier/up-media-magnifier.component";

import { Angular4PaystackModule } from "angular4-paystack";
import { environment } from "src/environments/environment";
import { GooglePlacesComponent } from "./google-places/google-places.component";
import { LatestContestLandingComponent } from "./latest-contest-landing/latest-contest-landing.component";
import { NguiInViewComponent } from "./ngui-in-view.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { AudioPayerComponent } from "./audio-payer/audio-payer.component";

@NgModule({
  imports: [
    FormsModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    AngularMultiSelectModule,
    CommonModule,
    MaterialModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    LazyLoadImageModule,
    NgbModule,
    Angular4PaystackModule.forRoot(environment.PAYSTACK_CLIENT_KEY),
    RouterModule.forChild([]),
  ],
  exports: [
    CommonModule,
    UploadComponent,
    TabsComponent,
    ModalsComponent,
    ModalComponent,
    SlideToggleComponent,
    TalentCategoriesComponent,
    UpSearchComponent,
    UpCategerySearchComponent,
    UpUserFilterContainerComponent,
    UpUserFilterComponent,
    UpUserFilterItemComponent,
    TruncateTextPipe,
    UpImageComponent,
    UpAudioComponent,
    UpVideoComponent,
    UpMediaMagnifierComponent,
    Angular4PaystackModule,
    GooglePlacesComponent,
    MatProgressBarModule,
    LatestContestLandingComponent,
    NguiInViewComponent,
    VideoPlayerComponent,
    AudioPayerComponent,
    NgbModule,
  ],
  declarations: [
    UploadComponent,
    TabsComponent,
    ModalsComponent,
    SlideToggleComponent,
    TalentCategoriesComponent,
    ModalComponent,
    UpSearchComponent,
    UpCategerySearchComponent,
    UpUserFilterContainerComponent,
    UpUserFilterComponent,
    UpUserFilterItemComponent,
    TruncateTextPipe,
    UpImageComponent,
    UpAudioComponent,
    UpVideoComponent,
    UpMediaMagnifierComponent,
    GooglePlacesComponent,
    LatestContestLandingComponent,
    NguiInViewComponent,
    VideoPlayerComponent,
    AudioPayerComponent,
  ],
})
export class SharedModule {}
