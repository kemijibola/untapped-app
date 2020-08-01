import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { CommonModule } from "@angular/common";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
// import { RoleListComponent } from '../role/role-list/role-list.component';
import { UserTypeListComponent } from "../user-type/user-type-list/user-type-list.component";
import { UserTypeListItemComponent } from "../user-type/user-type-list/user-type-list-item/user-type-list-item.component";
// import { RoleItemComponent } from '../role/role-list/role-item/role-item.component';
import { ChangeEmailComponent } from "./change-email/change-email.component";
import { EmailChangeVerificationComponent } from "./email-change-verification/email-change-verification.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { CreateNewPasswordComponent } from "./create-new-password/create-new-password.component";
import { ResetPasswordVerificationComponent } from "./reset-password-verification/reset-password-verification.component";
import { SharedModule } from "../shared/shared.module";
import { ValidationErrorsComponent } from "../shared/validation-errors/validation-errors.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmEmailComponent,
    UserTypeListComponent,
    UserTypeListItemComponent,
    ConfirmationComponent,
    ChangeEmailComponent,
    EmailChangeVerificationComponent,
    ForgotPasswordComponent,
    CreateNewPasswordComponent,
    ResetPasswordVerificationComponent,
  ],
  imports: [CommonModule, CountdownModule, SharedModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [AuthRoutingModule],
})
export class AuthModule {}
