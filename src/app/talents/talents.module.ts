import { NgModule } from '@angular/core';
import { TalentsComponent } from './talents.component';
import { CommonModule } from '@angular/common';
import { TalentBiodataComponent } from './talent-biodata/talent-biodata.component';
// tslint:disable-next-line:max-line-length
import { TalentsWithHighestCommentsComponent } from './talents-sort-by-categories/talents-with-highest-comments/talents-with-highest-comments.component';
// tslint:disable-next-line:max-line-length
import { TalentsWithMostWatchedVideosComponent } from './talents-sort-by-categories/talents-with-most-watched-videos/talents-with-most-watched-videos.component';
// tslint:disable-next-line:max-line-length
import { TalentsWithMostPlayedSongsComponent } from './talents-sort-by-categories/talents-with-most-played-songs/talents-with-most-played-songs.component';
// tslint:disable-next-line:max-line-length
import { TalentsWithMostLikedPhotosComponent } from './talents-sort-by-categories/talents-with-most-liked-photos/talents-with-most-liked-photos.component';
import { TalentsWithMostTapComponent } from './talents-sort-by-categories/talents-with-most-tap/talents-with-most-tap.component';
import { TalentPortfolioAlbumsComponent } from './talent-portfolio-albums/talent-portfolio-albums.component';
// tslint:disable-next-line:max-line-length
import { TalentPortfolioAlbumItemComponent } from './talent-portfolio-albums/talent-portfolio-album-item/talent-portfolio-album-item.component';
import { TalentPortfolioGeneralItemsComponent } from './talent-portfolio-general-items/talent-portfolio-general-items.component';
import { PortfolioGeneralItemComponent } from './talent-portfolio-general-items/portfolio-general-item/portfolio-general-item.component';
import { TalentsPortfolioAlbumDetailsComponent } from './talents-portfolio-album-details/talents-portfolio-album-details.component';
import { SharedModule } from '../shared/shared.module';
import { TalentsRoutingModule } from './talents-routing.module';
import { TalentsSortByCategoriesComponent } from './talents-sort-by-categories/talents-sort-by-categories.component';

@NgModule({
  declarations: [
    TalentsComponent,
    TalentBiodataComponent,
    TalentsWithHighestCommentsComponent,
    TalentsWithMostWatchedVideosComponent,
    TalentsWithMostPlayedSongsComponent,
    TalentsWithMostLikedPhotosComponent,
    TalentsWithMostTapComponent,
    TalentPortfolioAlbumsComponent,
    TalentPortfolioAlbumItemComponent,
    TalentPortfolioGeneralItemsComponent,
    PortfolioGeneralItemComponent,
    TalentsPortfolioAlbumDetailsComponent,
    TalentsSortByCategoriesComponent
  ],
  imports: [CommonModule, TalentsRoutingModule, SharedModule],
  exports: []
})
export class TalentsModule {}
