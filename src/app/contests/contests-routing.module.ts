import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContestsComponent } from './contests.component';
import { ContestDetailsComponent } from './contest-details/contest-details.component';

const contestsRouting: Routes = [
  { path: '', component: ContestsComponent },
  { path: ':id', component: ContestDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(contestsRouting)],
  exports: [RouterModule]
})
export class ContestsRoutingModule {}
