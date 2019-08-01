import { NgModule } from '@angular/core';
import { UserContestComponent } from './user-contest.component';
import { UserContestRoutingModule } from './user-contest-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AllContestComponent } from './all-contest/all-contest.component';
import { NewContestComponent } from './new-contest/new-contest.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [
    AllContestComponent,
    NewContestComponent,
    SettingComponent,
    UserContestComponent
  ],
  imports: [SharedModule, UserContestRoutingModule],
  exports: [UserContestRoutingModule]
})
export class UserContestModule {}
