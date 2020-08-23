import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const adminRouting: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(adminRouting)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
