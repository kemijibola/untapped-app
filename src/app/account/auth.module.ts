import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        FormsModule,
        AuthRoutingModule
    ],
    exports: [AuthRoutingModule]
})
export class AuthModule {

}
