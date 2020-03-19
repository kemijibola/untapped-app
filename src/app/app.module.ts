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
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./interceptors/ErrorInterceptor";
import { MaterialModule } from "./material.module";
import { GlobalErrorHandler } from "./interceptors/GlobalErrorHandler";
import { NotLoggedInComponent } from "./not-logged-in/not-logged-in.component";
import { UserTypeEffects } from "./user-type/store/user-type.effects";
import { CategoryTypeEffects } from "./shared/store/category-type/category-type.effects";
import { CategoryEffect } from "./shared/store/category/category.effect";
import { UserCategoryEffect } from "./shared/store/filtered-categories/user-category.effect";
// import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
// export function loadConfigurations(configService: ConfigService) {
//   return () => configService.getConfigs();
// }

@NgModule({
  declarations: [AppComponent, NotLoggedInComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OwlModule,
    SharedModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserTypeEffects,
      AuthEffects,
      UploadEffect,
      ServiceEffects,
      UserProfileImageEffects,
      CategoryTypeEffects,
      CategoryEffect,
      UserCategoryEffect
    ]),
    CoreModule,
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  exports: [MaterialModule],
  providers: [],
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
