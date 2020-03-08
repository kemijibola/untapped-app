import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserContestComponent } from './user-contest.component';
import { CompleteProfile } from '../guard-services/complete-profile.guard.service';

const userContestRouting: Routes = [
  {
    path: 'contest',
    canActivate: [CompleteProfile],
    component: UserContestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(userContestRouting)],
  exports: [RouterModule]
})
export class UserContestRoutingModule {}
