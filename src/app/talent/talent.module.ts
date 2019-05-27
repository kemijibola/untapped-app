import { TalentComponent } from './talent.component';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SettingsComponent } from './settings/settings.component';
import { TalentRoutingModule } from './talent-routing.module';
import { TabsComponent } from '../shared/tabs/tabs.component';
import { TabComponent } from '../shared/tabs/tab/tab.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ProfileComponent,
        PortfolioComponent,
        SettingsComponent,
        TalentComponent,
        TabsComponent,
        TabComponent
    ],
    imports: [
        TalentRoutingModule,
        CommonModule
    ]
})

export class TalentModule { }
