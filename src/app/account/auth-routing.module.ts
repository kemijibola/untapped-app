import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

const authRoutes: Routes = [
    { path: 'signin', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
        // [
        //     { path: 'success',  component: SignupSuccessComponent }
        // ]
    { path: 'signup-success', component: SignupSuccessComponent}
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {

}
