import { NgModule } from '@angular/core';
import { TalentsComponent } from './talents.component';
import { Routes, RouterModule } from '@angular/router';

const talentsRouting: Routes = [{ path: '', component: TalentsComponent }];
@NgModule({
  imports: [RouterModule.forChild(talentsRouting)],
  exports: [RouterModule]
})
export class TalentsRoutingModule {}
