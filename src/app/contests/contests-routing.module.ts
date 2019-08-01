import { Routes, RouterModule } from '@angular/router';
import { ContestsComponent } from './contests.component';
import { NgModule } from '@angular/core';

const contestsRouting: Routes = [{ path: '', component: ContestsComponent }];

@NgModule({
  imports: [RouterModule.forChild(contestsRouting)],
  exports: [RouterModule]
})
export class ContestsRoutingModule {}
