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

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('shared', sharedReducers),
    EffectsModule.forFeature([UploadEffect])
  ],
  exports: [
    UploadComponent,
    UserProfilePictureComponent,
    TabsComponent,
    CategoriesComponent
  ],
  declarations: [
    UploadComponent,
    DialogComponent,
    UserProfilePictureComponent,
    TabsComponent,
    CategoriesComponent
  ]
})
export class SharedModule {}
