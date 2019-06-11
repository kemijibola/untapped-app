import { TalentComponent } from './talent.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';
import { TalentRoutingModule } from './talent-routing.module';
import { TabsComponent } from '../shared/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './../shared/categories/categories.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './profile/store/profile.reducers';
import { ProfilePictureComponent } from './profile/profile-picture/profile-picture.component';
import { talentReducers } from './talent-feature.reducers';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { UploadEffect } from '../shared/store/upload/upload.effects';
@NgModule({
    declarations: [
        ProfileComponent,
        PortfolioComponent,
        SettingsComponent,
        TalentComponent,
        TabsComponent,
        CategoriesComponent,
        ProfilePictureComponent
    ],
    imports: [
        TalentRoutingModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('talent', talentReducers),
        EffectsModule.forFeature([
            UploadEffect
        ])
    ],
    exports: [
        CategoriesComponent,
        TabsComponent
    ]
})

export class TalentModule { }
