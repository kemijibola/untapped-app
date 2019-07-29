import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { sharedReducers } from './shared.reducers';
import { UploadComponent } from './upload/upload.component';
import { DialogComponent } from './upload/dialog/dialog.component';
import { UserProfilePictureComponent } from './user-profile-picture/user-profile-picture.component';
import { UploadEffect } from './store/upload/upload.effects';
import { TabsComponent } from './tabs/tabs.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { AppUserSearchCategoriesComponent } from './app-user-search-categories/app-user-search-categories.component';
import { AppSearchCategoriesComponent } from './app-search-categories/app-search-categories.component';
import { MainAppComponent } from './main-app/main-app.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [
    CommonModule,
    UploadComponent,
    UserProfilePictureComponent,
    TabsComponent,
    CategoriesComponent,
    AppUserSearchCategoriesComponent
  ],
  declarations: [
    UploadComponent,
    DialogComponent,
    UserProfilePictureComponent,
    TabsComponent,
    CategoriesComponent,
    AppUserSearchCategoriesComponent,
    AppSearchCategoriesComponent,
    MainAppComponent
  ]
})
export class SharedModule {}
