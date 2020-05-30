import { NewContestOverviewComponent } from "./new-contest/new-contest-overview/new-contest-overview.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserContestComponent } from "./user-contest.component";
import { CompleteProfile } from "../guard-services/complete-profile.guard.service";
import { NewContestSuccessComponent } from "./new-contest/new-contest-success/new-contest-success.component";

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
  {
    path: "new/order-success",
    canActivate: [CompleteProfile],
    component: NewContestSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(userContestRouting)],
  exports: [RouterModule],
})
export class UserContestRoutingModule {}
