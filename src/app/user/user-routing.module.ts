import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const userRouting: Routes = [
  {
    path: ':username',
    component: UserComponent
  }
  // {
  //   path: ':username/contest',
  //   component: UserContestComponent
  //   // loadChildren: './user-contest/user-contest.module#UserContestModule'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(userRouting)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
