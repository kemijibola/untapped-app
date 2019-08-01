import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContestsComponent } from './contests.component';

const contestsRouting: Routes = [{ path: '', component: ContestsComponent }];

@NgModule({
  imports: [RouterModule.forChild(contestsRouting)],
  exports: [RouterModule]
})
export class ContestsRoutingModule {}
