import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserTypeComponent } from './../user-type/user-type.component';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        UserTypeComponent
    ],
    imports: [
        FormsModule,
        AuthRoutingModule
    ],
    exports: [AuthRoutingModule]
})
export class AuthModule {

}
