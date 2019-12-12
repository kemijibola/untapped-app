import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { CompleteProfileComponent } from "./complete-profile/complete-profile.component";
import { AuthGuard } from "../guard-services/auth-guard.service";
import { CompleteProfile } from "../guard-services/complete-profile.guard.service";

const userRouting: Routes = [
  {
    path: "user/:username",
    canActivate: [AuthGuard],
    component: UserComponent
  },
  {
    path: "complete-profile",
    canActivate: [AuthGuard],
    component: CompleteProfileComponent
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
