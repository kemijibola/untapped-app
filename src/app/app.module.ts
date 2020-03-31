import { ErrorEffects } from "./store/global/error/error.effects";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { OwlModule } from "ngx-owl-carousel";
import { StoreModule, Store } from "@ngrx/store";
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer
} from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "./../environments/environment";
import { APP_INITIALIZER } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { reducers, metaReducers } from "./store/app.reducers";
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
import { TalentsEffect } from "./shared/store/talents/talents.effects";
import { CommentsEffects } from "./shared/store/comments/comments.effects";
import { MediaPreviewEffect } from "./user/store/portfolio/media/media-preview.effects";
import { StorageModule } from "@ngx-pwa/local-storage";
import { SnackBarEffect } from "./shared/notifications/snackbar/snackbar.effect";
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
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      UserTypeEffects,
      AuthEffects,
      UploadEffect,
      ServiceEffects,
      UserProfileImageEffects,
      CategoryTypeEffects,
      CategoryEffect,
      UserCategoryEffect,
      TalentsEffect,
      CommentsEffects,
      ErrorEffects,
      MediaPreviewEffect,
      SnackBarEffect
    ]),
    CoreModule,
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StorageModule.forRoot({ IDBNoWrap: false })
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
