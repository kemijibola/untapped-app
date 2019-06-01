import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';
import { APP_INITIALIZER } from '@angular/core';
import { load } from './helper/app-initializer.helper';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserTypeEffects } from './user-type/store/user-type.effects';
import { AuthEffects } from './account/store/auth.effects';
import { ErrorEffects } from './store/global/error/error-effects';
import { SharedModule } from './shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './services/configuration.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserTypeEffects,
      AuthEffects,
      ErrorEffects
    ]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [{
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [
        HttpClient,
        ConfigurationService
      ],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
