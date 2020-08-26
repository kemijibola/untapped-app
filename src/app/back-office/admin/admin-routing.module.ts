import { AuthGuard } from "./../../guard-services/auth-guard.service";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { RoleGuard } from "src/app/guard-services/role-guard.service";

const adminRouting: Routes = [
  {
    path: "approvals",
    canActivate: [RoleGuard],
    data: {
      userType: "Admin",
    },
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRouting)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
