import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const authRoutes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // [
  //     { path: 'success',  component: SignupSuccessComponent }
  // ]
  { path: 'confirm-email', component: ConfirmEmailComponent },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  }
  // {
  //   path: 'confirmation?:email=email&:token=token',
  //   component: ConfirmationComponent,
  //   redirectTo: '/account/confirmation?email=email&token=token',
  //   pathMatch: 'full'
  // }
  // otherwise redirect to root
  // { path: '**', redirectTo: '', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
