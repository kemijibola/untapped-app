import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// components
import { SlideMenuComponent } from "./header/slide-menu/slide-menu.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DropDownComponent } from "./header/drop-down/drop-down.component";
import { AppRoutingModule } from "../app-routing.module";
import { HomeComponent } from "./home/home.component";

// services
import { AuthService } from "../services/auth.service";
import { UserTypeService } from "../services/user-type.service";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProfileService } from "../services/profile.service";
import { UploadService } from "../services/upload.service";
import { PortfolioService } from "../services/portfolio.service";
import { UserService } from "../services/user.service";
import { ServicesService } from "../services/services.service";
import { ModalService } from "../services/modal.service";
import { AddOrRemoveClassDirective } from "../directives/add-or-remove-class.directive";
import { NotificationService } from "../services/notification.service";
import { ErrorService } from "../services/ErrorService";
import { AuthGuard } from "../guard-services/auth-guard.service";
import { CompleteProfile } from "../guard-services/complete-profile.guard.service";
import { AuthInterceptor } from "../interceptors/AuthInterceptor";
import { CategoryTypeService } from "../services/category-type.service";
import { LoggingService } from "./../services/LoggingService";
import { ErrorInterceptor } from "../interceptors/ErrorInterceptor";
import { CategoryService } from "../services/category.service";
import { UserCategoryService } from "../services/user-category.service";
import { TalentsService } from "../services/talents.service";
import { CommentsService } from "../services/comments.service";

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SlideMenuComponent,
    FooterComponent,
    DropDownComponent,
    AddOrRemoveClassDirective
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [AppRoutingModule, HeaderComponent, FooterComponent],
  providers: [
    AuthService,
    AuthGuard,
    CompleteProfile,
    UserTypeService,
    ProfileService,
    PortfolioService,
    UploadService,
    UserTypeService,
    ServicesService,
    UserService,
    ModalService,
    NotificationService,
    ErrorService,
    LoggingService,
    CategoryTypeService,
    CategoryService,
    UserCategoryService,
    TalentsService,
    CommentsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CoreModule {}
