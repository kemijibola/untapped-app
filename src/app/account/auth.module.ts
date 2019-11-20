import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
// import { RoleListComponent } from '../role/role-list/role-list.component';
import { UserTypeListComponent } from '../user-type/user-type-list/user-type-list.component';
import { UserTypeListItemComponent } from '../user-type/user-type-list/user-type-list-item/user-type-list-item.component';
// import { RoleItemComponent } from '../role/role-list/role-item/role-item.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmEmailComponent,
    UserTypeListComponent,
    UserTypeListItemComponent,
    ConfirmationComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [AuthRoutingModule]
})
export class AuthModule {}
