import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// components
import { SlideMenuComponent } from './header/slide-menu/slide-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DropDownComponent } from './header/drop-down/drop-down.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';

// services
import { AuthService } from '../services/auth.service';
import { UserTypeService } from '../services/user-type.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../services/profile.service';
import { UploadService } from '../services/upload.service';
import { AppFileInputDirective } from '../directives/file-multiple.directive';
import { RoleService } from '../services/role.service';
import { PortfolioService } from '../services/portfolio.service';
import { UserService } from '../services/user.service';
import { ServicesService } from '../services/services.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SlideMenuComponent,
    FooterComponent,
    DropDownComponent
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
    UserTypeService,
    ProfileService,
    PortfolioService,
    UploadService,
    RoleService,
    ServicesService,
    UserService
  ]
})
export class CoreModule {}
