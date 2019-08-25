import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { UserProfilePictureComponent } from './user-profile-picture/user-profile-picture.component';
import { TabsComponent } from './tabs/tabs.component';
import { CategoriesComponent } from './categories/categories.component';
import { RouterModule } from '@angular/router';
import { AppUserSearchCategoriesComponent } from './app-user-search-categories/app-user-search-categories.component';
import { AppSearchCategoriesComponent } from './app-search-categories/app-search-categories.component';
import { ModalsComponent } from './modals/modals.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [
    CommonModule,
    UploadComponent,
    UserProfilePictureComponent,
    TabsComponent,
    CategoriesComponent,
    AppUserSearchCategoriesComponent,
    ModalsComponent
  ],
  declarations: [
    UploadComponent,
    UserProfilePictureComponent,
    TabsComponent,
    CategoriesComponent,
    AppUserSearchCategoriesComponent,
    AppSearchCategoriesComponent,
    ModalsComponent
  ]
})
export class SharedModule {}
