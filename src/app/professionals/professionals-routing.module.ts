import { Routes, RouterModule } from '@angular/router';
import { ProfessionalsComponent } from './professionals.component';
import { NgModule } from '@angular/core';

const professionalsRoutingModule: Routes = [
  { path: '', component: ProfessionalsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(professionalsRoutingModule)],
  exports: [RouterModule]
})
export class ProfessionalsRoutingModule {}
