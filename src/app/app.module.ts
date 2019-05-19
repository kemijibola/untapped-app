import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserTypeEffects } from './user-type/store/user-type.effects';
import { AuthEffects } from './account/store/auth.effects';
import { ErrorEffects } from './store/global/error/error-effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserTypeEffects,
      AuthEffects,
      ErrorEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
