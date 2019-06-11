import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { StoreModule, Store } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';
import { APP_INITIALIZER } from '@angular/core';
// import { load } from './helper/app-config';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserTypeEffects } from './user-type/store/user-type.effects';
import { AuthEffects } from './account/store/auth.effects';
import { ErrorEffects } from './store/global/error/error-effects';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserTypeEffects,
      AuthEffects,
      ErrorEffects
    ]),
    CoreModule,
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
