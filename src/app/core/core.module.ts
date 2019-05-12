import { NgModule } from '@angular/core';

import { SlideMenuComponent } from './header/slide-menu/slide-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DropDownComponent } from './header/drop-down/drop-down.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        SlideMenuComponent,
        FooterComponent,
        DropDownComponent
    ],
    imports: [
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent
    ]
})
export class CoreModule {}
