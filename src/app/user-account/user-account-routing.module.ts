import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountComponent } from './user-account.component';

const userAccountRouting: Routes = [
    { path: '', component: UserAccountComponent }
];

@NgModule({
    imports: [RouterModule.forChild(userAccountRouting)],
    exports: [RouterModule]
})

export class UserAccountRoutingModule {}
