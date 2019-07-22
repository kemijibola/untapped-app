import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const userRouting: Routes = [{ path: ':username', component: UserComponent }];

@NgModule({
  imports: [RouterModule.forChild(userRouting)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
