import { NgModule } from "@angular/core";
import { TalentsComponent } from "./talents.component";
import { CommonModule } from "@angular/common";
import { TalentBiodataComponent } from "./talent-biodata/talent-biodata.component";
import { TalentPortfolioAlbumsComponent } from "./talent-portfolio-albums/talent-portfolio-albums.component";
// tslint:disable-next-line:max-line-length
import { TalentPortfolioAlbumItemComponent } from "./talent-portfolio-albums/talent-portfolio-album-item/talent-portfolio-album-item.component";

import { SharedModule } from "../shared/shared.module";
import { TalentsRoutingModule } from "./talents-routing.module";
import { TalentAlbumModalContentComponent } from "./talent-album-modal-content/talent-album-modal-content.component";

import { VgCoreModule } from "ngx-videogular";
import { VgControlsModule } from "ngx-videogular";
import { VgOverlayPlayModule } from "ngx-videogular";
import { VgBufferingModule } from "ngx-videogular";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LazyLoadImageModule } from "ng-lazyload-image";

import { MatVideoModule } from "mat-video";
import { TalentCommentComponent } from "./talent-comment/talent-comment.component";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    TalentsComponent,
    TalentBiodataComponent,
    TalentPortfolioAlbumsComponent,
    TalentPortfolioAlbumItemComponent,
    TalentAlbumModalContentComponent,
    TalentCommentComponent,
  ],
  imports: [
    CommonModule,
    TalentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    LazyLoadImageModule,
    MatVideoModule,
    PerfectScrollbarModule,
  ],
  exports: [],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class TalentsModule {}
