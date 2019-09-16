import { NgModule } from '@angular/core';
import { UserContestComponent } from './user-contest.component';
import { UserContestRoutingModule } from './user-contest-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AllContestComponent } from './all-contest/all-contest.component';
import { NewContestComponent } from './new-contest/new-contest.component';
import { SettingComponent } from './setting/setting.component';
import { NewContestBannerComponent } from './new-contest/new-contest-banner/new-contest-banner.component';
import { ContestOverviewComponent } from './contest-overview/contest-overview.component';
import { ContestServiceComponent } from './contest-overview/contest-service/contest-service.component';
import { AllContestItemComponent } from './all-contest/all-contest-item/all-contest-item.component';

@NgModule({
  declarations: [
    AllContestComponent,
    NewContestComponent,
    SettingComponent,
    UserContestComponent,
    NewContestBannerComponent,
    ContestOverviewComponent,
    ContestServiceComponent,
    AllContestItemComponent
  ],
  imports: [SharedModule, UserContestRoutingModule],
  exports: [UserContestRoutingModule]
})
export class UserContestModule {}
