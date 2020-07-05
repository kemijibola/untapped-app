import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { OwlModule } from "ngx-owl-carousel";
import { StoreModule, Store } from "@ngrx/store";
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
} from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "./../environments/environment";
import { APP_INITIALIZER } from "@angular/core";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { reducers, metaReducers } from "./store/app.reducers";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./account/store/auth.effects";
import { SharedModule } from "./shared/shared.module";
import { ConfigService } from "./services/config.service";
import { UploadEffect } from "./shared/store/upload/upload.effects";
import { ServiceEffects } from "./shared/store/service/service.effects";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "./material.module";
import { GlobalErrorHandler } from "./interceptors/GlobalErrorHandler";
import { NotLoggedInComponent } from "./not-logged-in/not-logged-in.component";
import { UserTypeEffects } from "./user-type/store/user-type.effects";
import { CategoryTypeEffects } from "./shared/store/category-type/category-type.effects";
import { CategoryEffect } from "./shared/store/category/category.effect";
import { UserCategoryEffect } from "./shared/store/filtered-categories/talent-category.effect";
import { TalentsEffect } from "./shared/store/talents/talents.effects";
import { CommentsEffects } from "./shared/store/comments/comments.effects";
import { StorageModule } from "@ngx-pwa/local-storage";
import { SnackBarEffect } from "./shared/notifications/snackbar/snackbar.effect";
import { TabsEffect } from "./shared/store/tabs/tabs.effects";
import { ModalsEffect } from "./shared/store/modals/modals.effect";
import { UserImageEffect } from "./shared/store/user-image/user-image.effect";
import { NotificationEffect } from "./store/global/notification/notification.effect";
import { NgxCurrencyModule } from "ngx-currency";
import { OrderEffect } from "./shared/store/order/order.effects";
import { ContestsEffect } from "./contests/store/contests.effects";
import { ContestEntryEffect } from "./contests/store/contest-entry/contest-entry.effects";
import { StickyModule } from "ng2-sticky-kit";
import { ContestEffect } from "./contests/store/contest/contest.effects";
import { ProfessionalCategoryEffect } from "./shared/store/filtered-categories/professional-category/professional-category.effects";
import { DashboardEffects } from "./shared/store/dashboard/dashboard.effect";
import { UserFilterEffect } from "./shared/store/filtered-categories/user-filter/user-filter.effects";

// export function loadConfigurations(configService: ConfigService) {
//   return () => configService.getConfigs();
// }

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "N# ",
  suffix: "",
  thousands: ".",
  nullable: true,
};

@NgModule({
  declarations: [AppComponent, NotLoggedInComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    OwlModule,
    SharedModule,
    MaterialModule,
    StickyModule,
    LazyLoadImageModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      UserTypeEffects,
      AuthEffects,
      UploadEffect,
      ServiceEffects,
      UserImageEffect,
      CategoryTypeEffects,
      CategoryEffect,
      UserCategoryEffect,
      TalentsEffect,
      CommentsEffects,
      NotificationEffect,
      SnackBarEffect,
      TabsEffect,
      ModalsEffect,
      ServiceEffects,
      OrderEffect,
      ContestsEffect,
      ContestEntryEffect,
      ContestEffect,
      ProfessionalCategoryEffect,
      DashboardEffects,
      UserFilterEffect,
    ]),
    CoreModule,
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StorageModule.forRoot({ IDBNoWrap: false }),
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
  bootstrap: [AppComponent],
})
export class AppModule {}
