import { NgModule } from "@angular/core";
import { TalentsComponent } from "./talents.component";
import { CommonModule } from "@angular/common";
import { TalentBiodataComponent } from "./talent-biodata/talent-biodata.component";
import { TalentPortfolioAlbumsComponent } from "./talent-portfolio-albums/talent-portfolio-albums.component";
// tslint:disable-next-line:max-line-length
import { TalentPortfolioAlbumItemComponent } from "./talent-portfolio-albums/talent-portfolio-album-item/talent-portfolio-album-item.component";
import { TalentPortfolioGeneralItemsComponent } from "./talent-portfolio-general-items/talent-portfolio-general-items.component";
import { PortfolioGeneralItemComponent } from "./talent-portfolio-general-items/portfolio-general-item/portfolio-general-item.component";
import { SharedModule } from "../shared/shared.module";
import { TalentsRoutingModule } from "./talents-routing.module";
import { TalentAlbumModalContentComponent } from "./talent-album-modal-content/talent-album-modal-content.component";

import { VgCoreModule } from "ngx-videogular";
import { VgControlsModule } from "ngx-videogular";
import { VgOverlayPlayModule } from "ngx-videogular";
import { VgBufferingModule } from "ngx-videogular";

import { TalentCommentComponent } from "./talent-comment/talent-comment.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LazyLoadImageModule } from "ng-lazyload-image";

@NgModule({
  declarations: [
    TalentsComponent,
    TalentBiodataComponent,
    TalentPortfolioAlbumsComponent,
    TalentPortfolioAlbumItemComponent,
    TalentPortfolioGeneralItemsComponent,
    PortfolioGeneralItemComponent,
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
  ],
  exports: [],
})
export class TalentsModule {}
