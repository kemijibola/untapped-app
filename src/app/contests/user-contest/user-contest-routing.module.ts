import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserContestComponent } from './user-contest.component';

const userContestRouting: Routes = [
  { path: '', component: UserContestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(userContestRouting)],
  exports: [RouterModule]
})
export class UserContestRoutingModule {}
