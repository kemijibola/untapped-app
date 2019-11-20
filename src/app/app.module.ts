import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { OwlModule } from "ngx-owl-carousel";
import { StoreModule, Store } from "@ngrx/store";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "./../environments/environment";
import { APP_INITIALIZER } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { reducers } from "./store/app.reducers";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./account/store/auth.effects";
import { SharedModule } from "./shared/shared.module";
import { ConfigService } from "./services/config.service";
import { UploadEffect } from "./shared/store/upload/upload.effects";
import { UserProfileImageEffects } from "./shared/store/user-profile-image/user-profile-image.effects";
import { ServiceEffects } from "./shared/store/service/service.effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./interceptors/ErrorInterceptor";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { GlobalErrorHandler } from "./interceptors/GlobalErrorHandler";
import { NotLoggedInComponent } from "./not-logged-in/not-logged-in.component";
import { UserTypeEffects } from "./user-type/store/user-type.effects";
// export function loadConfigurations(configService: ConfigService) {
//   return () => configService.getConfigs();
// }

@NgModule({
  declarations: [AppComponent, NotLoggedInComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    AppRoutingModule,
    OwlModule,
    SharedModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserTypeEffects,
      AuthEffects,
      UploadEffect,
      ServiceEffects,
      UserProfileImageEffects
    ]),
    CoreModule,
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  exports: [MatSlideToggleModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  // providers: [
  //   ConfigService,
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: loadConfigurations,
  //     deps: [ConfigService],
  //     multi: true
  //   }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule {}
