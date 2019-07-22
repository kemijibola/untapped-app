import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { UploadEffect } from '../shared/store/upload/upload.effects';
import { ProfileComponent } from './profile/profile.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';
import { userReducers } from './user.reducers';
import { PortfolioAudiosComponent } from './portfolio/portfolio-audios/portfolio-audios.component';
import { PortfolioVideosComponent } from './portfolio/portfolio-videos/portfolio-videos.component';
import { PortfolioImagesComponent } from './portfolio/portfolio-images/portfolio-images.component';
import { PortfolioEffect } from './store/portfolio/portfolio.effects';
import { ProfileEffect } from './store/profile/profile.effects';
@NgModule({
  declarations: [
    ProfileComponent,
    PortfolioComponent,
    SettingsComponent,
    PortfolioAudiosComponent,
    PortfolioVideosComponent,
    PortfolioImagesComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('user', userReducers),
    EffectsModule.forFeature([ProfileEffect, PortfolioEffect])
  ],
  exports: []
})
export class UserModule {}
