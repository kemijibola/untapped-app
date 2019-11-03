import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { RoleListComponent } from '../role/role-list/role-list.component';
import { RoleItemComponent } from '../role/role-list/role-item/role-item.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmEmailComponent,
    RoleListComponent,
    RoleItemComponent,
    ConfirmationComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [AuthRoutingModule]
})
export class AuthModule {}
