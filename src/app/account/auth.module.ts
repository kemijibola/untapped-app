import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListComponent } from '../user-type/list/list.component';
import { ItemComponent } from './../user-type/list/item/item.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { SignupSuccessComponent } from './signup-success/signup-success.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ListComponent,
        ItemComponent,
        SignupSuccessComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    exports: [
        AuthRoutingModule
    ],
})
export class AuthModule {

}
