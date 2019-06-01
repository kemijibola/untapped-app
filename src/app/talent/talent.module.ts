import { TalentComponent } from './talent.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';
import { TalentRoutingModule } from './talent-routing.module';
import { TabsComponent } from '../shared/tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './../shared/categories/categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TabsReducers } from '../store/global/tabs/tabs.reducers';


@NgModule({
    declarations: [
        ProfileComponent,
        PortfolioComponent,
        SettingsComponent,
        TalentComponent,
        TabsComponent,
        CategoriesComponent
    ],
    imports: [
        TalentRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        CategoriesComponent,
        TabsComponent
    ]
})

export class TalentModule { }
