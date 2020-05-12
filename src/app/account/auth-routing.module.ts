import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { ChangeEmailComponent } from "./change-email/change-email.component";
import { EmailChangeVerificationComponent } from "./email-change-verification/email-change-verification.component";
import { AuthGuard } from "../guard-services/auth-guard.service";

const authRoutes: Routes = [
  { path: "signin", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  // [
  //     { path: 'success',  component: SignupSuccessComponent }
  // ]
  { path: "confirm-email", component: ConfirmEmailComponent },
  { path: "email/change", component: ChangeEmailComponent },
  {
    path: "confirmation/:email/:token",
    component: ConfirmationComponent,
  },
  {
    path: "email-change/verify/:email/:token",
    canActivate: [AuthGuard],
    component: EmailChangeVerificationComponent,
  },
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
  exports: [RouterModule],
})
export class AuthRoutingModule {}
