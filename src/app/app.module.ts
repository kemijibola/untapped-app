import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { coreReducer } from './core/store/core.reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    CoreModule,
    StoreModule.forRoot({coreModule: coreReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
