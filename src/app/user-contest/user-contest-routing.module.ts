import { NewContestOverviewComponent } from "./new-contest/new-contest-overview/new-contest-overview.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserContestComponent } from "./user-contest.component";
import { CompleteProfile } from "../guard-services/complete-profile.guard.service";

const userContestRouting: Routes = [
  {
    path: "page",
    canActivate: [CompleteProfile],
    component: UserContestComponent,
  },
  {
    path: "new/overview",
    canActivate: [CompleteProfile],
    component: NewContestOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(userContestRouting)],
  exports: [RouterModule],
})
export class UserContestRoutingModule {}
