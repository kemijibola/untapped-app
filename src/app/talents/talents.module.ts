import { NgModule } from "@angular/core";
import { TalentsComponent } from "./talents.component";
import { CommonModule } from "@angular/common";
import { TalentBiodataComponent } from "./talent-biodata/talent-biodata.component";
import { TalentPortfolioAlbumsComponent } from "./talent-portfolio-albums/talent-portfolio-albums.component";
// tslint:disable-next-line:max-line-length
import { TalentPortfolioAlbumItemComponent } from "./talent-portfolio-albums/talent-portfolio-album-item/talent-portfolio-album-item.component";
import { TalentPortfolioGeneralItemsComponent } from "./talent-portfolio-general-items/talent-portfolio-general-items.component";
import { PortfolioGeneralItemComponent } from "./talent-portfolio-general-items/portfolio-general-item/portfolio-general-item.component";
import { TalentsPortfolioAlbumDetailsComponent } from "./talents-portfolio-album-details/talents-portfolio-album-details.component";
import { SharedModule } from "../shared/shared.module";
import { TalentsRoutingModule } from "./talents-routing.module";

@NgModule({
  declarations: [
    TalentsComponent,
    TalentBiodataComponent,
    TalentPortfolioAlbumsComponent,
    TalentPortfolioAlbumItemComponent,
    TalentPortfolioGeneralItemsComponent,
    PortfolioGeneralItemComponent,
    TalentsPortfolioAlbumDetailsComponent
  ],
  imports: [CommonModule, TalentsRoutingModule, SharedModule],
  exports: []
})
export class TalentsModule {}
