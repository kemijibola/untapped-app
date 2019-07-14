import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';
import { TabsComponent } from '../shared/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './../shared/categories/categories.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './profile/store/profile.reducers';
import { ProfilePictureComponent } from './profile/profile-picture/profile-picture.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { UploadEffect } from '../shared/store/upload/upload.effects';
import { userAccountFeatureReducers } from './user-account-feature.reducers';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { UserAccountComponent } from './user-account.component';
@NgModule({
  declarations: [
    ProfileComponent,
    PortfolioComponent,
    SettingsComponent,
    UserAccountComponent,
    TabsComponent,
    CategoriesComponent,
    ProfilePictureComponent
  ],
  imports: [
    UserAccountRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('userAccount', userAccountFeatureReducers),
    EffectsModule.forFeature([UploadEffect])
  ],
  exports: [CategoriesComponent, TabsComponent]
})
export class UserAccountModule {}
